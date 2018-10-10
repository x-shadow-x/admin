<template>
    <div id="mainRoot" class="main_root">
        <div class="main_header">
            <h1>后台管理</h1>
        </div>
        <div id="main" class="main_body">
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
import { PM } from "@/router/";
export default {
    name: "app",
    data() {
        return {
        transitionClass: {
            
        },
        focus: false
        };
    },

  watch: {
    $route(to, from) {
        PM.setTransitionClass(to, from, (transitionClass) => {
            this.transitionClass = transitionClass;
        });
    }
  }
};
</script>
    
<style scoped>
@import "~@/assets/css/reset.css";

.main_root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.main_header {
    display: flex;
    align-items: center;
    height: 60px;
    background: #282c34;
    color: #ddd;
    padding-left: 10px;
    flex-shrink: 0;
}

.main_body {
    display: flex;
    flex-grow: 1;
}
</style>
