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
    
    mounted() {}
}
</script>
