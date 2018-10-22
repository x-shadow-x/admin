<template>
    <div>
        数据分析
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, animi, rem eum cum quasi minus blanditiis id cupiditate quibusdam nostrum voluptas quod et consequuntur illo dolorum eligendi dolorem earum. Dicta!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit molestias asperiores commodi ipsam cum aliquam, at facilis, quibusdam rem delectus libero maxime animi adipisci! Itaque tempore ducimus eligendi sed amet.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni veritatis quas expedita voluptate quia corrupti ipsam fugiat facilis labore perferendis. Odio, amet quibusdam sapiente odit doloribus et excepturi quisquam nemo?
        <div>
            <h2 v-if="state">隐藏的文本</h2>
            <Button type="primary" @click="test">修改状态</Button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            state: false
        };
    },

    mounted() {
        console.log('analyse 123');
    },

    methods: {
        test() {
            this.state = true;
            console.log(456);
        }
    }
}
</script>

