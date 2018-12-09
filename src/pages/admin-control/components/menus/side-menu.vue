<template>
    <div id="sideMenu" class="side_menu_box">
        <div class="scroll_out_box">
            <div class="side_menu scroll_box">
                <Menu theme="dark"@on-select="onMenuSelect" :open-names="(currentMenu.openNames || '').split('-')" :active-name="currentMenu.id">
                    <template v-for="item in menuTree">
                        <tree-menus :key="item.id" :menu="item" />
                    </template>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleManager from '@/modules/module-config';
import TreeMenus from '@/pages/admin-control/components/menus/tree-menus';
import PageHelper from '@/router/page-helper.js';
import RouterHelper from '@/helper/router-helper.js';

export default {
    data() {
        return {
            theme: 'dark',
            name: '/article'
        }
    },

    computed: {
        menuTree() {
            return ModuleManager.mosules.menuTree;
        },
        currentMenu() {
            return PageHelper.currentMenu;
        }
    },

    methods: {
        onMenuSelect(name) {
            const nextMenu = ModuleManager.getMenu(name);
            this.$router.push(nextMenu.to);
        },
    },

    mounted() {
    },

    components: {
        TreeMenus
    },
}
</script>

<style scoped>
.side_menu_box {
    height: 100%;
    position: relative;
    background: #282c34;
}

.scroll_out_box {
    width: 240px;
    height: 100%;
    overflow-x: hidden;
}

.side_menu {
    width: 260px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.side_menu_box .ivu-menu-submenu-title {
    padding-left: 0; 
    padding-right: 0; 
}
</style>


