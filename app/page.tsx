import ArticleList from '@/app/ui/components/ArticleList';

export default async function Page({ searchParams }: any) {
  const params = await searchParams; // 如果 Next.js 提示需要 await
  const page = params?.page ? parseInt(params.page as string, 10) : 1;  
  return (
    <ArticleList page={page} />
  );
}
