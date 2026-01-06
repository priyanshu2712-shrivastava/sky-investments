import ArticleCard from '@/components/ArticleCard';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleSearch from '@/components/ArticleSearch';

// Force dynamic
export const dynamic = 'force-dynamic';

async function getArticles(query: string = '') {
    try {
        await dbConnect();

        const filter: any = { isPublished: true };
        if (query) {
            filter.title = { $regex: query, $options: 'i' };
        }

        const articles = await Article.find(filter)
            .sort({ publishedAt: -1 })
            .select('title slug excerpt publishedAt')
            .lean();

        return articles.map(article => ({
            ...article,
            _id: article._id.toString(),
            publishedAt: article.publishedAt.toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}



export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || '';
    const articles = await getArticles(query);

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
                <ArticleSearch />
                {articles.length > 0 ? (
                    articles.map((article: any) => (
                        <ArticleCard
                            key={article._id}
                            title={article.title}
                            slug={article.slug}
                            excerpt={article.excerpt}
                            publishedAt={article.publishedAt}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-gray-50 rounded-lg">
                        <p>No investment insights published yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
