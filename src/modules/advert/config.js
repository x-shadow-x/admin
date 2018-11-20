const AdvertEdit = r => require.ensure([], () => r(require("@/modules/advert/pages/edit")), "advert");

const routes = [{
    path: "/advert",
    component: AdvertEdit,
    meta: {
        title: '广告位管理',
        sideMenu: true,
        id: 'advert'
    }
}];

const menu = {
    id: 'advert',
    name: "Advert",
    title: "广告位管理",
    icon: 'ios-stats',
    to: "/advert",
    parentId: 'root'
};
export default {
    routes,
    menu
};
