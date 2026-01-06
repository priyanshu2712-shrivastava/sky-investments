import Link from 'next/link';
import { format } from 'date-fns';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string; // Serialized date from API/Server
}

export default function ArticleCard({ title, excerpt, slug, publishedAt }: ArticleCardProps) {
    return (
        <article className="group mb-12 border-b border-gray-100 pb-10 last:border-0">
            <div className="mb-3 text-sm text-gray-500 font-medium">
                {format(new Date(publishedAt), 'MMMM d, yyyy')}
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
