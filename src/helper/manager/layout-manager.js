import Vue from "vue";

function isObjEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;

}
const LayoutManager = new Vue({
    data() {
        return {
            layoutData: {
                child: {}
            },
            style: null,
            parameters: null,
            indexRecord: "",
            currentNode: {}
        };
    },

    created() {
        this.currentNode = this.layoutData;
    },

    methods: {
        resetLayoutData(nv) {
            this.layoutData = {...nv};
            console.log(this.layoutData);
        },

        trigger() {
            this.layoutData = {
                ...this.layoutData
            };
            this.readyLayoutAttr(this.indexRecord);
        },

        readyLayoutAttr(indexRecord) {
            this.indexRecord = indexRecord || this.indexRecord;
            let node = this.layoutData;
            for (let i = 0, len = indexRecord.length; i < len; i++) {
                node = node.child[indexRecord[i]];
            }
            if (node) {
                this.currentNode = node;
                this.style = node.style; // 赋值后导致unit为undefined，暂时不知道原因
                this.parameters = node.parameters;
            } else {
                this.currentNode = this.layoutData;
                this.style = null;
                this.parameters = null;
            }
        },

        addLayout(layout) {
            this.currentNode.child = {
                ...this.currentNode.child,
                [layout.id]: layout
            };
            if (this.currentNode.type === "Group") {
                if (isObjEmpty(this.currentNode.child)) {
                    this.currentNode.style.height = {
                        value: "100",
                        unit: "px"
                    };
                } else {
                    this.currentNode.style = {
                        ...this.currentNode.style,
                        height: {
                            value: "auto",
                            unit: ""
                        }
                    };
                }
            }
            this.layoutData.child = {
                ...this.layoutData.child
            };
            // 重新赋值了layoutData，所以需要重新设定当前选中的广告位节点以便对currentNode操作可以同步到layoutData
            this.readyLayoutAttr([...this.indexRecord]);
        },

        addRootLayout(layout) {
            this.layoutData.child[layout.id] = layout;
            this.layoutData.child = {
                ...this.layoutData.child
            };
            // 重新赋值了layoutData，所以需要重新设定当前选中的广告位节点以便对currentNode操作可以同步到layoutData
            this.readyLayoutAttr(this.indexRecord);
        },

        delLayout(indexRecord) {
            let node = this.layoutData;
            const lastIndex = indexRecord.pop();
            for (let i = 0, len = indexRecord.length; i < len; i++) {
                node = node.child[indexRecord[i]];
            }
            this.$delete(node.child, lastIndex);
            if (node.type === "Group") {
                if (isObjEmpty(node.child) && node.style) {
                    // 避免删除的是根节点，此时没有style属性
                    node.style.height = {
                        value: "100",
                        unit: "px"
                    };
                } else if (node.style) {
                    node.style = {
                        ...node.style,
                        height: {
                            value: "auto",
                            unit: ""
                        }
                    };
                }
            }
            // 重新赋值了layoutData，所以需要重新设定当前选中的广告位节点以便对currentNode操作可以同步到layoutData
            this.readyLayoutAttr(this.indexRecord);
        }
    }
});

class DataTrans {
    constructor() {
        this.step = new Date().getTime();
    }

    buildLayout(layout) {
        const result = {
            child: {}
        };
        this.buildLayoutFn(result.child, layout, []);
        return result;
    }

    buildLayoutFn(result, layout, indexRecord) {
        for (let i = 0, len = layout.length; i < len; i++) {
            this.step++;
            const e = layout[i];
            const id = this.step;
            console.log(id);
            let parameters = {};
            if (e.type === "Img") {
                parameters = {
                    src: (e.parameters && e.parameters.src) || "",
                    type: (e.parameters && e.parameters.type) || "",
                    appId: (e.parameters && e.parameters.appId) || "",
                    path: (e.parameters && e.parameters.path) || "pages/index/index",
                    cateId: (e.parameters && e.parameters.cateId) || "",
                    statName: (e.parameters && e.parameters.statName) || ""
                };
            } else if (e.type === "Gallery") {
                parameters = {
                    interval: (e.parameters && e.parameters.interval) || "",
                    duration: (e.parameters && e.parameters.duration) || "",
                    autoplay: (e.parameters && e.parameters.autoplay) || ""
                };
            }
            result[id] = {
                id: id,
                indexRecord: [...indexRecord, id],
                type: e.type,
                style: {
                    width: {
                        value: (e.style.width && `${e.style.width}`.replace("%", "")) || "",
                        unit: e.style.width
                                ? `${e.style.width}`.indexOf("%") >= 0
                                    ? "%"
                                    : "px"
                                : "px"
                    },
                    height: {
                        value: (e.style.height && `${e.style.height}`.replace("%", "")) || "auto",
                        unit: e.style.height
                                ? `${e.style.height}`.indexOf("%") >= 0
                                    ? "%"
                                    : "px"
                                : "px"
                    },
                    margin: (e.style.margin && `{${e.style.margin.join(",")}}`) || "[0, 0, 0, 0]",
                    padding: (e.style.padding && `{${e.style.padding.join(",")}}`) || "[0, 0, 0, 0]",
                    other: e.style.other && `{${e.style.other}}`
                },
                parameters: parameters,
                child: {}
            };

            if (e.child) {
                this.buildLayoutFn(result[id].child, e.child, [...indexRecord, id]);
            }
        }

    }

    buildDbLayout(layout) {
        const result = [];
        this.buildDbLayoutFn(result, layout.child);
        console.log(JSON.stringify(result));
        return JSON.stringify(result);
    }

    buildDbLayoutFn(result, child) {
        for (let id in child) {
            const item = child[id];
            let resulItem = {};
            for (let key in item) {
                if (key !== "child" && key !== "id" && key !== "indexRecord") {
                    if (key === "style") {
                        resulItem[key] = {
                            ...item[key],
                            margin: item[key].margin.replace(/\[|\]/g, "").split(",").map(item => {
                                return +item;
                            }),
                            padding: item[key].padding.replace(/\[|\]/g, "").split(",").map(item => {
                                return +item;
                            }),
                            other: item[key].other.replace(/[{}\n]/g, ""),
                            width: item[key].width.unit === "%"
                                    ? `${item[key].width.value}${item[key].width.unit}`
                                    : +item[key].width.value,
                            height: item[key].height.unit === "%"
                                    ? `${item[key].height.value}${item[key].height.unit}`
                                    : item[key].height.value === "auto"
                                        ? ""
                                        : +item[key].height.value
                        };
                    } else {
                        resulItem[key] = item[key];
                    }
                }
            }
            if (resulItem.type !== "Img") {
                resulItem.child = [];
            }
            if (item.child) {
                this.buildDbLayoutFn(resulItem.child, item.child);
            }
            result.push(resulItem);
        }
    }
}

export default LayoutManager;
export const dataTrans = new DataTrans();
