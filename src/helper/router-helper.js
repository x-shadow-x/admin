/**
 * 管理打开过的页签，记录对应的路由列表
 */
import Vue from 'vue';

export default new Vue({
    data() {
        return {
            visitRouteList: [{
                title: '统计分析',
                to: '/count',
            }, {
                title: '文章管理文章管理文章管理文章管理文章管理文章管理',
                to: '/article'
            }, {
                title: '文章管理2文章管理2文章管理2文章管理2文章管理2文章管理2',
                to: '/article2'
            }, {
                title: '文章管理3文章管理3文章管理3文章管理3文章管理3文章管理3',
                to: '/article3'
            }, {
                title: '文章管理4',
                to: '/article4'
            }, {
                title: '文章管理5文章管理5文章管理5文章管理5',
                to: '/article5'
            }, {
                title: '文章管理6',
                to: '/article6'
            }],
            currentTag: {}
        }
    },

    methods: {
        addTag() {},

        selectTag() {
            
        }
    }
});