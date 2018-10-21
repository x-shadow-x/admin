import Vue from 'vue';
import ModuleManager from '@/modules/module-config';

const PageHelper = new Vue({
    data: {
        currentMenu: '',
        currentRoute: {}
    },

    methods: {
        setCurrentMenu(route) {
            const ids = (route.meta && route.meta.ids) || '';
            this.currentMenu = ModuleManager.getMenu((ids && ids.split('-')) || []);
        },

        setCurrentRoute(route) {
            this.currentRoute = route;
        }
    }
});

export default PageHelper;