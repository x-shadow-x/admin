const UserComment = r => require.ensure([], () => r(require('@/modules/content-manager/comment-manager/user-comment-manager/pages/index')), 'content');

const route = {
    id: 'userComment',
    path: '/userComment',
    component: UserComment,
    meta: {
        menu: 'userComment',
        title: '用户评论管理'
    }
};

const menu = {
    id: 'userComment',
    title: '用户评论管理',
    icon: 'ios-paper',
    to: '/userComment',
    parentId: 'comment'
};

export default {
    route,
    menu
};
