<template>
    <div class="bg-page cev-root spin-box">
        <div class="cev-root">
            <div class="bg-shadow padding20">
                <h3 class="card-title-edit">入口管理</h3>
                <div class="card-body-edit">
                    <EditItem name="自定义页面名称">
                        <Input slot="edit" size="large" v-model="entryName" clearable />
                    </EditItem>

                    <div class="bg-shadow layout-outer-box">
                        <LayoutPanel :layout-data="layoutData"/>
                        <div class="handle-box">
                            <div class="button-box">
                                <Button type="primary" size="large" long @click="addRootGroup">组</Button>
                            </div>
                            <div class="button-box">
                                <Button type="primary" size="large" long @click="addRootAd">广告</Button>
                            </div><div class="button-box">
                                <Button type="primary" size="large" long @click="addRootGallery">轮播广告</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body-toolbar">
                    <Button size="large" type="primary" @click.native="submit">保存</Button>
                </div>
            </div>
        </div>
        <Spin v-if="loading" class="spin" size="large" fix></Spin>
    </div>
</template>
<script>
import UploadImg from "@/components/upload-img-group";
import EditItem from "@/components/edit-item";
import { dataTrans as DataTrans, default as LayoutManager } from "@/helper/manager/layout-manager.js";
import LayoutPanel from "./components/layout-panel";

export default {
    data() {
        return {
            loading: false,
            isShow: true,
            data: null,
            url: null
        };
    },

    components: { UploadImg, EditItem, LayoutPanel },
    mounted() {
        const result = DataTrans.buildLayout(JSON.parse('[{"type":"Group","style":{"width":0,"height":"","margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{},"child":[{"type":"Group","style":{"width":375,"height":"","margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{},"child":[{"type":"Img","style":{"width":0,"height":100,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016182953204_7403.PNG","type":"","appId":"","path":"pages/index/index","cateId":"","statName":""}},{"type":"Gallery","style":{"width":0,"height":100,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"interval":"","duration":"","autoplay":true},"child":[{"type":"Img","style":{"width":0,"height":100,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016183001297_2943.PNG","type":"Web","appId":"","path":"pages/index/index","cateId":"","statName":""}},{"type":"Img","style":{"width":0,"height":100,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016183036938_4285.PNG","type":"Page","appId":"","path":"pages/index/index","cateId":"","statName":""}}]}]},{"type":"Img","style":{"width":375,"height":200,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016182904969_3434.PNG","type":"","appId":"","path":"pages/index/index","cateId":"","statName":""}}]},{"type":"Group","style":{"width":0,"height":"","margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{},"child":[{"type":"Img","style":{"width":375,"height":200,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016225327094_3916.JPEG","type":"Outer","appId":"appid","path":"pages/index/index","cateId":"","statName":""}},{"type":"Img","style":{"width":375,"height":200,"margin":[0,0,0,0],"padding":[0,0,0,0],"other":""},"parameters":{"src":"https://m60files.trendy-global.com/images/utils/20181016/20181016225318282_3380.JPEG","type":"Web","appId":"","path":"pages/index/index","cateId":"","statName":""}}]}]'));
        console.log(JSON.stringify(result), '=======');
        LayoutManager.resetLayoutData(result);
    },
    computed: {
        guide_id() {
            return this.$route.query.id;
        },
        entryName: {
            get() {
                return (this.data && this.data.title) || "";
            },
            set(val) {
                this.data || (this.data = {});
                this.$set(this.data, "title", val);
            }
        },
        enable: {
            get() {
                if (this.data && this.data.enable !== undefined) {
                    return !!Number(this.data.enable);
                } else {
                    return false;
                }
            },
            set(val) {
                this.data || (this.data = {});
                this.$set(this.data, "enable", Number(val));
            }
        },
        isTest: {
            get() {
                if (this.data && this.data.isTest !== undefined) {
                    return !!Number(this.data.isTest);
                } else {
                    return false;
                }
            },
            set(val) {
                this.data || (this.data = {});
                this.$set(this.data, "isTest", Number(val));
            }
        },
        layoutData() {
            console.log(LayoutManager.layoutData);
            return (LayoutManager.layoutData && {...LayoutManager.layoutData.child}) || {};
        }
    },
    methods: {
        getUrl(urls) {
            this.url = urls;
        },

        addRootGroup() {
            const id = new Date().getTime();
            const layout = {
                id: id,
                indexRecord: [id],
                type: "Group",
                style: {
                    width: {
                        value: "",
                        unit: "px"
                    },
                    height: {
                        value: 100,
                        unit: "px"
                    },
                    margin: "[0, 0, 0, 0]",
                    padding: "[0, 0, 0, 0]",
                    other: ""
                },
                parameters: {},
                child: {}
            };

            LayoutManager.addRootLayout(layout);

        },
        addRootAd() {
            const id = new Date().getTime();
            const layout = {
                id: id,
                indexRecord: [id],
                type: "Img",
                style: {
                    width: {
                        value: "",
                        unit: "px"
                    },
                    height: {
                        value: 100,
                        unit: "px"
                    },
                    margin: "[0, 0, 0, 0]",
                    padding: "[0, 0, 0, 0]",
                    other: ""
                },
                parameters: {
                    src: "",
                    type: "",
                    appId: "",
                    path: "pages/index/index",
                    cateId: "",
                    statName: ""
                }
            };

            LayoutManager.addRootLayout(layout);

        },
        addRootGallery() {
            const id = new Date().getTime();
            const galleryAttr = {
                style: {
                    width: {
                        value: "",
                        unit: "px"
                    },
                    height: {
                        value: 100,
                        unit: "px"
                    },
                    margin: "[0, 0, 0, 0]",
                    padding: "[0, 0, 0, 0]",
                    other: ""
                }
            };
            const layout = {
                id: id,
                indexRecord: [id],
                type: "Gallery",
                parameters: {
                    interval: "",
                    duration: "",
                    autoplay: ""
                },
                child: {
                    [id + 1]: {
                        type: "Img",
                        parameters: {
                            src: "",
                            type: "",
                            appId: "",
                            path: "pages/index/index",
                            cateId: "",
                            statName: ""
                        },
                        ...galleryAttr
                    }
                },
                ...galleryAttr
            };

            LayoutManager.addRootLayout(layout);

        },
        submit() {
            console.log({...LayoutManager.layoutData});
            // DataTrans.buildDbLayout({...LayoutManager.layoutData});
        }
    }
};
</script>

<style scoped>
.layout-outer-box {
    width: 752px;
    margin-top: 20px;
}

.handle-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-top: 1px solid #efefef;
}

.button-box {
    flex: 1;
    padding: 0 10px;
}

.card-body-toolbar {
    margin-top: 20px;
}
</style>
