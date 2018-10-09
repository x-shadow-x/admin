<template>
    <div @click="handleJump">hello world</div>
</template>

<script>
export default {
    name: "asd",
    data() {
        return {}
    },

    methods: {
        handleJump() {
            console.log(this.$route);
            this.$router.push('bar')
        }
        
    }
}
</script>

