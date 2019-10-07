import TreeNode from './TreeNode';
export declare function LoopBFS<T = any>(treeNodes: TreeNode<T>[], callback: (current: TreeNode<T>) => any): void;
export declare function LoopDFS<T = any>(treeNode: TreeNode<T>, callback: (current: TreeNode<T>, parent?: any) => any, parent?: any): void;
