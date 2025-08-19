import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { saveArticle } from '@/app/lib/data';
import { parseCustomMarkup } from '@/app/lib/utils';
import { ResponseUtil } from '@/app/lib/api';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            content,
            tags = [],
            status = 1, // 默认发布
        } = body;

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
            return NextResponse.json(ResponseUtil.fail("no title", 200))
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const { payload } = await jwtVerify(token, getSecretKey())
        console.log(payload)

        if (typeof payload.userId !== "number") {
            throw new Error("Invalid token payload: missing id");
        }
        const author_id = payload.userId

        const created_at = new Date();
        const updated_at = created_at;

        const articleId = await saveArticle({ title, summary, content, author_id, created_at, updated_at, tags, status })

        return NextResponse.json(ResponseUtil.ok({"articleId": articleId}));
    } catch (error) {
        console.error('Save Article Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to save article.' }, { status: 500 });
    }
}

function getSecretKey() {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('Missing JWT_SECRET')
    return new TextEncoder().encode(secret)
}