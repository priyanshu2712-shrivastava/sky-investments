import Link from 'next/link';
import { format } from 'date-fns';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string; // Serialized date from API/Server
    category?: string;
    isTrending?: boolean;
}

export default function ArticleCard({ title, excerpt, slug, publishedAt, category, isTrending }: ArticleCardProps) {
    return (
        <article className="group mb-12 border-b border-gray-100 pb-10 last:border-0">
            <div className="mb-3 flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-500 font-medium">
                    {format(new Date(publishedAt), 'MMMM d, yyyy')}
                </span>
                {category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {category}
                    </span>
                )}
                {isTrending && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                        Trending
                    </span>
                )}
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-slate-600 transition-colors">
                <Link href={`/blog/${slug}`} className="block">
                    {title}
                </Link>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 font-serif">
                {excerpt}
            </p>
            <Link
                href={`/blog/${slug}`}
                className="text-sm font-semibold text-slate-800 hover:text-slate-600 inline-flex items-center gap-1 transition-colors"
            >
                Read Analysis &rarr;
            </Link>
        </article>
    );
}
