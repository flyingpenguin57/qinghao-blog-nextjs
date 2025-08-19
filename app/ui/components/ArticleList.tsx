import { CodeBracketIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { openSans } from "../fonts";
import { fetchPagedArticles } from "@/app/lib/data";
import Pagination from '@/app/ui/components/Pagination';
import Link from "next/link";

interface Props {
  page: number | undefined;
}

export default async function ArticleList({ page }: Props) {

  // 获取分页参数，默认第一页
  if (page === undefined) {
    page = 1; // 如果没有传入searchParams，默认设置为第一页
  }
  const pageSize = 5;

  const articles = await fetchPagedArticles(1, page, pageSize);


  return (
    <div className="bg-white py-16 sm:py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${openSans.className} text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white`}>
            Welcome To My Blog 👋
          </h2>
          <p className="mt-2 text-lg/8 text-gray-700 dark:text-gray-300">
            I am a coder.Welcome to my blog.Hope the knowledge and experience i shared here would be helpful to you.
          </p>
          <div className="flex items-center text-lg/8 space-x-2 text-gray-700">
            <CodeBracketIcon className="h-5 w-5 text-blue-500" />
            <span>GitHub:https://github.com/flyingpenguin57</span>
          </div>

          {/* 邮件 */}
          <div className="flex items-center text-lg/8 space-x-2 text-gray-700">
            <EnvelopeIcon className="h-5 w-5 text-green-500" />
            <span>Email:liqinghao4679@gmail.com</span>
          </div>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 dark:border-gray-700">
            {articles.map((article) => (
              <article key={article.id} className="flex max-w-xl flex-col items-start justify-between">
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
                  <h3 className={`${openSans.className} mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300`}>
                    <Link href={`/article/${article.id}`}>
                      <span className="absolute inset-0" />
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">{article.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <Pagination current={page}></Pagination>
        </div>
      </div>
    </div>
  )
}
