"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoopBFS(treeNodes, callback) {
    while (treeNodes.length) {
        // 测试 shift 的性能
        var current = treeNodes.splice(0, 1)[0];
        if (callback(current) !== false)
            treeNodes.push.apply(treeNodes, current._children);
    }
}
exports.LoopBFS = LoopBFS;
function LoopDFS(treeNode, callback, parent) {
    var result = callback(treeNode, parent);
    if (result !== false)
        treeNode._children.forEach(function (child) { return LoopDFS(child, callback, result); });
}
exports.LoopDFS = LoopDFS;
