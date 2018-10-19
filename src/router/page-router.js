import Router from "vue-router";
import PageManager from "./page-manager";

class PageRouter extends Router {
    constructor(obj) {
        super(obj);
        this._pm = PageManager;
        super.beforeEach(PageManager._beforeEachProxy.bind(PageManager));
    }

    get pm() {
        return this._pm;
    }

    static install(Vue, options) {
        Router.install(Vue, options);
        Vue.mixin({
            data() {
                return {
                    pm: PageManager
                }
            }
        });
    }

    beforeEach(fn) {
        this._pm.setBeforeEach(fn);
    }
}

export default PageRouter;
