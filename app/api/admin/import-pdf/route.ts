import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';


// Helper to clean and format text
function processPdfText(text: string): string {
    // 1. Split into lines
    let lines = text.split(/\n+/);

    // 2. Remove common garbage (Page numbers, dates likely in footers)
    lines = lines.filter(line => {
        const trimmed = line.trim();
        // Exclude single digit or "Page X"
        if (/^(Page\s?)?\d+(\s?of\s?\d+)?$/i.test(trimmed)) return false;
        // Exclude copyright lines
        if (/©.*All rights reserved/i.test(trimmed)) return false;
        return true;
    });

    // 3. Attempt to structure HTML
    let html = '';

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Heuristic: Short, uppercase lines might be headings
        if (trimmed.length < 100 && trimmed === trimmed.toUpperCase() && trimmed.length > 3) {
            // Title case for better readability? Or keep CAPS. Let's keep caps but make it H2
            html += `<h2>${trimmed}</h2>`;
        }
        // Heuristic: Short lines ending in colon might be subheaders
        else if (trimmed.length < 80 && trimmed.endsWith(':')) {
            html += `<h3>${trimmed}</h3>`;
        }
        // Standard paragraph
        else {
            html += `<p>${trimmed}</p>`;
        }
    });

    return html;
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert file to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse PDF - Add polyfill for DOMMatrix to prevent Node.js errors
        // pdf-parse uses pdfjs-dist which requires browser APIs
        if (typeof globalThis.DOMMatrix === 'undefined') {
            // @ts-ignore
            globalThis.DOMMatrix = class DOMMatrix {
                constructor() { return this; }
                static fromMatrix() { return new DOMMatrix(); }
            };
        }

        const pdf = require('pdf-parse');
        const data = await pdf(buffer);
        const rawText = data.text;


        // Process Text
        const contentHtml = processPdfText(rawText);

        // Generate Title from filename or first non-empty line
        let title = file.name.replace('.pdf', '');
        // Try to find a better title from the first H2 we generated
        const titleMatch = contentHtml.match(/<h2>(.*?)<\/h2>/);
        if (titleMatch && titleMatch[1].length < 100) {
            title = titleMatch[1];
        }

        // Generate Slug
        const randomSuffix = Math.random().toString(36).substring(2, 7);
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') + `-${randomSuffix}`;

        await dbConnect();

        // Create Draft Article
        const article = await Article.create({
            title: title,
            slug: slug,
            excerpt: 'Imported PDF Draft. Please edit to add a summary.',
            content: contentHtml,
            author: session.user?.name || 'Admin',
            isPublished: false, // Always draft
            coverImage: '', // No cover image from PDF text
            category: 'Market Analysis & Trends', // Default category for imported PDFs
            isTrending: false,
        });

        return NextResponse.json({
            message: 'PDF Imported Successfully',
            slug: article.slug
        });

    } catch (error) {
        console.error('PDF Import Error:', error);
        return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
    }
}
