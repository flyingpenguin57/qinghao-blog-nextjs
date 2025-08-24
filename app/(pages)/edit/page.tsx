import { fetchArticleById } from '@/app/lib/data';
import EditClientPage from '../../ui/components/EditClientPage';

interface PageProps {
  searchParams?: { id?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const id = searchParams?.id;
  let article = null;

  if (id) {
    article = await fetchArticleById(Number(id));
  }

  return <EditClientPage article={article} />;
}

