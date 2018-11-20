<template>
    <div
        v-if="layoutData.type === 'Group'"
        class="layout"
        :data-indexRecord="layoutData.indexRecord"
        @click.stop="editLayout"
        :style="layoutStyle">
        <span class="tip" :class="{selected: isSelect}" v-show="isSelect">广告组，需填充广告位或轮播广告位</span>
        <span class="border border-t" :class="{selected: isSelect}"></span>
        <span class="border border-r" :class="{selected: isSelect}"></span>
        <span class="border border-b" :class="{selected: isSelect}"></span>
        <span class="border border-l" :class="{selected: isSelect}"></span>
        <span class="del-layout" :class="{enter: isSelect}" :data-indexRecord="layoutData.indexRecord" @click.stop="delLayout">删除</span>
        <Layout v-for="item in layoutData.child" :key="item.id" :layout-data="item" />
    </div>
    <Ad v-else-if="layoutData.type === 'Img'" :layout-data="layoutData" />
    <Gallery v-else-if="layoutData.type == 'Gallery'" :layout-data="layoutData" />
</template>

<script>
import Ad from "./ad";
import Gallery from "./gallery";
import LayoutManager from "@/helper/manager/layout-manager.js";

export default {
    name: "Layout",
    components: { Ad, Gallery },
    props: ["layoutData"],
    data() {
        return {};
    },
    computed: {
        isSelect() {
            if (this.layoutData.indexRecord.join && LayoutManager.indexRecord.join) {
                return this.layoutData.indexRecord.join() === LayoutManager.indexRecord.join();
            } else {
                return false;
            }
        },
        layoutStyle() {
            const other = {};
            const temp = (this.layoutData.style && this.layoutData.style.other.replace(/[{}\n]/g, "")) || "";
            temp.split(";").forEach(item => {
                const itemArr = item.split(":");
                if (itemArr.length >= 2 && itemArr[0] && itemArr[1]) {
                    other[itemArr[0].trim()] = itemArr[1];
                }
            });
            // 宽高拼凑单位的时候需做判断，因为
            // this.layoutData.style.height.unit有可能因为赋值的时候变成undefined，触发代码在layout-manager中，暂未找到原因
            const width = this.layoutData.style.width.unit
                            ? `${this.layoutData.style.width.value}${this.layoutData.style.width.unit}`
                            : `${this.layoutData.style.width.value}`;
            const height = this.layoutData.style.height.unit
                            ? `${this.layoutData.style.height.value}${this.layoutData.style.height.unit}`
                            : `${this.layoutData.style.height.value}`;
            return (this.layoutData.style.width && {
                width: width,
                height: height,
                padding: this.layoutData.style.padding.replace(/\[|\]/g, "").split(",").map(item => `${item.trim()}px`).join(" "),
                margin: this.layoutData.style.margin.replace(/\[|\]/g, "").split(",").map(item => `${item.trim()}px`).join(" "),
                ...other
            }) || {};
        }
    },
    methods: {
        editLayout(e) {
            const indexRecord = e.currentTarget.getAttribute("data-indexRecord");
            LayoutManager.readyLayoutAttr((indexRecord && indexRecord.split(",")) || []);
        },

        delLayout(e) {
            const indexRecord = e.currentTarget.getAttribute("data-indexRecord");
            LayoutManager.delLayout((indexRecord && indexRecord.split(",")) || []);

        }
    }
};
</script>

<style scoped>
.layout {
    position: relative;
    background: lightblue;
    display: inline-flex;
    flex-wrap: wrap;
    align-content: flex-start;
    transition: all .24s;
    font-size: 12px;
    overflow: hidden;
    width: 100%;
}

.tip {
    color: lightseagreen;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    z-index: 2;
}

.del-layout {
    position: absolute;
    right: 0;
    top: -100%;
    opacity: 0;
    background: rgba(0, 0, 0, .4);
    color: #fff;
    padding: 4px 10px;
    transition: all .24s;
    z-index: 10;
    cursor: pointer;
}

.del-layout.enter {
    opacity: 1;
    top: 0;
}

.border {
    position: absolute;
    z-index: 2;
}

.border-t,
.border-b {
    left: 0;
    right: 0;
    border-top: 1px dashed #efefef;
}

.border-l,
.border-r {
    top: 0;
    bottom: 0;
    border-left: 1px dashed #efefef;
}

.border-t {
    top: 0;
}

.border-b {
    bottom: 0;
}

.border-l {
    left: 0;
}

.border-r {
    right: 0;
}

.border.selected {
    border-width: 2px;
    border-color: red;
}
</style>
