const Count = r => require.ensure([], () => r(require('@/modules/content-manager/article-manager/pages/index')), 'analyse');

const route = {
    id: 'count',
    path: '/count',
    component: Count,
    meta: {
        menu: 'Count',
        title: '统计分析'
    }
};

const menu = {
    id: 'count',
    title: '统计分析',
    icon: 'ios-stats',
    to: '/count',
    parentId: 'root'
};

export default {
    route,
    menu
};
