<template>
    <div class="upload-img-box">
        <div v-if="single&&imgLength>1" class="upload-img-item">
            <img :src="mImgs" />
            <button class="upload-img-btn1">预览</button>
            <Upload class="upload-img-btn2" :show-upload-list="false" :before-upload="handleBeforeUpload" action="/">编辑</Upload>
            <button class="upload-img-btn3" @click="del">删除</button>
        </div>
        <transition-group v-else ref="uploadImgAnim" name="upload-img-anim" class=" upload-img-grid" tag="div">
            <div v-for="(url,index) in mImgs" :key="index" class="upload-img-item" v-if="index<imgCount">
                <img :src="url" />
                <button class="upload-img-btn1" @click="show(index)">预览</button>
                <Upload class="upload-img-btn2" @click="edit(index)" :show-upload-list="false" :before-upload="e=>handleBeforeUpload(e,index)" action="/">编辑</Upload>
                <button class="upload-img-btn3" @click="del(index)">删除</button>
            </div>
        </transition-group>
        <Upload v-if="imgLength<imgCount" ref="upload" class="upload-img-btn" type="drag" :show-upload-list="false" :before-upload="handleBeforeUpload" action="/" :multiple="imgCount>1">
            <div class="upload-img-btn-cev">
                <Icon type="ios-cloud-upload" size="36" style="color: #3399ff"></Icon>
                <p>点击或拖拽到此</p>
            </div>
        </Upload>
    </div>
</template>
<style scoped>
    .upload-img-item,
    .upload-img-btn {
        display: inline-block;
        border: 1px dashed;
        border-color: #ddd;
        border-radius: 4px;
        overflow: hidden;
        height: 100px;
        width: 100px;
    }
    .upload-img-btn-cev {
        height: 100px;
        width: 100px;
    }
    .upload-img-item:hover,
    .upload-img-btn:hover {
        border-color: #efefef;
    }
    .upload-img-btn-cev {
        display: inline-block;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .upload-img-grid {
        display: inline-block;
    }
    .upload-img-item {
        position: relative;
        margin-right: 8px;
        transition: all 0.5s ease-in-out;
    }
    .upload-img-item > img {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 100%;
    }
    .upload-img-item > .upload-img-btn1,
    .upload-img-item > .upload-img-btn2,
    .upload-img-item > .upload-img-btn3 {
        background: rgba(0, 0, 0, 0.4);
        border: none;
        padding: 2px 5px;
        color: #ddd;
        transition: all 0.3s;
    }
    .upload-img-item > .upload-img-btn1 {
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%, -100%);
    }
    .upload-img-item > .upload-img-btn2 {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%, -100%);
    }
    .upload-img-item > .upload-img-btn3 {
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translate(-100%, 100%);
    }
    .upload-img-item:hover > .upload-img-btn1,
    .upload-img-item:hover > .upload-img-btn2,
    .upload-img-item:hover > .upload-img-btn3 {
        transform: translate(0, 0);
    }
    .upload-img-anim-enter,
    .upload-img-anim-leave-to {
        opacity: 0;
    }
    .upload-img-anim-leave-active {
        position: absolute;
    }
</style>

<script>
import Sortable from "sortablejs";
export const TYPES = {
    UTILS: "UTILS",
    COMMODITY: "COMMODITY"
};
export default {
    props: {
        count: {
            type: Number,
            default: 9
        },
        single: Boolean,
        type: {
            type: String,
            default: TYPES.UTILS
        },
        imgs: Array | String
    },
    mounted() {
        this.mImgs = this.imgs;
        if (this.$refs.uploadImgAnim) {
            Sortable.create(this.$refs.uploadImgAnim.$el, {
                onEnd: event => {
                    this.onChange();
                }
            });
        }
    },
    watch: {
        imgs(val) {
            this.mImgs = val;
        }
    },
    data() {
        return { mImgs: 0 };
    },
    computed: {
        imgCount() {
            return this.single ? 1 : this.count;
        },
        imgLength() {
            return (this.mImgs && this.mImgs.length) || 0;
        }
    },
    methods: {
        onChange() {
            this.$emit("update:imgs", this.mImgs);
        },
        del(index) {
            if (this.single) {
                this.mImgs = null;
            } else {
                this.mImgs.splice(index, 1);
            }
            this.onChange();
        },
        show() {},
        push(img, index) {
            if (this.single) {
                this.mImgs = img;
            } else {
                this.mImgs || (this.mImgs = []);
                if (index === undefined) {
                    this.mImgs.push(img);
                } else {
                    this.mImgs.splice(index, 1, [img]);
                }
            }
            this.onChange();
        },
        handleBeforeUpload(file, index) {
            // let param = new FormData();
            // param.append("file", file, file.name);
            // MainApi.uploadImage({
            //     params: {
            //         type: this.type
            //     },
            //     data: param
            // })
            //     .then(res => {
            //         if (res.code === "1") {
            //             let pa = res.data[0];
            //             if (pa.code === "1") {
            //                 this.push(pa.data, index);
            //             } else {
            //                 return Promise.reject(pa.msg);
            //             }
            //         } else {
            //             return Promise.reject(res.msg);
            //         }
            //     })
            //     .catch(msg => {
            //         if (StringUtil.trim(msg)) {
            //             this.$Message.error(msg || "上传失败");
            //         }
            //     });
            // return false;
        }
    }
};
</script>
