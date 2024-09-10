import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Post from '../views/Post.vue';
import Tag from '../views/Tag.vue';
import Archive from '../views/Archive.vue';
import Memos from "../views/Memos.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/posts/:slug',
        name: 'posts',
        component: Post,
        props: true,
    },
    {
        path: '/tag', // 新增的路由
        name: 'tagDefault',
        component: Tag,
        props: { tag: '默认标签' }, // 可以设置一个默认标签
    },
    {
        path: '/tag/:tag',
        name: 'tag',
        component: Tag,
        props: true,
    },
    {
        path: '/archive/',
        name: 'archive',
        component: Archive,
        props: true,
    },
    {
        path: '/memos',
        name: 'memos',
        component: Memos,
    },
    {
        path: '/about',
        redirect: '/posts/About',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {
    window.scrollTo(0, 0); // 滚动到页面顶部
});

export default router;
