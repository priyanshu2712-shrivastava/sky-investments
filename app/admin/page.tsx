import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Article from '@/models/Article';
import dbConnect from '@/lib/mongodb';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import DeleteArticleButton from '@/components/DeleteArticleButton';
import AdminSearch from '@/components/AdminSearch';

// Force dynamic
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

async function getArticles(query: string = '', page: number = 1) {
    try {
        await dbConnect();

        const filter: any = {};
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { slug: { $regex: query, $options: 'i' } },
                { excerpt: { $regex: query, $options: 'i' } },
            ];
        }

        const total = await Article.countDocuments(filter);
        const articles = await Article.find(filter)
            .sort({ publishedAt: -1 })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean();

        return {
            items: articles.map(article => ({
                ...article,
                _id: article._id.toString(),
            })),
            total,
            totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { items: [], total: 0, totalPages: 1 };
    }
}

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; page?: string }>;
}) {
    await dbConnect();
    const params = await searchParams;
    const query = params.q || '';
    const currentPage = Math.max(1, parseInt(params.page || '1', 10));
    
    const { items: articles, total, totalPages } = await getArticles(query, currentPage);

    // Get all articles for stats (not paginated)
    const allArticles = await Article.find({}).lean();
    const totalArticles = allArticles.length;
    const publishedCount = allArticles.filter((a: any) => a.isPublished).length;
    const draftCount = totalArticles - publishedCount;
    const trendingCount = allArticles.filter((a: any) => a.isTrending).length;

    const buildPageHref = (page: number) => {
        const qs = new URLSearchParams();
        if (query) qs.set('q', query);
        qs.set('page', String(page));
        return `/admin${qs.toString() ? `?${qs.toString()}` : ''}`;
    };

    return (
        <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 flex-wrap">
                <Link
                    href="/admin/import"
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    Import PDF
                </Link>
                <Link
                    href="/admin/new"
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold shadow-sm"
                >
                    <Plus size={16} />
                    New Article
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Articles', value: totalArticles, tone: 'text-slate-900', bg: 'bg-slate-50' },
                    { label: 'Published', value: publishedCount, tone: 'text-emerald-800', bg: 'bg-emerald-50' },
                    { label: 'Drafts', value: draftCount, tone: 'text-amber-800', bg: 'bg-amber-50' },
                    { label: 'Trending', value: trendingCount, tone: 'text-indigo-800', bg: 'bg-indigo-50' },
                ].map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-xl border border-gray-200 ${item.bg} p-4 shadow-sm`}
                    >
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className={`text-2xl font-semibold mt-1 ${item.tone}`}>{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <AdminSearch />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Articles</h2>
                    <span className="text-sm text-gray-500">
                        {query ? `${total} found` : `${totalArticles} total`}
                        {query && ` (${totalArticles} total)`}
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Trending</th>
                                <th className="px-6 py-4">Reads</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        {query ? 'No articles found matching your search.' : 'No articles found.'}
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article: any) => (
                                    <tr key={article._id.toString()} className="hover:bg-gray-50/60">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {article.title}
                                            <div className="text-xs text-gray-400 font-normal mt-0.5 truncate max-w-xs">{article.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${article.isPublished ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {article.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {article.isTrending ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                                                    Trending
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {article.reads || 0}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                                            <Link href={`/admin/edit/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                                                <Edit2 size={18} />
                                            </Link>
                                            <DeleteArticleButton slug={article.slug} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, total)} of {total} articles
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={buildPageHref(Math.max(1, currentPage - 1))}
                                className={`px-3 py-1.5 rounded border text-sm ${
                                    currentPage === 1
                                        ? 'text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                                        : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Previous
                            </Link>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                    let pageNum: number;
                                    if (totalPages <= 5) {
                                        pageNum = idx + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = idx + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + idx;
                                    } else {
                                        pageNum = currentPage - 2 + idx;
                                    }
                                    return (
                                        <Link
                                            key={pageNum}
                                            href={buildPageHref(pageNum)}
                                            className={`px-3 py-1.5 rounded border text-sm ${
                                                pageNum === currentPage
                                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </Link>
                                    );
                                })}
                            </div>
                            <Link
                                href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                                className={`px-3 py-1.5 rounded border text-sm ${
                                    currentPage === totalPages
                                        ? 'text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                                        : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
