import { fetchArticleById } from '@/app/lib/data';
import EditClientPage from '../../ui/components/EditClientPage';

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let article = null;

  if (id) {
    article = await fetchArticleById(Number(id));
  }

  return <EditClientPage article={article} />;
}

