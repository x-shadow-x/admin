<template>
    <div class="control_main">
        <SideMenu />
        <div class="contorl_content">
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
        return {
            currentMenu: ''
        };
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

    watch: {},
    
    methods: {
        test() {}
    },
    
    mounted() {
        PageHelper.setCurrentMenu(this.$route);
    }
}
</script>

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
    background: rgba(0, 0, 0, .2);
}

.contorl_content::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #fff;
}
</style>


