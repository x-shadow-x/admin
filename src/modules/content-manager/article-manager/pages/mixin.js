export default {
    data() {
        return {
            columns: [{
                    title: "布局名",
                    align: "center",
                    key: "layoutName"
                },
                {
                    title: "布局stat名",
                    align: "center",
                    key: "layoutStatName"
                },
                {
                    title: "操作",
                    align: "center",
                    key: "action",
                    render: (h, p) => {
                        return h("div", [
                            h("Button", {
                                class: {
                                    "item-table-action": true
                                },
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        console.log('on');
                                    }
                                }
                            },
                            "编辑"),
                            h("Button", {
                                class: {
                                    "item-table-action": true
                                },
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        console.log('on');
                                    }
                                }
                            },
                            "移除")
                        ]);
                    }
                }
            ]
        };
    }
};
