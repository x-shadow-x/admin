// const GuideComment = r => require.ensure([], () => r(require('@/modules/content-manager/comment-manager/guide-comment-manager/pages/index')), 'content');
const GuideComment = () => import(/* webpackChunkName: "content" */ '@/modules/content-manager/comment-manager/guide-comment-manager/pages/index');

const routes = [{
    path: '/guideComment',
    component: GuideComment,
    meta: {
        title: '导购评论管理',
        sideMenu: true,
        id: 'guideComment'
    }
}];

const menu = {
    id: 'guideComment',
    title: '导购评论管理',
    icon: 'ios-paper',
    to: '/guideComment',
    parentId: 'comment'
};

export default {
    routes,
    menu
};
