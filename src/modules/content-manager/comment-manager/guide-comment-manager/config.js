const GuideComment = r => require.ensure([], () => r(require('@/modules/content-manager/comment-manager/guide-comment-manager/pages/index')), 'content');

const route = {
    path: '/guideComment',
    component: GuideComment,
    meta: {
        title: '导购评论管理',
        ids: 'comment-guideComment'
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
