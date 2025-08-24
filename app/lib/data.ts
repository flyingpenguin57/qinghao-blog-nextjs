import postgres from 'postgres';
import { Article, User } from '@/app/lib/db-definition';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function fetchArticleById(id: number) {
    try {
        const data = await sql<Article[]>`SELECT * FROM articles WHERE id = ${id}`;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch article data.');
    }
}

export async function increViewCount(id: number) {
    try {
        const data = await sql<Article[]>`UPDATE articles SET view_count = view_count + 1 WHERE id = ${id}`;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch article data.');
    }
}

export async function fetchPublishedPagedArticles(status: number, page: number, pageSize: number) {
    try {
        if (page < 1) {
            page = 1; // 确保页码至少为1
        }
        const data = await sql<Article[]>`SELECT * FROM articles WHERE status = ${status} ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch article data.');
    }
}

export async function fetchPagedArticles (page: number, pageSize: number) {
    try {
        if (page < 1) {
            page = 1; // 确保页码至少为1
        }
        const data = await sql<Article[]>`SELECT * FROM articles ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch article data.');
    }
}

export async function fetchArticlesCount(status: number) {
    try {
        const data = await sql<{ count: number }[]>`SELECT COUNT(*) as count FROM articles WHERE status = ${status}`;
        return data[0].count;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch articles count.');
    }
}

export async function fetchUserByUsername(username: string) {
    try {
        const data = await sql<User[]>`SELECT * FROM users WHERE username = ${username}`;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
    }
}

export async function saveArticle(
    { title, summary, content, author_id, created_at, updated_at, tags, status }:
        { title: string, summary: string, content: string, author_id: number, created_at: Date, updated_at: Date, tags: string[], status: number }) {
    const result = await sql<Article[]>`
          INSERT INTO articles (title, summary, content, author_id, created_at, updated_at, tags, view_count, status)
          VALUES (${title}, ${summary}, ${content}, ${author_id}, ${created_at}, ${updated_at}, ${tags}, 0, ${status})
          RETURNING *;`;
    return result[0]?.id
}

export async function updateArticle(
    { id, title, summary, content, updated_at, tags, status }:
        { id: number, title?: string, summary?: string, content?: string, updated_at: Date, tags?: string[], status?: number }) {
    try {
        const updates: Partial<Article> = {
            updated_at: updated_at,
        };

        if (title !== undefined && title !== null) {
            updates.title = title;
        }
        if (summary !== undefined && summary !== null) {
            updates.summary = summary;
        }
        if (content !== undefined && content !== null) {
            updates.content = content;
        }
        if (tags !== undefined && tags !== null) {
            updates.tags = tags;
        }
        if (status !== undefined && status !== null) {
            updates.status = status;
        }

        if (Object.keys(updates).length === 0) {
            return id; // No fields to update
        }

        const result = await sql<Article[]>`
            UPDATE articles
            SET ${sql(updates)}
            WHERE id = ${id}
            RETURNING *;`;
        return result[0]?.id;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update article data.');
    }
}

export async function deleteArticle(id: number) {
    try {
        await sql`DELETE FROM articles WHERE id = ${id}`;
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete article data.');
    }
}