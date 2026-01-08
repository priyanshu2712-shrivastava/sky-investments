'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from './Editor';

interface ArticleFormProps {
    initialData?: any;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const categoryOptions = [
        'Market Analysis & Trends',
        'IPO & Listing Insights',
        'Sector Deep Dives',
        'Growth Companies',
        'Personal Finance & Wealth Creation',
        'Commodities & Alternative Assets',
        'Geopolitics & Macroeconomics',
        'Financial Literacy & Basics',
    ];

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || '',
        category: initialData?.category || categoryOptions[0],
        isTrending: initialData?.isTrending ?? false,
        isPublished: initialData?.isPublished ?? false, // Default false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const target = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: target.type === 'checkbox' ? target.checked : value }));
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData
                ? `/api/articles/${initialData.slug}`
                : '/api/articles';

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Something went wrong');
            }

            router.push('/admin');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save article');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            onBlur={!initialData ? generateSlug : undefined} // Auto-generate slug on blur for new articles
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50 text-gray-500"
                            required
                            disabled={!!initialData} // Disable slug editing for existing articles to prevent URL breakages easily, or allow? I'll disable for safety.
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                            required
                        >
                            {categoryOptions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input
                            type="text"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isTrending"
                                name="isTrending"
                                checked={formData.isTrending}
                                onChange={(e) => setFormData(prev => ({ ...prev, isTrending: e.target.checked }))}
                                className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                            />
                            <label htmlFor="isTrending" className="text-sm font-medium text-gray-700 select-none">
                                Trending
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPublished"
                                name="isPublished"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                                className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                            />
                            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 select-none">
                                Publish immediately?
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description)</label>
                <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="min-h-[400px]">
                    <Editor value={formData.content} onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                >
                    {loading ? 'Saving...' : initialData ? 'Update Article' : 'Create Article'}
                </button>
            </div>
        </form>
    );
}
