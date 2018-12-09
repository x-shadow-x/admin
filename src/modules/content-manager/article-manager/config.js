// const Article = r => require.ensure([], () => r(require('@/modules/content-manager/article-manager/pages/index')), 'content');
// const ArticleDetail = r => require.ensure([], () => r(require('@/modules/content-manager/article-manager/pages/detail')), 'content');
const Article = () => import(/* webpackChunkName: "content" */ '@/modules/content-manager/article-manager/pages/index');
const ArticleDetail = () => import(/* webpackChunkName: "content" */ '@/modules/content-manager/article-manager/pages/detail');

const routes = [{
    id: 'article',
    path: '/article',
    component: Article,
    meta: {
        title: '文章管理',
        sideMenu: true,
        id: 'article'
    }
}, {
    id: 'articleDetail',
    path: '/article/detail',
    component: ArticleDetail,
    meta: {
        title: '文章详情',
        id: 'article'
    }
}];

const menu = {
    id: 'article',
    title: '文章管理',
    icon: 'ios-paper',
    to: '/article',
    parentId: 'content'
};

export default {
    routes,
    menu
};
