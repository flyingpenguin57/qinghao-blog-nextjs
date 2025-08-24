import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { ResponseUtil } from '@/app/lib/api';
import { updateArticle } from '@/app/lib/data';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {

  const { id } = await params;

  await updateArticle({
    id: Number(id),
    title: undefined,
    summary: undefined,
    content: undefined,
    updated_at: new Date(),
    tags: undefined,
    status: 1,
  });

  return NextResponse.json(ResponseUtil.ok(id));
}
