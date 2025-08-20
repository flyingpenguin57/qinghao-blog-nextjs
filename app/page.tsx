import ArticleList from '@/app/ui/components/ArticleList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page as string, 10) : 1;  
  return (
    <ArticleList page={page} />
  );
}
