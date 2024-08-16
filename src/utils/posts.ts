interface PostModule {
    default: any;

    [key: string]: any;
}

export interface PostMetadata {
    slug: string
    title: string
    date: string
    description: string
    tags: string[]
}

const postFiles = import.meta.glob<PostModule>('../posts/*.md', {eager: true})

export function getPostMetadata(): PostMetadata[] {
    const posts = Object.entries(postFiles)
        .filter(([filepath]) => {
            return !/About\.md$/.test(filepath); // 正则表达式过滤
        })
        .map(([filepath, module]) => {
            const slug = filepath.replace('../posts/', '').replace('.md', '')
            const frontmatter = module.frontmatter || {}
            return {
                slug,
                title: frontmatter.title,
                date: frontmatter.date || '2024-01-01 00:00:00 +8:00',
                description: frontmatter.description || '',
                tags: frontmatter.tags || [],
            }
        })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContent(slug: string): { component: any; frontmatter: any } | null {
    const filepath = `../posts/${slug}.md`;
    const post = postFiles[filepath]
    if (!post) return null
    return {component: post.default, frontmatter: post.frontmatter || {}}
}
