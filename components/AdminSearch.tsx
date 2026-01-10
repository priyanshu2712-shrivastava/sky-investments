'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export default function AdminSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        // Reset to page 1 when searching
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative">
            <label htmlFor="admin-search" className="sr-only">
                Search articles
            </label>
            <input
                id="admin-search"
                className="peer block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-2 outline-offset-2 placeholder:text-gray-500 focus:border-gray-900 focus:outline-gray-900"
                placeholder="Search articles by title, slug, or excerpt..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
            <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}

