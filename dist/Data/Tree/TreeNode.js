"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = /** @class */ (function () {
    function TreeNode(data) {
        this._children = [];
        this._depth = -1;
        this._data = data;
    }
    Object.defineProperty(TreeNode.prototype, "Data", {
        get: function () { return this._data; },
        set: function (data) { this._data = data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "Parent", {
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "Children", {
        get: function () { return this._children; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "Depth", {
        get: function () { return this._depth; },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.Siblings = function () {
        var _this = this;
        // 测试一下 this 可否直接用于比较
        return this._parent
            ? this._parent._children.filter(function (n) { return n !== _this; })
            : [];
    };
    TreeNode.prototype.DistanceToRoot = function () {
        var distance = 0, node = this;
        while (node._parent) {
            distance++;
            node = node._parent;
        }
        return distance;
    };
    TreeNode.prototype.GetAncestry = function () {
        // Initialize empty array and node
        var ancestors = [this], node = this;
        // Loop over ancestors and add them in array
        while (node._parent) {
            ancestors.push(node._parent);
            node = node._parent;
        }
        return ancestors;
    };
    return TreeNode;
}());
exports.default = TreeNode;
/**
 * 不要在最基础的操作单位里添加太多操作方法，可以通过写工具类实现操作，避免在最小粒度里创建太多实例。
 */ 
