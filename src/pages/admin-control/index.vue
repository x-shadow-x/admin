<template>
    <div class="control_main">
        <SideMenu />
        <div class="contorl_content">
            <router-view class="transition-view"></router-view>
            <!-- <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </h1>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </h1>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </h1> -->
        </div>
    </div>
</template>

<style scoped>

.control_main {
    display: flex;
    flex-grow: 1;
    position: relative;
}

.contorl_content {
    flex-grow: 1;
    overflow: auto;
}

.contorl_content::-webkit-scrollbar {
    width: 10px;
}

.contorl_content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.contorl_content::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #efefef;
}
</style>

<script>
import SideMenu from './components/side-menu'
export default {
    components: { SideMenu },
    data() {
        return {};
    },
    methods: {
        test() {}
    }
}
</script>


