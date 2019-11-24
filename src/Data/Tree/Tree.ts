import { KV } from '../../Types/Common';
import { LoopBFS, LoopDFS } from './Traverser';
import TreeNode from './TreeNode';

export default class Tree<T = any> {

    _root?: TreeNode<T>;
    _current?: TreeNode<T>;

    get Root() {
        return this._root;
    }
    get Current() {
        return this._current;
    }
    get IsEmpty() {
        return !this._root && !this._current;
    }

    constructor(data?: T) {
        data && this.Insert(data);
    }

    Insert(data: T) {
        let node = new TreeNode(data);
        if (this.IsEmpty) {
            node._depth = 1;
            this._root = this._current = node;
        } else {
            /** no compile */
            this._current = this._current as TreeNode<T>;

            node._parent = this._current;
            this._current._children.push(node);
            this._current = node;
            node._depth = node._parent._depth + 1;
        }
        return node;
    }

    InsertToNode(node: TreeNode<T>, data: T) {
        let newNode = new TreeNode(data);
        newNode._parent = node;
        newNode._depth = newNode._parent._depth + 1;
        node._children.push(newNode);
        this._current = newNode;
        return newNode;
    }

    InsertToFind(find: (current: T) => boolean, data: T) {
        if (this._root) {
            let targetNode = this.FindNode(find, this._root);
            if (targetNode) return this.InsertToNode(targetNode, data);
        }
    }

    Remove(node: TreeNode<T>, trim: boolean = true) {
        if (node._parent) {
            if (trim || node === this._root) {
                this.TrimBranchFrom(node);
            } else {
                // Upate children's parent to grandparent
                node._children.forEach(child => {
                    child._parent = node._parent;
                    (node._parent as TreeNode)._children.push(child);
                });

                // Delete itslef from parent child array
                node._parent._children.splice(node._parent._children.indexOf(node), 1);

                // Update Current Node
                this._current = node._parent;

                // Clear Child Array
                // node._children = [];
                node._children.length = 0;
                node._parent = undefined;
                node._data = undefined as any;
            }
        }
    }

    TrimBranchFrom(node: TreeNode<T>) {
        LoopBFS([node], current => {
            current._data = undefined as any;
            //current._children = [];
            current._children.length = 0;
        });

        if (node._parent) {
            // 大数据量的处理瓶颈
            node._parent._children.splice(node._parent._children.indexOf(node), 1);
            this._current = node._parent;
        } else {
            this._root = this._current = undefined;
        }
    }

    FindNode(find: (current: T) => boolean, node: TreeNode): TreeNode<T> | null {
        let targetNode = null;
        LoopDFS(node, (current) => {
            if (find(current._data)) {
                targetNode = current;
                return false;
            }
            return true;
        });
        return targetNode;
    }

    Export(format?: (current?: T) => KV) {
        if (this._root) {
            return this.ExportNode(this._root, format);
        }
    }

    ExportNode(node: TreeNode, format?: (current?: T) => KV) {
        let result: KV = { children: [] };
        LoopDFS(node, (current, parent) => {
            let fmt = format
                ? format(current._data)
                : current._data;
            fmt.children = [];
            if (parent) parent.children.push(fmt);
            return fmt;
        }, result);
        return result.children[0];
    }

    Import() { }

    ImportToNode() { }
}
