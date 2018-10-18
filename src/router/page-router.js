import Router from "vue-router";
import PageManager from "./page-manager";

class PageRouter extends Router {
    constructor(obj) {
        super(obj);
        // const pageManager = new PageManager();
        const pageManager = PageManager;
        this._pm = pageManager;
        super.beforeEach(pageManager._beforeEachProxy.bind(pageManager));
    }

    get pm() {
        return this._pm;
    }

    static install(Vue, options) {
        Router.install(Vue, options);
    }

    beforeEach(fn) {
        this._pm.setBeforeEach(fn);
    }
}

export default PageRouter;
