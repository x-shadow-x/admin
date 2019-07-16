/**
 * 管理打开过的页签，记录对应的路由列表
 */
import Vue from 'vue';

export default new Vue({
    data() {
        return {
            visitRouteList: [],
            currentTag: {},
            vueInstances: []
        }
    },

    methods: {
        addRoute(route) {
            const to = route.fullPath.replace(/[&?]pageToken=\d+/, '');
            for(let i = 0, len = this.visitRouteList.length; i < len; i++) {
                if(this.visitRouteList[i].to === to) {
                    this.setCurrentRoute(to);
                    return;
                }
            }
            this.visitRouteList.push({
                to: to,
                title: route.meta.title
            });
            this.setCurrentRoute(to);
        },

        setCurrentRoute(reference) {
            const to = Object.prototype.toString.call(reference) === '[object String]'
                        ? reference
                        : reference.fullPath && reference.fullPath.replace(/[&?]pageToken=\d+/, '');
            if(!to) {
                return;
            }
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
        }
    }
});