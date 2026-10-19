import fs from 'fs/promises';
import path from 'path';

export interface DocMetadata {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  updatedAt?: string;
  readTime: string;
  author: string;
}

export interface DocItem extends DocMetadata {
  content: string;
}

const DOCS_DIRECTORY = path.join(process.cwd(), 'src', 'content', 'docs');

function parseFrontmatter(fileContent: string): { data: Partial<DocMetadata>; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const items = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      data[key] = items;
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min de lectura`;
}

export async function getAllDocs(): Promise<DocItem[]> {
  try {
    const dirExists = await fs
      .access(DOCS_DIRECTORY)
      .then(() => true)
      .catch(() => false);

    if (!dirExists) {
      return [];
    }

    const files = await fs.readdir(DOCS_DIRECTORY);
    const mdFiles = files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

    const docs: DocItem[] = [];

    for (const file of mdFiles) {
      const filePath = path.join(DOCS_DIRECTORY, file);
      const rawContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = parseFrontmatter(rawContent);

      const fileSlug = file.replace(/\.mdx?$/, '');
      const slug = data.slug || fileSlug;

      docs.push({
        title: data.title || fileSlug.replace(/-/g, ' '),
        slug,
        description: data.description || '',
        category: data.category || 'General',
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: data.date || new Date().toISOString().split('T')[0],
        updatedAt: data.updatedAt,
        author: data.author || 'Carlos Damota',
        readTime: data.readTime || calculateReadTime(content),
        content,
      });
    }

    return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading docs:', error);
    return [];
  }
}

export async function getDocBySlug(slug: string): Promise<DocItem | null> {
  const docs = await getAllDocs();
  return docs.find((doc) => doc.slug === slug) || null;
}

export async function getAllCategories(): Promise<string[]> {
  const docs = await getAllDocs();
  const categories = Array.from(new Set(docs.map((d) => d.category)));
  return categories.sort();
}
