<template>
    <div :class="{'edit-item':true , 'full':full}">
        <div class="edit-item-name">
            <p class="name">{{name}}</p>
            <p v-if="label" class="label">{{label}}</p>
        </div>
        <div :class="{'edit-item-cev':true , 'full':full}">
            <div class="edit">
                <slot name="edit"></slot>
            </div>
            <p v-if="description" class="description">{{description}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        label: String,
        description: String,
        full: Boolean
    }
};
</script>

<style lang="less" scoped>
    .edit-item {
        width: 100%;
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        > .edit-item-name {
            overflow: hidden;
            width: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-top: 10px;
            > .name {
                color: #333;
            }
            > .label {
                color: #aaa;
            }
        }
        > .edit-item-cev {
            max-width: 400px;
            margin-left: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            > .edit {
                min-height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
            }
            > .description {
                width: 100%;
                color: #aaa;
            }
        }
        > .edit-item-cev.full {
            max-width: unset;
            margin-top: 10px;
            margin-left: unset;
        }
    }
    .edit-item {
        flex-direction: row;
    }
    .edit-item.full {
        flex-direction: column;
    }
</style>
