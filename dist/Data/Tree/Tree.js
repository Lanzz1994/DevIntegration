"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Traverser_1 = require("./Traverser");
const TreeNode_1 = require("./TreeNode");
class Tree {
    constructor(data) {
        data && this.Insert(data);
    }
    get Root() {
        return this._root;
    }
    get Current() {
        return this._current;
    }
    get IsEmpty() {
        return !this._root && !this._current;
    }
    Insert(data) {
        let node = new TreeNode_1.default(data);
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
    }
    InsertToNode(node, data) {
        let newNode = new TreeNode_1.default(data);
        newNode._parent = node;
        newNode._depth = newNode._parent._depth + 1;
        node._children.push(newNode);
        this._current = newNode;
        return newNode;
    }
    InsertToFind(find, data) {
        if (this._root) {
            let targetNode = this.FindNode(find, this._root);
            if (targetNode)
                return this.InsertToNode(targetNode, data);
        }
    }
    Remove(node, trim = true) {
        if (node._parent) {
            if (trim || node === this._root) {
                this.TrimBranchFrom(node);
            }
            else {
                // Upate children's parent to grandparent
                node._children.forEach(child => {
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
    }
    TrimBranchFrom(node) {
        Traverser_1.LoopBFS([node], current => {
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
    }
    FindNode(find, node) {
        let targetNode = null;
        Traverser_1.LoopDFS(node, (current) => {
            if (find(current._data)) {
                targetNode = current;
                return false;
            }
            return true;
        });
        return targetNode;
    }
    Export(format) {
        if (this._root) {
            return this.ExportNode(this._root, format);
        }
    }
    ExportNode(node, format) {
        let result = { children: [] };
        Traverser_1.LoopDFS(node, (current, parent) => {
            let fmt = format
                ? format(current._data)
                : current._data;
            fmt.children = [];
            if (parent)
                parent.children.push(fmt);
            return fmt;
        }, result);
        return result.children[0];
    }
    Import() { }
    ImportToNode() { }
}
exports.default = Tree;
