// const Count = r => require.ensure([], () => r(require('@/modules/count-analyse/pages/index')), 'analyse');
const Count = () => import(/* webpackChunkName: "analyse" */ '@/modules/count-analyse/pages/index');

const routes = [{
    path: '/count',
    component: Count,
    meta: {
        title: '统计分析',
        sideMenu: true,
        id: 'count'
    }
}];

const menu = {
    id: 'count',
    title: '统计分析',
    icon: 'ios-stats',
    to: '/count',
    parentId: 'root',
    animate: {
        enter: 'special_enter',
        leave: 'special_leave'
    }
};

export default {
    routes,
    menu
};
