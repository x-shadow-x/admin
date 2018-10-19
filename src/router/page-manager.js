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
    
                next(_to);
                return true;
            } else {
                // 通过点击浏览器前进后退或者刷新按钮触发的路由变化，根据pageToken判断是哪种跳转方式~并记录当前pageToken
                const preJumpWay = this.jumpWay;
                this.jumpWay =
                    _to.query.pageToken > this.pageToken
                        ? JUMP_WAY.NEXT
                        : _to.query.pageToken === this.pageToken
                            ? JUMP_WAY.RE_FRESH
                            : JUMP_WAY.PREV;
                this.pageToken = _to.query.pageToken;
                if (this.jumpWay === JUMP_WAY.PREV && preJumpWay !== this.jumpWay) {
                    // 从其他跳转方式切换到返回跳转方式
                    console.log(PageHelper.currentMenu);
                    this.enterClass = `pre_${this.enterClass}`;
                    this.leaveClass = `pre_${this.leaveClass}`;
                } else if (this.jumpWay === JUMP_WAY.NEXT) {
                    this.enterClass = this.enterClass.replace('pre_', '');
                    this.leaveClass = this.leaveClass.replace('pre_', '');
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

// class PageManager {
//     constructor() {
//         this._pageToken = 0;
//         this._enterClass = DEFAULT_ANIMATE.ENTER;
//         this._leaveClass = DEFAULT_ANIMATE.LEAVE;
//     }

//     get jumpWay() {
//         return this._jumpWay || JUMP_WAY.RE_FRESH;
//     }

//     get enterClass() {
//         return this._enterClass;
//     }

//     get leaveClass() {
//         return this._leaveClass;
//     }

//     _beforeEachProxy(to, from, next) {
//         let _to = { ...to };
//         if (!_to.query || !_to.query.pageToken) {
//             _to.query = _to.query || {};
//             _to.replace = this._pageToken === 0;
//             _to.query.pageToken = +this._pageToken + 1;

//             next(_to);
//             return true;
//         } else {
//             // 通过点击浏览器前进后退或者刷新按钮触发的路由变化，根据pageToken判断是哪种跳转方式~并记录当前pageToken
//             const preJumpWay = this._jumpWay;
//             this._jumpWay =
//                 _to.query.pageToken > this._pageToken
//                     ? JUMP_WAY.NEXT
//                     : _to.query.pageToken === this._pageToken
//                         ? JUMP_WAY.RE_FRESH
//                         : JUMP_WAY.PREV;
//             this._pageToken = _to.query.pageToken;
//             if(this._jumpWay === JUMP_WAY.PREV && preJumpWay !== this._jumpWay) {
//                 console.log(123123);
//                 // 从其他跳转方式切换到返回跳转方式
//                 let tempClass = this._enterClass;
//                 this._enterClass = this._leaveClass;
//                 this._leaveClass = tempClass;
//             }
//         }

//         if (this._beforeEach) {
//             this._beforeEach(to, from, next);
//         } else {
//             next();
//         }
//     }

//     setBeforeEach(fn) {
//         if (fn && Object.prototype.toString.call(fn) === "[object Function]") {
//             this._beforeEach = fn;
//         }
//     }

//     setOverrideAnim(overrideAnim) {
//         this._enterClass = overrideAnim.enter || DEFAULT_ANIMATE.ENTER;
//         this._leaveClass = overrideAnim.leave || DEFAULT_ANIMATE.LEAVE;
//     }

//     setTransitionClass(vm, to, from, action) {
//         if(this.jumpWay === JUMP_WAY.NEXT) {
//             action({
//                 enter: enter,
//                 enterActive: enterActive,
//                 enterTo: enterTo,
//                 leave: leave,
//                 leaveActive: leaveActive,
//                 leaveTo: leaveTo
//             })
//         }
//     }
// }

export default PageManager;
