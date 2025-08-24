import { fetchArticleById } from '@/app/lib/data';
import EditClientPage from '../../ui/components/EditClientPage';

interface EditPageServerProps {
  searchParams?: { id?: string };
}

export default async function Page({ searchParams }: EditPageServerProps) {
  const id = searchParams?.id;
  let article = null;

  if (id) {
    article = await fetchArticleById(Number(id));
  }

  return <EditClientPage article={article} />;
}

