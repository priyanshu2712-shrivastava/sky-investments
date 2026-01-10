import ArticleCard from '@/components/ArticleCard';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleSearch from '@/components/ArticleSearch';

// Force dynamic
export const dynamic = 'force-dynamic';

const CATEGORIES = [
    'Market Analysis & Trends',
    'IPO & Listing Insights',
    'Sector Deep Dives',
    'Growth Companies',
    'Personal Finance & Wealth Creation',
    'Commodities & Alternative Assets',
    'Geopolitics & Macroeconomics',
    'Financial Literacy & Basics',
];

const PAGE_SIZE = 10;

async function getArticles(query: string = '', category?: string, trending?: boolean, page: number = 1) {
    try {
        await dbConnect();

        const filter: any = { isPublished: true };
        if (query) {
            filter.title = { $regex: query, $options: 'i' };
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (trending) {
            filter.isTrending = true;
        }

        const total = await Article.countDocuments(filter);
        const articles = await Article.find(filter)
            .sort({ publishedAt: -1 })
            .select('title slug excerpt publishedAt category isTrending')
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean();

        return {
            items: articles.map(article => ({
                ...article,
                _id: article._id.toString(),
                publishedAt: article.publishedAt.toISOString(),
            })),
            total,
            totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { items: [], total: 0, totalPages: 1 };
    }
}

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string; trending?: string; page?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || '';
    const category = params.category || 'All';
    const trending = params.trending === 'true';
    const currentPage = Math.max(1, parseInt(params.page || '1', 10));
    const { items: articles, totalPages } = await getArticles(query, category, trending, currentPage);

    const categoryTabs = ['All', ...CATEGORIES, 'Trending'];

    const buildHref = (cat: string) => {
        const qs = new URLSearchParams();
        if (query) qs.set('q', query);
        if (cat === 'Trending') {
            qs.set('trending', 'true');
        } else {
            if (cat && cat !== 'All') qs.set('category', cat);
        }
        qs.set('page', '1');
        return `/articles${qs.toString() ? `?${qs.toString()}` : ''}`;
    };

    const isActive = (cat: string) => {
        if (cat === 'Trending') return trending;
        if (cat === 'All') return !trending && (category === 'All' || !category);
        return !trending && category === cat;
    };

    const buildPageHref = (page: number) => {
        const qs = new URLSearchParams();
        if (query) qs.set('q', query);
        if (category && category !== 'All') qs.set('category', category);
        if (trending) qs.set('trending', 'true');
        qs.set('page', String(page));
        return `/articles${qs.toString() ? `?${qs.toString()}` : ''}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
                        Investment Insights
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-serif italic">
                        Deep dives into market trends, asset allocation, and financial planning.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="mb-8">
                    <ArticleSearch />
                </div>

                <div className="flex overflow-x-auto gap-2 pb-4 -mx-2 px-2 mb-8 border-b border-gray-100">
                    {categoryTabs.map((cat) => (
                        <a
                            key={cat}
                            href={buildHref(cat)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                isActive(cat)
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {cat}
                        </a>
                    ))}
                </div>

                {articles.length > 0 ? (
                    articles.map((article: any) => (
                        <ArticleCard
                            key={article._id}
                            title={article.title}
                            slug={article.slug}
                            excerpt={article.excerpt}
                            publishedAt={article.publishedAt}
                            category={article.category}
                            isTrending={article.isTrending}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-gray-50 rounded-lg">
                        <p>No investment insights published yet.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                        <a
                            href={buildPageHref(Math.max(1, currentPage - 1))}
                            className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                                currentPage === 1
                                    ? 'text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            aria-disabled={currentPage === 1}
                        >
                            Previous
                        </a>
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
                                    <a
                                        key={pageNum}
                                        href={buildPageHref(pageNum)}
                                        className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                                            pageNum === currentPage
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                                : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                            className={`px-3 py-1.5 rounded border text-sm transition-colors ${
                                currentPage === totalPages
                                    ? 'text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
                                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            aria-disabled={currentPage === totalPages}
                        >
                            Next
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
