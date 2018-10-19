const Article = r => require.ensure([], () => r(require('@/modules/content-manager/article-manager/pages/index')), 'content');

const route = {
    id: 'article',
    path: '/article',
    component: Article,
    meta: {
        title: '文章管理',
        ids: 'content-article'
    }
};

const menu = {
    id: 'article',
    title: '文章管理',
    icon: 'ios-paper',
    to: '/article',
    parentId: 'content'
};

export default {
    route,
    menu
};
