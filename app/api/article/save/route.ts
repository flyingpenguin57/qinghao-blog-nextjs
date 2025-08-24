import { NextRequest, NextResponse } from 'next/server';
import { saveArticle } from '@/app/lib/data';
import { parseCustomMarkup } from '@/app/lib/utils';
import { ResponseUtil } from '@/app/lib/api';
import { bizErrors } from '@/app/lib/constants';
import { updateArticle } from '@/app/lib/data';

export async function POST(req: NextRequest) {

    //parse request
    const body = await req.json();
    const {
        id, // Add id to the destructuring
        content,
        tags = [],
        status = 0, // 默认草稿
    } = body;

    //get user info
    const userInfoHeader = req.headers.get("x-user-info");
    console.log(userInfoHeader)
    const userInfo = userInfoHeader ? JSON.parse(userInfoHeader) : null;

    const blocks = parseCustomMarkup(content)
    let title = undefined;
    let summary = "";
    blocks.forEach(element => {
        if (element.type === "T") {
            title = element.content
        } else if (element.type === "S") {
            summary = element.content
        }
    });

    if (title === undefined) {
        return NextResponse.json(ResponseUtil.fail(bizErrors.ARTICLE_NO_TITLE.message, bizErrors.ARTICLE_NO_TITLE.code))
    }

    const author_id = userInfo.userId
    const created_at = new Date();
    const updated_at = created_at;

    let articleId;
    if (id) {
        articleId = await updateArticle({ id, title, summary, content, updated_at, tags, status });
    } else {
        articleId = await saveArticle({ title, summary, content, author_id, created_at, updated_at, tags, status });
    }

    return NextResponse.json(ResponseUtil.ok({ "articleId": articleId }));
}