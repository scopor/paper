import MarkdownIt from "markdown-it";
import highlight from 'highlight.js'
import markdownItAnchor from "markdown-it-anchor";
import markdownItMermaid from 'markdown-it-diagram'
// @ts-ignore
import katex from 'markdown-it-katex'
// @ts-ignore
import markdownItTaskLists from 'markdown-it-task-lists'
import MarkdownItCopyCode from 'markdown-it-copy-code'
import MarkdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji'

export const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    xhtmlOut: true,
    langPrefix: 'hljs language-',
    highlight: (str: string, lang: string): string => {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(str, {language: lang}).value;
            } catch (__) {
            }
        }
        return md.utils.escapeHtml(str);
    }
});

md.use(markdownItAnchor);

md.use(markdownItMermaid, {
    imageFormat: 'png',
    mermaid: true,
    showController: true,
    ditaa: {imageFormat: 'png'}
});

md.use(katex);

md.use(emoji, { "smile": [ ":)", ":-)" ], "laughing": ":D" });

md.use(markdownItTaskLists, {label: true, labelAfter: true, enabled: true});

md.use(MarkdownItCopyCode,
    {
        containerClass: 'markdown-copy-code-container',
        buttonClass: 'markdown-copy-code-button',
        codeSVGClass: 'markdown-copy-code-code',
        doneSVGClass: 'markdown-copy-code-done',
    });

md.use(MarkdownItContainer, 'netease', {
    validate: function(params: string) {
        return params.trim().match(/^netease\s+(.*)$/);
    },

    render: function (tokens: any, idx: number): string {
        const m = tokens[idx].info.trim().match(/^netease\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            return `<div id="netease" class="h-32"><iframe class="flex pt-4 pb-8" src="//music.163.com/outchain/player?type=2&auto=1&id=` + md.utils.escapeHtml(m[1]) + `"></iframe></div>`;
        } else {
            return "";
        }
    }
})

md.use(MarkdownItContainer, 'bilibili', {
    validate: function(params: string) {
        return params.trim().match(/^bilibili\s+(.*)$/);
    },

    render: function (tokens: any, idx: number): string {
        const m = tokens[idx].info.trim().match(/^bilibili\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            return `<div id="bilibili"><iframe style="width: 100%; aspect-ratio: 16 / 9;" src="//player.bilibili.com/player.html?isOutside=1&bvid=` + md.utils.escapeHtml(m[1]) + `&p=1&autoplay=1&high_quality=1&as_wide=1&muted=0&danmaku=0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe></div>`;
        } else {
            return "";
        }
    }
})


md.disable('code');

md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrGet('src');
    const alt = token.attrGet('alt');
    const title = token.attrGet('title');

    // 添加点击事件
    return `<a data-fancybox="gallery" href="${src}"><img src="${src}" alt="${alt}" title="${title}"></a>`;
};

console.log(md.render('::: netease click me\n*content*\n:::\n'));
