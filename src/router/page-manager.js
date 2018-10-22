/**
 * 管理页面，包括内容
 * pageToken路由参数，根据当前token值判断页面是前进还是后退或者刷新，开新页时会在当前token值得基础上+1
 * 管理页面跳转的过渡动画
 */
import Vue from "vue";
import PageHelper from '@/helper/page-helper.js';

const JUMP_WAY = {
    RE_FRESH: "Refresh",
    NEXT: "Next",
    PREV: "Prev"
};

const DEFAULT_ANIMATE = {
    ENTER: "normal_enter",
    LEAVE: "normal_leave"
};

const PageManager = new Vue({
    data() {
        return {
            pageToken: 0,
            enterClass: DEFAULT_ANIMATE.ENTER,
            leaveClass: DEFAULT_ANIMATE.LEAVE,
            jumpWay: JUMP_WAY.RE_FRESH
        }
    },

    methods: {
        _beforeEachProxy(to, from, next) {
            let _to = { ...to };
            if (!_to.query || !_to.query.pageToken) {
                _to.query = _to.query || {};
                _to.replace = this.pageToken === 0;
                _to.query.pageToken = +this.pageToken + 1;
                PageHelper.setCurrentMenu(_to);
                next(_to);
                return true;
            } else {
                PageHelper.setCurrentMenu(to);
                // 通过点击浏览器前进后退或者刷新按钮触发的路由变化，根据pageToken判断是哪种跳转方式~并记录当前pageToken
                this.jumpWay =
                    _to.query.pageToken > this.pageToken
                        ? JUMP_WAY.NEXT
                        : _to.query.pageToken === this.pageToken
                            ? JUMP_WAY.RE_FRESH
                            : JUMP_WAY.PREV;
                this.pageToken = _to.query.pageToken;
                if (this.jumpWay === JUMP_WAY.PREV) {
                    // 从其他跳转方式切换到返回跳转方式
                    const animateClass = PageHelper.currentMenu.animate || {
                        enter: DEFAULT_ANIMATE.ENTER,
                        leave: DEFAULT_ANIMATE.LEAVE
                    };
                    this.enterClass = `pre_${animateClass.enter}`;
                    this.leaveClass = `pre_${animateClass.leave}`;
                } else if (this.jumpWay === JUMP_WAY.NEXT) {
                    const animateClass = PageHelper.currentMenu.animate || {
                        enter: DEFAULT_ANIMATE.ENTER,
                        leave: DEFAULT_ANIMATE.LEAVE
                    };
                    this.enterClass = animateClass.enter;
                    this.leaveClass = animateClass.leave;
                }
            }
    
            if (this._beforeEach) {
                this._beforeEach(to, from, next);
            } else {
                next();
            }
        },
    
        setBeforeEach(fn) {
            if (fn && Object.prototype.toString.call(fn) === "[object Function]") {
                this._beforeEach = fn;
            }
        },
    
        setOverrideAnim(overrideAnim) {
            this.enterClass = (overrideAnim && overrideAnim.enter) || DEFAULT_ANIMATE.ENTER;
            this.leaveClass = (overrideAnim && overrideAnim.leave) || DEFAULT_ANIMATE.LEAVE;
        }
    }
});

export default PageManager;
