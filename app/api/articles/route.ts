import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const isAdmin = searchParams.get('admin') === 'true';

        let query = {};
        if (!isAdmin) {
            query = { isPublished: true };
        }

        const articles = await Article.find(query).sort({ publishedAt: -1 }).limit(50);
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.content || !body.slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const article = await Article.create({
            ...body,
            author: session.user?.name || 'Admin',
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        // Handle duplicate key error for slug
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
