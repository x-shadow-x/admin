<template>
    <div id="sideMenu" class="side_menu">
        <Menu theme="dark" @on-select="onMenuSelect" :active-name="currentMenu">
            <template v-for="item in menuTree">
                <template v-if="item.children && item.children.length > 0">
                    <tree-menus :key="item.id" :menu="item" />
                </template>
                <template v-else>
                    <MenuItem :name="item.to" :key="item.id">
                        <Icon :type="item.icon" />{{item.title}}
                    </MenuItem>
                </template>
            </template>
        </Menu>
    </div>
</template>

<script>
import Modules from '@/modules/module-config';
import TreeMenus from '@/pages/admin-control/components/tree-menus';
import PageHelper from '@/helper/page-helper.js';

export default {
    data() {
        return {
            theme: 'dark',
            name: '/article',
            value: [20, 50]
        }
    },

    computed: {
        menuTree() {
            return Modules.menuTree;
        },
        currentMenu() {
            return PageHelper.currentMenu;
        }
    },

    methods: {
        onMenuSelect(name) {
            console.log(this.currentMenu, '1111111');
            this.$router.push(name);
            // this.$emit("select", name);
            this.name = name;
            // this.$emit("select", name);
            // console.log(name);
        }
    },

    watch: {
        onMenuSelect(newVal) {
            console.log(newVal, '=======onMenuSelect');
        }
    },

    mounted() {
        // console.log(PageHelper.currentMenu, '111111111');
    },

    components: {
        TreeMenus
    },
}
</script>

<style scoped>
.side_menu {
    position: relative;
    background: #282c34;
}

.side_menu .ivu-menu-submenu-title {
    padding-left: 0; 
    padding-right: 0; 
}
</style>


