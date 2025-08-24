import { fetchArticleById } from '@/app/lib/data';
import EditClientPage from './EditClientPage';

interface EditPageServerProps {
  searchParams?: { id?: string };
}

export default async function Page({ searchParams }: EditPageServerProps) {
  const awaitedParams = await searchParams;
  const id = awaitedParams?.id;
  let article = null;

  if (id) {
    article = await fetchArticleById(Number(id));
  }

  return <EditClientPage article={article} />;
}

