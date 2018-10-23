import Vue from 'vue';
import ModuleManager from '@/modules/module-config.js';

const PageHelper = new Vue({
    data: {
        currentMenu: {},
        currentRoute: {}
    },

    methods: {
        setCurrentMenu(route) {
            const id = (route.meta && route.meta.id) || '';
            this.currentMenu = ModuleManager.getMenu(id);
        },

        setCurrentRoute(route) {
            this.currentRoute = route;
        }
    }
});

export default PageHelper;