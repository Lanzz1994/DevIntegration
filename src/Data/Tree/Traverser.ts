import TreeNode from './TreeNode';

export function LoopBFS<T = any>(
    treeNodes: TreeNode<T>[],
    callback: (current: TreeNode<T>) => any
) {
    while (treeNodes.length) {
        // 测试 shift 的性能
        let current = treeNodes.splice(0, 1)[0];
        if (callback(current) !== false)
            treeNodes.push(...current._children);
    }
}

export function LoopDFS<T = any>(
    treeNode: TreeNode<T>,
    callback: (current: TreeNode<T>, parent?: any) => any,
    parent?: any
) {
    let result: any = callback(treeNode, parent);
    if (result !== false) treeNode._children.forEach(child => LoopDFS<T>(child, callback, result));
}