const GuideComment = r => require.ensure([], () => r(require('@/modules/content-manager/comment-manager/guide-comment-manager/pages/index')), 'content');

const route = {
    id: 'guideComment',
    path: '/guideComment',
    component: GuideComment,
    meta: {
        menu: 'guideComment',
        title: '导购评论管理'
    }
};

const menu = {
    id: 'guideComment',
    title: '导购评论管理',
    icon: 'ios-paper',
    to: '/guideComment',
    parentId: 'comment'
};

export default {
    route,
    menu
};
