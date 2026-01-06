import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8 flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-serif font-semibold text-gray-900">Dashboard</h2>
                <span className="text-sm text-gray-500">Welcome, {session.user?.name}</span>
            </div>
            {children}
        </div>
    );
}
