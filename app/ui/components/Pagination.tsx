import { fetchArticlesCount } from '@/app/lib/data';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import Link from 'next/link';

type PaginationProps = {
    current: number;
};

const articleCount = await fetchArticlesCount(1);
const totalPages = Math.ceil(articleCount / 5);

function PageNumber({ page, current }: { page: number, current: number }) {
    return (
        <Link
            key={page}
            href={{ pathname: "/", query: { page: page } }}
            className={clsx(
                page === current && "inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600 dark:border-indigo-400 dark:text-indigo-400",
                page !== current && "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
            )}
        >
            {page}
        </Link>
    );
}

function Ellipsis() {
    return (
        <span key={1000000} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
        </span>
    );
}
export default function Pagination({ current }: PaginationProps) {
    const elements = [];
    if (totalPages >= 7) {
        elements.push(PageNumber({ page: 1, current }));
        elements.push(PageNumber({ page: 2, current }));
        elements.push(PageNumber({ page: 3, current }));
        elements.push(Ellipsis());
        elements.push(PageNumber({ page: totalPages - 2, current }));
        elements.push(PageNumber({ page: totalPages - 1, current }));
        elements.push(PageNumber({ page: totalPages, current }));
    } else {
        for (let i = 1; i <= totalPages; i++) {
            elements.push(PageNumber({ page: i, current }));
        }
    }

    return (
        <nav className="mt-16 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 dark:border-white/10">
            <div className="-mt-px flex w-0 flex-1">
                <Link
                    href={{ pathname: "/", query: { page: current-1 > 0 ? current - 1 : 1 } }}
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
                >
                    <ArrowLongLeftIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 dark:text-gray-500" />
                    Previous
                </Link>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {elements}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <Link
                    href={{ pathname: "/", query: { page: current+1 } }}
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
                >
                    Next
                    <ArrowLongRightIcon aria-hidden="true" className="ml-3 size-5 text-gray-400 dark:text-gray-500" />
                </Link>
            </div>
        </nav>
    )
}
