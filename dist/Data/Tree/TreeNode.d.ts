export interface ITreeNode<T> {
    Data: T;
    Parent?: ITreeNode<T>;
    Children: ITreeNode<T>[];
    Depth: number;
}
export default class TreeNode<T = any> implements ITreeNode<T> {
    _parent?: TreeNode<T>;
    _children: TreeNode<T>[];
    _data: T;
    _depth: number;
    Data: T;
    readonly Parent: TreeNode<T> | undefined;
    readonly Children: TreeNode<T>[];
    readonly Depth: number;
    constructor(data: T);
    Siblings(): TreeNode[];
    DistanceToRoot(): number;
    GetAncestry(): TreeNode<T>[];
}
/**
 * 不要在最基础的操作单位里添加太多操作方法，可以通过写工具类实现操作，避免在最小粒度里创建太多实例。
 */ 
