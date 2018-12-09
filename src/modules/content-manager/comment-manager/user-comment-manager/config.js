// const UserComment = r => require.ensure([], () => r(require('@/modules/content-manager/comment-manager/user-comment-manager/pages/index')), 'content');
const UserComment = () => import(/* webpackChunkName: "content" */ '@/modules/content-manager/comment-manager/user-comment-manager/pages/index');
const routes = [{
    path: '/userComment',
    component: UserComment,
    meta: {
        title: '用户评论管理',
        sideMenu: true,
        id: 'userComment'
    }
}];

const menu = {
    id: 'userComment',
    title: '用户评论管理',
    icon: 'ios-paper',
    to: '/userComment',
    parentId: 'comment'
};

export default {
    routes,
    menu
};
