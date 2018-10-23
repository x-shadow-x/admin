<template>
    <div>
        <Table
            ref="table"
            class="table"
            :columns="columns"
            :data="tableList"
            border
            @on-row-click="selectRow"></Table>
    </div>
</template>

<script>
import Mixin from './mixin.js';
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
        console.log('article 123');
    },

    methods: {
        selectRow(row, index) {
            console.log(row, index);
            console.log(this.$route);
            this.$router.push(`/article/detail?row=${index}`);
        }
    }
}
</script>

