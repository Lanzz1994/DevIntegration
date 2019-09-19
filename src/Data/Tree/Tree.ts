import TreeNode from './TreeNode';
import { LoopBFS } from './Traverser';

export default class Tree<T = any> {

    _root?: TreeNode<T>
    _current?: TreeNode<T>

    get Root() { return this._root; }
    get Current() { return this._current; }
    get IsEmpty() { return !this._root && !this._current; }

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

    Remove(node: TreeNode<T>, removeChildren: boolean = true) {
        if (node._parent) {
            if ((this._root && node._id === this._root._id) || removeChildren) {
                this.TrimBranchFrom(node);
            } else {

                // Upate children's parent to grandparent
                node._children.forEach(child => {
                    child._parent = node._parent;
                    (node._parent as TreeNode)._children.push(child);
                });

                // // Delete itslef from parent child array
                node._parent._children.splice(node._parent._children.findIndex(c => c._id === node._id), 1);

                // // Update Current Node
                this._current = node._parent;

                // Clear Child Array
                node._children = [];
                node._parent = undefined;
                node._data = undefined;
            }
        } else {
            throw new Error('treeNode hasn\'t in tree');
        }
    }

    TrimBranchFrom(node: TreeNode<T>) {
        LoopBFS([node], (current) => {
            current._data = undefined;
            current._children = [];
        });

        if (node._parent) {
            // 大数据量的处理瓶颈
            node._parent._children.splice(node._parent._children.findIndex(c => c._id === node._id), 1);
            this._current = node._parent;
        } else {
            this._root = this._current = undefined;
        }
    }
}