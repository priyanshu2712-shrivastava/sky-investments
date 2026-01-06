'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ImportPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/import-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Upload failed');
            }

            const data = await res.json();
            // Redirect to edit page of the new article
            router.push(`/admin/edit/${data.slug}`);
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-900 mb-6 inline-block">
                &larr; Back to Dashboard
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <FileText size={24} />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Import PDF Article</h1>
                    <p className="text-slate-500">
                        Upload a PDF document to automatically convert it into a draft blog post.
                        We'll extract the text and headings for you.
                    </p>
                </div>

                <form onSubmit={handleUpload} className="p-8">
                    <div className="mb-8">
                        <label
                            htmlFor="pdf-upload"
                            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                id="pdf-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {file ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-blue-600">
                                        <FileText size={32} />
                                    </div>
                                    <p className="font-semibold text-slate-900">{file.name}</p>
                                    <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                                        className="text-xs text-red-500 font-medium mt-3 hover:underline"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <Upload size={32} />
                                    </div>
                                    <p className="font-semibold text-slate-900 mb-1">Click to upload PDF</p>
                                    <p className="text-sm text-slate-500">or drag and drop</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-start gap-2 text-sm">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!file || loading}
                            className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Processing PDF...
                                </>
                            ) : (
                                'Import & Create Draft'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
