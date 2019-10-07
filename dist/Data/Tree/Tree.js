"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Traverser_1 = require("./Traverser");
var TreeNode_1 = require("./TreeNode");
var Tree = /** @class */ (function () {
    function Tree(data) {
        data && this.Insert(data);
    }
    Object.defineProperty(Tree.prototype, "Root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "Current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree.prototype, "IsEmpty", {
        get: function () {
            return !this._root && !this._current;
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.Insert = function (data) {
        var node = new TreeNode_1.default(data);
        if (this.IsEmpty) {
            node._depth = 1;
            this._root = this._current = node;
        }
        else {
            /** no compile */
            this._current = this._current;
            node._parent = this._current;
            this._current._children.push(node);
            this._current = node;
            node._depth = node._parent._depth + 1;
        }
        return node;
    };
    Tree.prototype.InsertToNode = function (node, data) {
        var newNode = new TreeNode_1.default(data);
        newNode._parent = node;
        newNode._depth = newNode._parent._depth + 1;
        node._children.push(newNode);
        this._current = newNode;
        return newNode;
    };
    Tree.prototype.InsertToFind = function (find, data) {
        if (this._root) {
            var targetNode = this.FindNode(find, this._root);
            if (targetNode)
                return this.InsertToNode(targetNode, data);
        }
    };
    Tree.prototype.Remove = function (node, trim) {
        if (trim === void 0) { trim = true; }
        if (node._parent) {
            if (trim || node === this._root) {
                this.TrimBranchFrom(node);
            }
            else {
                // Upate children's parent to grandparent
                node._children.forEach(function (child) {
                    child._parent = node._parent;
                    node._parent._children.push(child);
                });
                // Delete itslef from parent child array
                node._parent._children.splice(node._parent._children.indexOf(node), 1);
                // Update Current Node
                this._current = node._parent;
                // Clear Child Array
                // node._children = [];
                node._children.length = 0;
                node._parent = undefined;
                node._data = undefined;
            }
        }
    };
    Tree.prototype.TrimBranchFrom = function (node) {
        Traverser_1.LoopBFS([node], function (current) {
            current._data = undefined;
            //current._children = [];
            current._children.length = 0;
        });
        if (node._parent) {
            // 大数据量的处理瓶颈
            node._parent._children.splice(node._parent._children.indexOf(node), 1);
            this._current = node._parent;
        }
        else {
            this._root = this._current = undefined;
        }
    };
    Tree.prototype.FindNode = function (find, node) {
        var targetNode = null;
        Traverser_1.LoopDFS(node, function (current) {
            if (find(current._data)) {
                targetNode = current;
                return false;
            }
            return true;
        });
        return targetNode;
    };
    Tree.prototype.Export = function (format) {
        if (this._root) {
            return this.ExportNode(this._root, format);
        }
    };
    Tree.prototype.ExportNode = function (node, format) {
        var result = { children: [] };
        Traverser_1.LoopDFS(node, function (current, parent) {
            var fmt = format
                ? format(current._data)
                : current._data;
            fmt.children = [];
            if (parent)
                parent.children.push(fmt);
            return fmt;
        }, result);
        return result.children[0];
    };
    Tree.prototype.Import = function () { };
    Tree.prototype.ImportToNode = function () { };
    return Tree;
}());
exports.default = Tree;
