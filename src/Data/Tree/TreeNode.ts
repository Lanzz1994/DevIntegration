export interface ITreeNode<T> {
    Data: T;
    Parent?: ITreeNode<T>;
    Children: ITreeNode<T>[];
    Depth: number;
}

export default class TreeNode<T = any> implements ITreeNode<T> {
    _parent?: TreeNode<T>;
    _children: TreeNode<T>[] = [];
    _data: T;
    _depth: number = -1;

    get Data() { return this._data; }
    set Data(data: T) { this._data = data; }

    get Parent() { return this._parent; }
    get Children() { return this._children; }
    get Depth() { return this._depth; }

    constructor(data: T) {
        this._data = data;
    }

    Siblings(): TreeNode[] {
        // 测试一下 this 可否直接用于比较
        return this._parent
            ? this._parent._children.filter(n => n !== this)
            : [];
    }

    DistanceToRoot() {
        let distance = 0,
            node: TreeNode<T> = this;
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
}

/**
 * 不要在最基础的操作单位里添加太多操作方法，可以通过写工具类实现操作，避免在最小粒度里创建太多实例。
 */