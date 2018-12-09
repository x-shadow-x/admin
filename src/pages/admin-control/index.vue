<template>
    <div class="control_main">
        <SideMenu />
        <div class="contorl_content scroll_box">
            <tags-view />
            <transition
                :enter-class="transitionClass.enter"
                :enter-active-class="transitionClass.enterActive"
                :enter-to-class="transitionClass.enterTo"
                :leave-class="transitionClass.leave"
                :leave-active-class="transitionClass.leaveActive"
                :leave-to-class="transitionClass.leaveTo">
                    <keep-alive>
                        <router-view :key="key" class="transition_view"></router-view>
                    </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import TagsView from '@/pages/admin-control/components/tags-view';
import SideMenu from '@/pages/admin-control/components/menus/side-menu';
import RouterHelper from '@/helper/router-helper.js';
import { PM } from "@/router/";
let orianglPath;
let orianglKey
export default {
    components: { SideMenu, TagsView },
    data() {
        return {};
    },

    computed: {
        transitionClass() {
            return {
                enter: PM.enterClass,
                enterActive: `${PM.enterClass}-active`,
                enterTo: `${PM.enterClass}-to`,
                leave: PM.leaveClass,
                leaveActive: `${PM.leaveClass}-active`,
                leaveTo: `${PM.leaveClass}-to`
            }
        },
        key() {
            if(orianglPath == this.$route.fullPath) {
                return orianglKey;
            }
            orianglPath = this.$route.fullPath;
            orianglKey = this.$route.fullPath.replace(/[&?]pageToken=\d+/, RouterHelper.currentTag.timeStamp);
            return this.$route.fullPath.replace(/[&?]pageToken=\d+/, RouterHelper.currentTag.timeStamp);
        }
    },
    
    methods: {
        test() {},
    },
    
    mounted() {}
}
</script>

<style scoped>
.control_main {
    position: relative;
    display: flex;
    height: 100%;
}

.contorl_content {
    width: calc(100vw - 240px);
    overflow-y: auto;
    overflow-x: hidden;
}

.tab_bar {
    margin: 10px;
}
</style>
