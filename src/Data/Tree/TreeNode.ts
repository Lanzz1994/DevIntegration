import { KeyValue, Nullable } from '@/Types';
import GUID from '@/Utils/GUID';
import { LoopDFS } from './Traverser';

export interface ITreeNode<T> {
    ID: string;
    Data?: T;
    Parent?: ITreeNode<T>;
    Children: ITreeNode<T>[];
    Depth: number;
}

export default class TreeNode<T = any> implements ITreeNode<T> {

    _id: string;
    _parent?: TreeNode<T>;
    _children: TreeNode<T>[] = [];
    _data?: T;
    _depth: number = -1;

    get ID() { return this._id; }

    get Data() { return this._data; }
    set Data(data: T | undefined) { this._data = data; }

    get Parent() { return this._parent; }
    get Children() { return this._children; }
    get Depth() { return this._depth; }

    constructor(data?: T) {
        this._id = GUID();
        this._data = data;
    }

    Siblings(): TreeNode[] {
        return this._parent ? this._parent._children.filter(n => n._id !== this._id) : [];
    }

    DistanceToRoot() {
        let distance = 0, node: TreeNode<T> = this;
        while (node._parent) {
            distance++;
            node = node._parent;
        }
        return distance;
    }

    GetAncestry() {
        // Initialize empty array and node
        let ancestors: TreeNode<T>[] = [this],
            node: TreeNode<T> = this;

        // Loop over ancestors and add them in array
        while (node._parent) {
            ancestors.push(node._parent);
            node = node._parent;
        }
        return ancestors;
    }

    Export(format?: (current?: T) => NonNullable<KeyValue>) {
        LoopDFS(this, (current, parent) => {
            let fmt = format ? format(current._data) : current._data || {};
            fmt.children = [];
            if (parent) parent.children.push(fmt);
            return fmt;
        });
    }
}