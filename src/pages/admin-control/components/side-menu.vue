<template>
    <div id="sideMenu" class="side_menu">
        <Menu theme="dark" @on-select="onMenuSelect">
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
import treeMenus from '@/pages/admin-control/components/tree-menus';
console.log(Modules);
export default {
    data() {
        return {
            theme: 'dark',
            value: [20, 50]
        }
    },

    computed: {
        menuTree() {
            return Modules.menuTree;
        }
    },

    methods: {
        onMenuSelect(name) {
            this.$router.push(name);
            // this.$emit("select", name);
            // console.log(name);
        }
    },

    components: {
        treeMenus
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


