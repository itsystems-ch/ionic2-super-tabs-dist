var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, Renderer, ElementRef, ViewEncapsulation, Optional, ComponentFactoryResolver, NgZone, ViewContainerRef, ViewChild, ChangeDetectorRef, ErrorHandler } from '@angular/core';
import { NavControllerBase, App, Config, Platform, GestureController, DeepLinker, DomController } from 'ionic-angular';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { SuperTabs } from './super-tabs';
var SuperTab = (function (_super) {
    __extends(SuperTab, _super);
    function SuperTab(parent, app, config, plt, el, zone, rnd, cfr, gestureCtrl, transCtrl, errorHandler, linker, _dom, cd) {
        var _this = _super.call(this, parent, app, config, plt, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom, errorHandler) || this;
        _this.linker = linker;
        _this._dom = _dom;
        _this.cd = cd;
        /**
         * Indicates whether the tab has been loaded
         * @type {boolean}
         */
        _this.loaded = false;
        _this.init = new Promise(function (resolve) { return _this.initResolve = resolve; });
        return _this;
    }
    Object.defineProperty(SuperTab.prototype, "tabTitle", {
        // TODO find less hacky approach
        // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "index", {
        // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
        get: function () {
            return this.parent.getTabIndexById(this.tabId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "_tabId", {
        get: function () {
            return this.tabId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "swipeBackEnabled", {
        /**
         * Enable/disable swipe to go back for iOS
         * @return {boolean}
         */
        get: function () {
            return this._sbEnabled;
        },
        set: function (val) {
            this._sbEnabled = !!val;
            this._swipeBackCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "_vp", {
        /**
         * @hidden
         */
        set: function (val) {
            this.setViewport(val);
        },
        enumerable: true,
        configurable: true
    });
    SuperTab.prototype.ngOnInit = function () {
        this.parent.addTab(this);
    };
    SuperTab.prototype.ngAfterViewInit = function () {
        this.initResolve();
    };
    SuperTab.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    SuperTab.prototype.setActive = function (active) {
        if (active) {
            this.cd.reattach();
            this.cd.detectChanges();
        }
        else if (!active) {
            this.cd.detach();
        }
    };
    SuperTab.prototype.load = function (load) {
        var _this = this;
        if (load && !this.loaded) {
            this.init.then(function () {
                _this.push(_this.root, _this.rootParams, { animate: false });
                _this.loaded = true;
            });
        }
    };
    SuperTab.prototype.setBadge = function (value) {
        this.badge = value;
    };
    SuperTab.prototype.clearBadge = function () {
        delete this.badge;
    };
    SuperTab.prototype.increaseBadge = function (increaseBy) {
        if (increaseBy === void 0) { increaseBy = 1; }
        this.badge += increaseBy;
    };
    SuperTab.prototype.decreaseBadge = function (decreaseBy) {
        if (decreaseBy === void 0) { decreaseBy = 1; }
        this.badge = Math.max(0, this.badge - decreaseBy);
    };
    SuperTab.prototype.setWidth = function (width) {
        this.setElementStyle('width', width + 'px');
    };
    SuperTab.prototype.goToRoot = function (opts) {
        return this.setRoot(this.root, this.rootParams, opts, null);
    };
    return SuperTab;
}(NavControllerBase));
export { SuperTab };
SuperTab.decorators = [
    { type: Component, args: [{
                selector: 'super-tab',
                template: '<div #viewport></div><div class="nav-decor"></div>',
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SuperTab.ctorParameters = function () { return [
    { type: SuperTabs, },
    { type: App, },
    { type: Config, },
    { type: Platform, },
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer, },
    { type: ComponentFactoryResolver, },
    { type: GestureController, },
    { type: TransitionController, },
    { type: ErrorHandler, },
    { type: DeepLinker, decorators: [{ type: Optional },] },
    { type: DomController, },
    { type: ChangeDetectorRef, },
]; };
SuperTab.propDecorators = {
    'title': [{ type: Input },],
    'icon': [{ type: Input },],
    'root': [{ type: Input },],
    'rootParams': [{ type: Input },],
    'tabId': [{ type: Input, args: ['id',] },],
    'badge': [{ type: Input },],
    'swipeBackEnabled': [{ type: Input },],
    '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=super-tab.js.map