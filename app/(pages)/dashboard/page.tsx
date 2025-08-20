import Link from "next/link";
import { fetchPagedArticles } from "@/app/lib/data";
import { openSans } from "@/app/ui/fonts";
import ActionButton from "@/app/ui/components/ActionButton";

export default async function Page() {

    const articles = await fetchPagedArticles(1, 1, 50000);

    return <>
        <div className="mt-1 grid gap-8 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4">
            {articles.map((article) => (
                <article key={article.id} className="border-1 border-gray-100 bg-gray-100 rounded-lg px-1 py-1 flex max-w-xl flex-col items-start justify-between">
                    <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={article.created_at?.toDateString()} className="text-gray-500 dark:text-gray-400">
                            {article.created_at?.toDateString()}
                        </time>
                        <a
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            {article.tags[0]}
                        </a>
                        <span className="text-gray-800 dark:text-gray-400">
                            {article.view_count} views
                        </span>
                    </div>
                    <div className="group relative">
                        <h3 className={`${openSans.className} mt-3 text-lg/6 font-semibold text-gray-700 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300`}>
                            <Link href={`/article/${article.id}`}>
                                <span className="absolute inset-0" />
                                {article.title}
                            </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">{article.summary}</p>
                    </div>
                    <ActionButton />
                </article>
            ))}
        </div>
    </>
}