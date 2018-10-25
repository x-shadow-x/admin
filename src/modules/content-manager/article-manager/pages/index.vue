<template>
    <div>
        <Table
            ref="table"
            class="table"
            :columns="columns"
            :data="tableList"
            border
            @on-row-click="selectRow"></Table>
            <Button type="primary" @click="test">test</Button>
    </div>
</template>

<script>
import Mixin from './mixin.js';
import RouterHelper from '@/helper/router-helper.js';
export default {
    mixins: [Mixin],
    data() {
        return {
            tableList: [{
                    layoutName: 'item1',
                    layoutStatName: 'item1-layout'
                }, {
                    layoutName: 'item2',
                    layoutStatName: 'item2-layout'
                }, {
                    layoutName: 'item3',
                    layoutStatName: 'item3-layout'
                }
            ]
        };
    },

    mounted() {
    },

    methods: {
        selectRow(row, index) {
            this.$router.push(`/article/detail?row=${index}`);
        },

        test() {
            console.log(RouterHelper.visitRouteList);
        }
    }
}
</script>

