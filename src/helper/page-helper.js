import Vue from 'vue';
const PageHelper = new Vue({
    data: {
        currentMenu: ''
    },

    methods: {
        setCurrentMenu(route) {
            this.currentMenu = route.path;
        }
    }
});

export default PageHelper;