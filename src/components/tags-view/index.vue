<template>
    <div class="tags_bar">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in visitRouteList" class="tags_slide" :class="{active: index == 1}" :title="item.title" @click="selectTag">
                <router-link :to="item.to" class="tags_item">
                    <span class="tags_title">{{item.title}}</span>
                    <Icon type="md-close-circle" class="close_btn" @click.prevent.stop="closedTag" size="18" />
                </router-link>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import RouterHelper from '@/helper/router-helper.js';

export default {
    data() {
        return {
            swiperOption: {
                mousewheel: true,
                slidesPerView: 'auto'
            }
        };
    },

    computed: {
        visitRouteList() {
            return RouterHelper.visitRouteList;
        }
    },

    methods: {
        selectTag() {
            
        },
        closedTag() {
            console.log(123);
        }
    }
}
</script>

<style scoped>
.tags_bar {
    padding-top: 10px;
    margin: 10px 0;
    box-shadow: 0 2px 4px #efefef;
    transition: all .24s;
    white-space: nowrap;
}

.tags_slide {
    width: 230px;
}

.tags_slide:first-child {
    padding-left: 4px;
}

.tags_slide:last-child {
    padding-right: 8px;
}

.tags_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    background: rgba(200, 200, 200, .1);
    color: #aaa;
    border: 1px solid #eee;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    transition: background .24s;
    user-select: none;
    cursor: pointer;
}

.tags_slide + .tags_slide .tags_item {
    border-left: none;
}

.tags_title {
    min-width: 130px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tags_item:hover {
    background: rgba(244, 244, 244, .1);
}

.tags_slide.active .tags_item {
    border-color:#2d8cf0;
    background: #2d8cf0;
    color: #fff;
}

.close_btn {
    color: rgba(0, 0, 0, .15);
}

.close_btn:hover {
    color: rgba(0, 0, 0, .4);
}

.tags_slide.active .tags_item .close_btn:hover {
    color: rgba(255, 255, 255, .6);
}
</style>


