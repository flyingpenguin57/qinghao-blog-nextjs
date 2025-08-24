import { NextRequest, NextResponse } from 'next/server';
import { deleteArticle } from '@/app/lib/data';
import { ResponseUtil } from '@/app/lib/api';
import { bizErrors } from '@/app/lib/constants';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;

    if (!id) {
        return NextResponse.json(ResponseUtil.fail(bizErrors.ARTICLE_ID_REQUIRED.message, bizErrors.ARTICLE_ID_REQUIRED.code))
    }

    try {
        await deleteArticle(Number(id));
        return NextResponse.json(ResponseUtil.ok({ message: "Article deleted successfully" }));
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json(ResponseUtil.fail(bizErrors.ARTICLE_DELETE_FAILED.message, bizErrors.ARTICLE_DELETE_FAILED.code))
    }
}
