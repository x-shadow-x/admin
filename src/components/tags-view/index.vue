<template>
    <div class="tags-view-wrapper">
        <router-link class="tags-view-item" :to="item" :key="item.path" :class="isActive(item)?'active':''" v-for="(item) in Array.from(visitedViews)">
            {{item.params.name}}
            <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(item)'></span>
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>


