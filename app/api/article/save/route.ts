import { NextRequest, NextResponse } from 'next/server';
import { saveArticle } from '@/app/lib/data';
import { parseCustomMarkup } from '@/app/lib/utils';
import { ResponseUtil } from '@/app/lib/api';
import { bizErrors } from '@/app/lib/constants';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
    //mock delay
    await sleep(5000)

    //parse request
    const body = await req.json();
    const {
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

    const articleId = await saveArticle({ title, summary, content, author_id, created_at, updated_at, tags, status })

    return NextResponse.json(ResponseUtil.ok({ "articleId": articleId }));
}