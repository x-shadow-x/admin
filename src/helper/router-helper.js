/**
 * 管理打开过的页签，记录对应的路由列表
 */
import Vue from 'vue';

export default new Vue({
    data() {
        return {
            visitRouteList: [],
            currentTag: {}
        }
    },

    methods: {
        addRoute(route) {
            const to = route.fullPath.replace(/&pageToken=\d+/, '');
            for(let i = 0, len = this.visitRouteList.length; i < len; i++) {
                if(this.visitRouteList[i].to === to) {
                    this.selectRoute(to);
                    return;
                }
            }
            
            this.visitRouteList.push({
                to: to,
                title: route.meta.title
            });
            this.selectRoute(to);
        },

        addRoute2(route) {
            if(route.meta.sideMenu) {
                for(let i = 0, len = this.visitRouteList.length; i < len; i++) {
                    if(this.visitRouteList[i].to === route.path) {
                        this.selectRoute(route.path);
                        return;
                    }
                }
                this.visitRouteList.push({
                    to: route.path,
                    title: route.meta.title
                });
                this.selectRoute(route.path);
            } else {
                this.visitRouteList.push({
                    to: route.path,
                    title: route.meta.title
                });
                this.selectRoute(route.path);
            }
        },

        selectRoute(to) {
            for(let i = 0, len = this.visitRouteList.length; i < len; i++) {
                if(this.visitRouteList[i].to === to) {
                    this.currentTag = this.visitRouteList[i];
                    return;
                }
            }
            this.currentTag = {};
        },

        closeRoute(index) {
            this.visitRouteList.splice(index, 1);
        },

        getCurrentTag(to) {
            
        }
    }
});