<template>
    <div class="layout-panel">
        <div class="layout-box">
            <Layout v-for="item in layoutData" :key="item.id" :layout-data="item" />
        </div>
        <div class="edit-panel bg-shadow">
            <div class="edit-panel-box padding20 scroll_box">
                <div>
                    <h2 class="edit-title">编辑面板{{currentNode.type}}</h2>
                    <Alert type="warning" show-icon>面板尺寸以750px为基准</Alert>
                    <div class="edit-box">
                        <EditItem name="宽度" label="单位（px）">
                            <!-- <Input slot="edit" size="large" v-model="width" clearable></Input> -->
                            <Input slot="edit" size="large" v-model="width" clearable>
                                <Select v-model="widthUnit" slot="append" style="width: 70px">
                                    <Option value="px">px</Option>
                                    <Option value="%">%</Option>
                                </Select>
                            </Input>
                        </EditItem>
                        <EditItem name="高度" label="单位（px）" v-show="currentNode.type != 'Group'">
                            <!-- <Input slot="edit" size="large" v-model="height" clearable></Input> -->
                            <Input slot="edit" size="large" v-model="height" clearable>
                                <Select v-model="heightUnit" slot="append" style="width: 70px">
                                    <Option value="px">px</Option>
                                    <Option value="%">%</Option>
                                </Select>
                            </Input>
                        </EditItem>
                        <EditItem name="内边距" label="对应上右下左">
                            <Input slot="edit" size="large" v-model="padding" clearable />
                        </EditItem>
                        <EditItem name="外边距" label="对应上右下左">
                            <Input slot="edit" size="large" v-model="margin" clearable />
                        </EditItem>
                        <EditItem name="其他样式" label="按css格式写法">
                            <Input slot="edit" size="large" type="textarea" :autosize="true" v-model="other" clearable placeholder="{}" />
                        </EditItem>
                        <EditItem name="编辑内容" label="给组添加广告位" v-show="currentNode.type == 'Group'">
                            <div slot="edit">
                                <div class="btn-box">
                                    <Button type="primary" size="large" long @click="addLayout">组</Button>
                                </div>
                                <div class="btn-box">
                                    <Button type="primary" size="large" long @click="addAd">广告</Button>
                                </div>
                                <div class="btn-box">
                                    <Button type="primary" size="large" long @click="addGallery">轮播广告</Button>
                                </div>
                            </div>
                        </EditItem>
                        <EditItem name="自动切换间隔" label="单位（毫秒）" v-show="currentNode.type == 'Gallery'">
                            <Input slot="edit" size="large" v-model="interval" clearable />
                        </EditItem>
                        <EditItem name="切换滑动速度" label="单位（毫秒）" v-show="currentNode.type == 'Gallery'">
                            <Input slot="edit" size="large" v-model="duration" clearable />
                        </EditItem>
                        <EditItem name="自动切换" v-show="currentNode.type == 'Gallery'">
                            <i-switch slot="edit" v-model="autoplay">
                                <span slot="open">开</span>
                                <span slot="close">关</span>
                            </i-switch>
                        </EditItem>
                        <template v-if="currentNode.type == 'Gallery'">
                            <h3 class="sub-title"></h3>
                            <div
                                class="bg-shadow padding10 gallery-content-box"
                                v-for="(item, index) in currentNode.child"
                                :key="index"
                                :data-index="index"
                                @click.capture="getGalleryKey">
                                <Tooltip placement="left" content="删除当前轮播页" class="del-btn" v-if="Object.keys(currentNode.child).length > 1">
                                    <Icon type="md-close-circle" size=30 @click="delGallertContent" />
                                </Tooltip>
                                <EditItem name="广告位图片">
                                    <UploadImage slot="edit" :imgs.sync="item.parameters.src" single></UploadImage>
                                </EditItem>
                                <EditItem name="跳转方式">
                                    <RadioGroup slot="edit" v-model="item.parameters.type">
                                        <Radio label="Web">小程序内嵌页</Radio>
                                        <Radio label="Page">当前小程序页</Radio>
                                        <Radio label="Outer">外部小程序</Radio>
                                    </RadioGroup>
                                </EditItem>
                                <EditItem name="跳转路径">
                                    <Input slot="edit" size="large" v-model="item.parameters.path" clearable />
                                </EditItem>
                                <EditItem name="小程序appid" v-show="item.parameters.type == 'Outer'">
                                    <Input slot="edit" size="large" v-model="item.parameters.appId" clearable />
                                </EditItem>
                                <EditItem name="跳转关键参数" label="多参数逗号隔开">
                                    <Input slot="edit" size="large" v-model="item.parameters.cateId" clearable placeholder="1,2" />
                                </EditItem>
                                <EditItem name="日志名">
                                    <Input slot="edit" size="large" v-model="item.parameters.statName" clearable placeholder="区分日志的名字" />
                                </EditItem>
                            </div>
                            <Button type="primary" size="large" long @click="addGalleryContent">添加轮播页</Button>
                        </template>
                        <div v-if="currentNode.type == 'Img'">
                            <EditItem name="广告位图片">
                                <UploadImage slot="edit" :imgs.sync="picture" single></UploadImage>
                            </EditItem>
                            <EditItem name="跳转方式">
                                <RadioGroup slot="edit" v-model="type">
                                    <Radio label="Web">小程序内嵌页</Radio>
                                    <Radio label="Page">当前小程序页</Radio>
                                    <Radio label="Outer">外部小程序</Radio>
                                </RadioGroup>
                            </EditItem>
                            <EditItem name="跳转路径">
                                <Input slot="edit" size="large" v-model="path" clearable />
                            </EditItem>
                            <EditItem name="小程序appid">
                                <Input slot="edit" size="large" v-model="appId" clearable />
                            </EditItem>
                            <EditItem name="跳转关键参数" label="多参数逗号隔开">
                                <Input slot="edit" size="large" v-model="cateId" clearable placeholder="1,2" />
                            </EditItem>
                            <EditItem name="日志名">
                                <Input slot="edit" size="large" v-model="statName" clearable placeholder="区分日志的名字" />
                            </EditItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
import Layout from "./layout";
import EditItem from "@/components/edit-item";
import UploadImage from "@/components/upload-img-group";
import LayoutManager from "@/helper/manager/layout-manager.js";

export default {
    components: { Layout, EditItem, UploadImage },
    data() {
        return {
            parameters: {
                src: "",
                type: "",
                appId: "",
                path: "pages/index/index",
                cateId: "",
                statName: ""
            },
            style: {
                width: "100%",
                height: "100px",
                padding: "0, 0, 0, 0",
                margin: "0, 0, 0, 0",
                other: ""
            }
        };
    },
    props: ["layoutData"],
    computed: {
        currentNode() {
            return LayoutManager.currentNode;
        },
        widthUnit: {
            get() {
                return (
                    (LayoutManager.style &&
                        LayoutManager.style.width &&
                        LayoutManager.style.width.unit) ||
                    ""
                );
            },
            set(val) {
                if (LayoutManager.style && LayoutManager.style.width) {
                    LayoutManager.style.width.unit = val;
                }
            }
        },
        heightUnit: {
            get() {
                return (
                    (LayoutManager.style &&
                        LayoutManager.style.height &&
                        LayoutManager.style.height.unit) ||
                    ""
                );
            },
            set(val) {
                if (LayoutManager.style && LayoutManager.style.height) {
                    LayoutManager.style.height.unit = val;
                }
            }
        },
        width: {
            get() {
                return (
                    (LayoutManager.style &&
                        LayoutManager.style.width &&
                        LayoutManager.style.width.value) ||
                    ""
                );
            },
            set(val) {
                if (LayoutManager.style && LayoutManager.style.width) {
                    LayoutManager.style.width.value = val;
                }
            }
        },
        height: {
            get() {
                return (
                    (LayoutManager.style &&
                        LayoutManager.style.height &&
                        LayoutManager.style.height.value) ||
                    ""
                );
            },
            set(val) {
                if (LayoutManager.style && LayoutManager.style.height) {
                    LayoutManager.style.height.value = val;
                }
            }
        },
        padding: {
            get() {
                return (LayoutManager.style && LayoutManager.style.padding) || "";
            },
            set(val) {
                if (LayoutManager.style) {
                    LayoutManager.style.padding = val;
                }
            }
        },
        margin: {
            get() {
                return (LayoutManager.style && LayoutManager.style.margin) || "";
            },
            set(val) {
                if (LayoutManager.style) {
                    LayoutManager.style.margin = val;
                }
            }
        },
        other: {
            get() {
                return (LayoutManager.style && LayoutManager.style.other) || "";
            },
            set(val) {
                if (LayoutManager.style) {
                    LayoutManager.style.other = val;
                }
            }
        },
        interval: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.interval) || ""
                );
            },
            set(val) {
                if (LayoutManager.parameters) {
                    LayoutManager.parameters.interval = val;
                }
            }
        },
        duration: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.duration) || ""
                );
            },
            set(val) {
                if (LayoutManager.parameters) {
                    LayoutManager.parameters.duration = val;
                }
            }
        },
        autoplay: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.autoplay) ||
                    false
                );
            },
            set(val) {
                if (LayoutManager.parameters) {
                    LayoutManager.parameters.autoplay = val;
                }
            }
        },
        picture: {
            get() {
                return (LayoutManager.parameters && LayoutManager.parameters.src) || "";
            },
            set(val) {
                if (LayoutManager.parameters) {
                    LayoutManager.parameters.src = val;
                }
            }
        },
        type: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.type) || ""
                );
            },
            set(val) {
                LayoutManager.parameters.type = val;
            }
        },
        path: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.path) || ""
                );
            },
            set(val) {
                LayoutManager.parameters.path = val;
            }
        },
        appId: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.appId) || ""
                );
            },
            set(val) {
                LayoutManager.parameters.appId = val;
            }
        },
        cateId: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.cateId) || ""
                );
            },
            set(val) {
                LayoutManager.parameters.cateId = val;
            }
        },
        statName: {
            get() {
                return (
                    (LayoutManager.parameters && LayoutManager.parameters.statName) || ""
                );
            },
            set(val) {
                LayoutManager.parameters.statName = val;
            }
        }
    },
    methods: {
        change(e) { },

        addLayout() {
            const id = new Date().getTime();
            const layout = {
                id: id,
                indexRecord: [...LayoutManager.currentNode.indexRecord, id],
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
            LayoutManager.addLayout(layout);
        },

        addAd() {
            const id = new Date().getTime();
            const layout = {
                id: id,
                indexRecord: [...LayoutManager.currentNode.indexRecord, id],
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
            LayoutManager.addLayout(layout);
        },

        addGallery() {
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
                indexRecord: [...LayoutManager.currentNode.indexRecord, id],
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

            LayoutManager.addLayout(layout);
        },

        getGalleryKey(e) {
            this.galleryKey = e.currentTarget.getAttribute("data-index");
        },

        addGalleryContent() {
            const currentNode = LayoutManager.currentNode;
            const id = new Date().getTime();
            const layout = {
                id: id,
                type: "Img",
                style: {
                    width: {
                        value: currentNode.style.width.value,
                        unit: currentNode.style.width.unit
                    },
                    height: {
                        value: currentNode.style.height.value,
                        unit: currentNode.style.height.unit
                    },
                    margin: currentNode.style.margin,
                    padding: currentNode.style.padding,
                    other: currentNode.style.other
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
            LayoutManager.addLayout(layout);
        },

        delGallertContent() {
            const indexRecord = [...LayoutManager.currentNode.indexRecord, +this.galleryKey];
            LayoutManager.delLayout(indexRecord || []);
        }
    }
};
</script>

<style scoped>
.layout-panel {
    min-height: 600px;
}

.layout-box {
    font-size: 0;
}

.edit-panel {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    transition: all 0.24s;
    background: #fff;
    z-index: 2;
}

.edit-panel-box {
    width: 486px;
    height: 700px;
    overflow: auto;
}

.edit-title {
    margin-bottom: 10px;
}

.btn-box {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
}

.btn-box + .btn-box {
    margin-left: 18px;
}

.upload-img-box {
    width: 100%;
    white-space: normal;
}

.sub-title {
    position: relative;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.sub-title:before {
    content: "轮播页设置";
    background: #fff;
    position: relative;
    z-index: 2;
}

.sub-title:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-top: 1px dashed #efefef;
}

.gallery-content-box {
    position: relative;
    margin-bottom: 20px;
}

.del-btn {
    position: absolute;
    right: 4px;
    top: 4px;
}
</style>
