import { KV } from '../../Types/Common';
import TreeNode from './TreeNode';
export default class Tree<T = any> {
    _root?: TreeNode<T>;
    _current?: TreeNode<T>;
    readonly Root: TreeNode<T> | undefined;
    readonly Current: TreeNode<T> | undefined;
    readonly IsEmpty: boolean;
    constructor(data?: T);
    Insert(data: T): TreeNode<T>;
    InsertToNode(node: TreeNode<T>, data: T): TreeNode<T>;
    InsertToFind(find: (current: T) => boolean, data: T): TreeNode<T> | undefined;
    Remove(node: TreeNode<T>, trim?: boolean): void;
    TrimBranchFrom(node: TreeNode<T>): void;
    FindNode(find: (current: T) => boolean, node: TreeNode): TreeNode<T> | null;
    Export(format?: (current?: T) => KV): any;
    ExportNode(node: TreeNode, format?: (current?: T) => KV): any;
    Import(): void;
    ImportToNode(): void;
}
