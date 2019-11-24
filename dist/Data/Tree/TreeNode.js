"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
    constructor(data) {
        this._children = [];
        this._depth = -1;
        this._data = data;
    }
    get Data() { return this._data; }
    set Data(data) { this._data = data; }
    get Parent() { return this._parent; }
    get Children() { return this._children; }
    get Depth() { return this._depth; }
    Siblings() {
        // 测试一下 this 可否直接用于比较
        return this._parent
            ? this._parent._children.filter(n => n !== this)
            : [];
    }
    DistanceToRoot() {
        let distance = 0, node = this;
        while (node._parent) {
            distance++;
            node = node._parent;
        }
        return distance;
    }
    GetAncestry() {
        // Initialize empty array and node
        let ancestors = [this], node = this;
        // Loop over ancestors and add them in array
        while (node._parent) {
            ancestors.push(node._parent);
            node = node._parent;
        }
        return ancestors;
    }
}
exports.default = TreeNode;
/**
 * 不要在最基础的操作单位里添加太多操作方法，可以通过写工具类实现操作，避免在最小粒度里创建太多实例。
 */ 
