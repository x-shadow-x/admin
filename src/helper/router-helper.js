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
        addRoute(nextRoute) {
            for(let i = 0, len = this.visitRouteList.length; i < len; i++) {
                if(this.visitRouteList[i].to === nextRoute.to) {
                    this.selectRoute(nextRoute.to);
                    return;
                }
            }
            this.visitRouteList.push(nextRoute);
            this.selectRoute(nextRoute.to);
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