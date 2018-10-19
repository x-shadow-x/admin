<template>
    <div class="control_main">
        <SideMenu />
        <div class="contorl_content scroll_box">
            <transition
                :enter-class="transitionClass.enter"
                :enter-active-class="transitionClass.enterActive"
                :enter-to-class="transitionClass.enterTo"
                :leave-class="transitionClass.leave"
                :leave-active-class="transitionClass.leaveActive"
                :leave-to-class="transitionClass.leaveTo">
                <router-view class="transition_view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import SideMenu from './components/side-menu';
import PageHelper from '@/helper/page-helper.js';
import { PM } from "@/router/";

export default {
    components: { SideMenu },
    data() {
        return {};
    },

    computed: {
        transitionClass() {
            return {
                enter: PM.enterClass,
                enterActive: `${PM.enterClass}-active`,
                enterTo: `${PM.enterClass}-active`,
                leave: PM.leaveClass,
                leaveActive: `${PM.leaveClass}-active`,
                leaveTo: `${PM.leaveClass}-to`
            }
        }
    },

    watch: {
        $route(nv) {
            PageHelper.setCurrentMenu(nv);
            PageHelper.setCurrentRoute(nv);
        }
    },
    
    methods: {
        test() {}
    },
    
    mounted() {
        PageHelper.setCurrentMenu(this.$route);
        PageHelper.setCurrentRoute(this.$route);
    }
}
</script>

<style scoped>
.control_main {
    display: flex;
    height: 100%;
    position: relative;
}

.contorl_content {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>


