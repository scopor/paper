import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import highlight from 'highlight.js'
import markdownItAnchor from "markdown-it-anchor";
import markdownItMermaid from 'markdown-it-diagram'
// @ts-ignore
import katex from 'markdown-it-katex'
// @ts-ignore
import markdownItTaskLists from 'markdown-it-task-lists'
interface PostModule {
    default: any;
    [key: string]: any;
}

export interface PostMetadata {
    slug: string
    title: string
    date: string
    description: string
    tags: string[],
    content: string,
    frontmatter: any
}

const postFiles = import.meta.glob<PostModule>('../posts/*.md', {eager: true, as: 'raw'});

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    xhtmlOut: true,
    highlight: (str: string, lang: string): string => {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(str, {language: lang}).value; // 使用 highlight.js 进行高亮
            } catch (__) {
            }
        }
        return md.utils.escapeHtml(str);
    }})
    .use(markdownItAnchor)
    .use(markdownItMermaid, {
        imageFormat: 'png',
        mermaid: true,
        showController: true,
        ditaa: {imageFormat: 'png'}
    })
    .use(katex).use(markdownItTaskLists, {label: true, labelAfter: true, enabled: true});

export function getPostMetadata(): PostMetadata[] {
    const posts = Object.entries(postFiles)
        .filter(([filepath]) => {
            return !/About\.md$/.test(filepath); // 正则表达式过滤
        })
        .map(([filepath, module]) => {
            const slug = filepath.replace('../posts/', '').replace('.md', '')
            const postMatter = matter(module as unknown as matter.Input)
            return {
                slug,
                title: postMatter.data.title,
                date: postMatter.data.date || '2024-01-01 00:00:00 +8:00',
                description: postMatter.data.description || '',
                tags: postMatter.data.tags || [],
                content: postMatter.content,
                frontmatter: postMatter.data
            }
        })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContent(slug: string): { content: any; frontmatter: any } | null {
    const filepath = `../posts/${slug}.md`;
    const post = postFiles[filepath]
    if (!post) return null
    const postMatter = matter(post as unknown as matter.Input);
    return {content: md.render(postMatter.content), frontmatter: postMatter.data || {}}
}

export function formattedDate(date: string): string {
    if (!date) {
        return ""
    }
    return new Date(date).toLocaleString('zh', { hour12: false, year: 'numeric', month: "2-digit", day: '2-digit', hour: "2-digit", minute: '2-digit', second: '2-digit'})
        .replaceAll('/', '-');
}
