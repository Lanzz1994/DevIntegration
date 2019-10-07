"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var omit_1 = require("lodash/omit");
var cloneDeep_1 = require("lodash/cloneDeep");
var Util_1 = require("./Util");
var Util_2 = require("../Tree/Util");
var _utils_1 = require("./_utils");
var LinkedTree = /** @class */ (function () {
    //=================== Constructor =====================
    function LinkedTree(data, params) {
        this._children = [];
        this.Data = data;
        if (params) {
            if (params.deep)
                this.Data = cloneDeep_1.default(data);
            if (params.parent)
                params.parent.AddLast(this);
            if (params.children)
                this.AddFirst(params.children);
        }
    }
    Object.defineProperty(LinkedTree.prototype, "Parent", {
        //=================== Properties =====================
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "Children", {
        get: function () { return this._children; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "Prev", {
        get: function () { return this._prev; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "Next", {
        get: function () { return this._next; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "FirstChild", {
        get: function () { return this._firstChild; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "LastChild", {
        get: function () { return this._lastChild; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "IsLeaf", {
        get: function () { return this._children.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkedTree.prototype, "SubLength", {
        get: function () { return this._children.length; },
        enumerable: true,
        configurable: true
    });
    //=================== Add =====================
    /**
     * Adds the specified new tree at the start of children of this
     * @returns added node
     */
    LinkedTree.prototype.AddFirst = function (tree) {
        _utils_1.insert(tree, this);
        _utils_1.setFirst(tree, this);
        return tree;
    };
    /**
     * Adds the specified new tree at the end of children of this
     * @returns added node
     */
    LinkedTree.prototype.AddLast = function (tree) {
        _utils_1.insert(tree, this);
        _utils_1.setLast(tree, this);
        return tree;
    };
    /**
     * Adds the new tree before the specified existing trees
     * that filtering from 'fn' parameter in children of this
     */
    // AddBefore(tree:LinkedTree,fn):void{}
    // AddAfter(tree:LinkedTree,fn):void{}
    //=================== Move =====================
    LinkedTree.prototype._moveToChildren = function (tree) {
        if (tree._parent) {
            _utils_1.remove(tree);
        }
    };
    LinkedTree.prototype._moveToSibling = function (tree, target) {
        if (target._parent) {
            _utils_1.remove(tree);
            _utils_1.insert(tree, target._parent);
        }
    };
    /**
     * @returns moved node
     */
    LinkedTree.prototype.MoveToFirst = function (target) {
        this._moveToChildren(this);
        target.AddFirst(this);
        return this;
    };
    /**
     * @returns moved node
     */
    LinkedTree.prototype.MoveToLast = function (target) {
        this._moveToChildren(this);
        target.AddLast(this);
        return this;
    };
    /**
     * @returns moved node
     */
    LinkedTree.prototype.MoveToBefore = function (target) {
        this._moveToSibling(this, target);
        _utils_1.setBefore(this, target);
        return this;
    };
    /**
     * @returns moved node
     */
    LinkedTree.prototype.MoveToAfter = function (target) {
        this._moveToSibling(this, target);
        _utils_1.setAfter(this, target);
        return this;
    };
    /**
     * @returns moved node
     */
    LinkedTree.prototype.MoveToReplace = function (target) {
        this._moveToSibling(this, target);
        _utils_1.setAfter(this, target);
        _utils_1.remove(target);
        return this;
    };
    //=================== Remove =====================
    LinkedTree.prototype.RemoveSelf = function () {
        this.Clear();
        _utils_1.destroy(this);
    };
    LinkedTree.prototype.Clear = function () {
        Util_1.LoopDFSTail(this, function (cureent) {
            cureent._children.length = 0;
        });
    };
    //=================== Util =====================
    LinkedTree.prototype.Export = function (_a) {
        var format = _a.format, _b = _a.childrenField, childrenField = _b === void 0 ? 'Children' : _b, _c = _a.useTreeFormat, useTreeFormat = _c === void 0 ? true : _c;
        var result = Util_1.LoopDFSTail(this, function (current, childrenResults) {
            var _a;
            var fmt = format
                ? format(current.Data)
                : current.Data;
            var Children = childrenResults.map(function (res) { return res.fmtValue; });
            var fmtValue = useTreeFormat === false
                ? { Data: fmt, Children: Children }
                : __assign({}, fmt, (_a = {}, _a[childrenField] = Children, _a));
            return { fmtValue: fmtValue };
        });
        return result.fmtValue;
    };
    LinkedTree.prototype.Import = function (tree, _a) {
        var _b = _a.childrenField, childrenField = _b === void 0 ? 'Children' : _b, _c = _a.useTreeFormat, useTreeFormat = _c === void 0 ? true : _c;
        var result = Util_2.LoopDFSTail(tree, childrenField, function (current, childrenResults) {
            var tree = new LinkedTree(useTreeFormat
                ? current.Data
                : omit_1.default(current, childrenField));
            childrenResults.forEach(function (res) { return tree.AddLast(res.tree); });
            return { tree: tree };
        });
        return result.tree;
    };
    return LinkedTree;
}());
exports.default = LinkedTree;
