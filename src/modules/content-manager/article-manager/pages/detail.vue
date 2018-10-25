<template>
    <div>
        <Input v-model="data.test" placeholder="Enter something..." style="width: 300px" />
    </div>
</template>

<script>
import RouterHelper from '@/helper/router-helper.js';
export default {
    data() {
        return {
            data: {
                test: ""
            }
        }
    },

    computed: {
        currentTag() {
            return RouterHelper.currentTag;
        }
    },

    watch: {
        $route(nV) {
            const currentTag = RouterHelper.currentTag;
            
            if(currentTag && currentTag.vueInstance) {
                try {
                    console.log(RouterHelper.visitRouteList[1].vueInstance.data == RouterHelper.visitRouteList[2].vueInstance.data);
                    console.log(currentTag.vueInstance.data == RouterHelper.visitRouteList[1].vueInstance.data);
                    console.log(currentTag.vueInstance.data == RouterHelper.visitRouteList[2].vueInstance.data);
                    console.log(this.data == currentTag.vueInstance.data);
                    console.log(this.data == RouterHelper.visitRouteList[1].vueInstance.data);
                    console.log(this.data == RouterHelper.visitRouteList[2].vueInstance.data);
                } catch (error) {}
                console.log(currentTag.to);
                // this.data = {...currentTag.vueInstance.data};
                // this.data = Object.assign({}, currentTag.vueInstance.data);
                // RouterHelper.setInstance(this.$route, this);
                for(let key in currentTag.vueInstance.data) {
                    console.log(key, currentTag.vueInstance.data[key]);
                    this.$set(this.data, key, currentTag.vueInstance.data[key])
                    try {
                        console.log(RouterHelper.visitRouteList[1].vueInstance.data[key], RouterHelper.visitRouteList[2].vueInstance.data[key], '=============');
                    } catch (error) {}
                }
                try {
                    console.log(RouterHelper.visitRouteList[1].vueInstance.data == RouterHelper.visitRouteList[2].vueInstance.data, '====22');
                    console.log(currentTag.vueInstance.data == RouterHelper.visitRouteList[1].vueInstance.data, '====22');
                    console.log(currentTag.vueInstance.data == RouterHelper.visitRouteList[2].vueInstance.data, '====22');
                    console.log(this.data == currentTag.vueInstance.data, '====22');
                    console.log(this.data == RouterHelper.visitRouteList[1].vueInstance.data, '====22');
                    console.log(this.data == RouterHelper.visitRouteList[2].vueInstance.data, '====22');
                } catch (error) {}
            }
        }
    },

    mounted() {
        const currentTag = RouterHelper.currentTag;
        if(currentTag && currentTag.vueInstance) {
            this.data = currentTag.vueInstance.data;
        } else {
            RouterHelper.setInstance(this.$route, this);
        }
    }
}
</script>
