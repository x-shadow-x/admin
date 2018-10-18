<template>
    <Submenu v-if="menu.children && menu.children.length > 0" :name="menu.id" :key="menu.id">
        <template slot="title">
            <Icon :type="menu.icon" />{{menu.title}}
        </template>
        <template v-for="item in menu.children">
            <tree-menus :menu="item" :key="item.key"></tree-menus>
        </template>
    </Submenu>
    <MenuItem v-else :name="menu.to" :key="menu.id">
        <Icon :type="menu.icon" />{{menu.title}}
    </MenuItem>
</template>

<script>
export default {
    name:'TreeMenus',
    props: ['menu'],
    mounted() {
    }
}
</script>
