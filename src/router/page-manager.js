/**
 * 管理页面，包括内容
 * pageToken路由参数，根据当前token值判断页面是前进还是后退或者刷新，开新页时会在当前token值得基础上+1
 * 管理页面跳转的过渡动画
 */

const JUMP_WAY = {
    RE_FRESH: "Refresh",
    NEXT: "Next",
    PREV: "Prev"
};

class PageManager {
    constructor() {
        this._pageToken = 0;
    }

    get jumpWay() {
        return this._jumpWay || JUMP_WAY.RE_FRESH;
    }

    _beforeEachProxy(to, from, next) {
        let _to = { ...to };
        if (!_to.query || !_to.query.pageToken) {
            _to.query = _to.query || {};
            // _to.replace = true;
            _to.query.pageToken = +this._pageToken + 1;

            next(_to);
            return true;
        } else {
            console.log(_to.query.pageToken, '==========', this._pageToken);
            // 通过点击浏览器前进后退或者刷新按钮触发的路由变化，根据pageToken判断是哪种跳转方式~并记录当前pageToken
            this._jumpWay =
                _to.query.pageToken > this._pageToken
                    ? JUMP_WAY.NEXT
                    : _to.query.pageToken == this._pageToken
                        ? JUMP_WAY.RE_FRESH
                        : JUMP_WAY.PREV;
            console.log(this._jumpWay);
            this._pageToken = _to.query.pageToken;
        }

        if (this._beforeEach) {
            this._beforeEach(to, from, next);
        } else {
            next();
        }
    }

    setBeforeEach(fn) {
        if (fn && Object.prototype.toString.call(fn) == "[object Function]") {
            this._beforeEach = fn;
        }
    }

    setOverrideAnim(overrideAnim) {
        this._overrideAnim = overrideAnim;
    }

    setTransitionClass(vm, to, from, action) {
        if(this.jumpWay == JUMP_WAY.NEXT) {
            // action({
            //     enter: enter,
            //     enterActive: enterActive,
            //     enterTo: enterTo,
            //     leave: leave,
            //     leaveActive: leaveActive,
            //     leaveTo: leaveTo
            // })
        }
    }
}

export default PageManager;
