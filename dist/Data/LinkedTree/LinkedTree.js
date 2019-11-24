"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const omit_1 = require("lodash/omit");
const cloneDeep_1 = require("lodash/cloneDeep");
const Utils_1 = require("./Utils");
const Utils_2 = require("../Tree/Utils");
const _utils_1 = require("./_utils");
class LinkedTree {
    //=================== Constructor =====================
    constructor(data, params) {
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
    //=================== Properties =====================
    get Parent() { return this._parent; }
    get Children() { return this._children; }
    get Prev() { return this._prev; }
    get Next() { return this._next; }
    get FirstChild() { return this._firstChild; }
    get LastChild() { return this._lastChild; }
    get IsLeaf() { return this._children.length === 0; }
    get SubLength() { return this._children.length; }
    //=================== Add =====================
    /**
     * Adds the specified new tree at the start of children of this
     * @returns added node
     */
    AddFirst(tree) {
        _utils_1.insert(tree, this);
        _utils_1.setFirst(tree, this);
        return tree;
    }
    /**
     * Adds the specified new tree at the end of children of this
     * @returns added node
     */
    AddLast(tree) {
        _utils_1.insert(tree, this);
        _utils_1.setLast(tree, this);
        return tree;
    }
    /**
     * Adds the new tree before the specified existing trees
     * that filtering from 'fn' parameter in children of this
     */
    // AddBefore(tree:LinkedTree,fn):void{}
    // AddAfter(tree:LinkedTree,fn):void{}
    //=================== Move =====================
    _moveToChildren(tree) {
        if (tree._parent) {
            _utils_1.remove(tree);
        }
    }
    _moveToSibling(tree, target) {
        if (target._parent) {
            _utils_1.remove(tree);
            _utils_1.insert(tree, target._parent);
        }
    }
    /**
     * @returns moved node
     */
    MoveToFirst(target) {
        this._moveToChildren(this);
        target.AddFirst(this);
        return this;
    }
    /**
     * @returns moved node
     */
    MoveToLast(target) {
        this._moveToChildren(this);
        target.AddLast(this);
        return this;
    }
    /**
     * @returns moved node
     */
    MoveToBefore(target) {
        this._moveToSibling(this, target);
        _utils_1.setBefore(this, target);
        return this;
    }
    /**
     * @returns moved node
     */
    MoveToAfter(target) {
        this._moveToSibling(this, target);
        _utils_1.setAfter(this, target);
        return this;
    }
    /**
     * @returns moved node
     */
    MoveToReplace(target) {
        this._moveToSibling(this, target);
        _utils_1.setAfter(this, target);
        _utils_1.remove(target);
        return this;
    }
    //=================== Remove =====================
    RemoveSelf() {
        this.Clear();
        _utils_1.destroy(this);
    }
    Clear() {
        Utils_1.LoopDFSTail(this, (cureent) => {
            _utils_1.destroy(cureent);
            cureent._children.length = 0;
        });
    }
    //=================== Util =====================
    Map(callback) {
        return Utils_1.LoopDFSTail(this, (current, childrenResults) => callback(current, childrenResults));
    }
    Export({ format, childrenField = 'Children', useTreeForamt = true } = {}) {
        let result = Utils_1.LoopDFSTail(this, (current, childrenResults) => {
            let fmt = format
                ? format(current.Data)
                : current.Data;
            let Children = childrenResults.map(res => res.fmtValue);
            let fmtValue = useTreeForamt === false
                ? { Data: fmt, Children }
                : Object.assign(Object.assign({}, fmt), { [childrenField]: Children });
            return { fmtValue };
        });
        return result.fmtValue;
    }
    Import(source, { format, childrenField = 'Children', useTreeForamt = true, coverRoot } = {}) {
        const sourceIsArray = Array.isArray(source);
        let result = Utils_2.LoopDFSTail(sourceIsArray ? { [childrenField]: source } : source, childrenField, (current, childrenResults) => {
            let tree = new LinkedTree(useTreeForamt
                ? current.Data
                : format
                    ? format(current.Data)
                    : omit_1.default(current, childrenField));
            childrenResults.forEach(res => tree.AddLast(res.tree));
            return { tree };
        });
        result.tree.Children.forEach((v) => this.AddLast(v));
        !sourceIsArray && coverRoot && (this.Data = result.tree.Data);
        return this;
    }
}
exports.default = LinkedTree;
/** 尾递归遍历 */
LinkedTree.LoopDFSTail = Utils_1.LoopDFSTail;
