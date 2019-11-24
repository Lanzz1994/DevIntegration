"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoopDFS(tree, childFiled, handle, handleResult) {
    const children = (tree[childFiled] || []);
    handleResult = (handle(tree, handleResult) || {});
    if (children.length && !handleResult.break) {
        children.forEach(node => LoopDFS(node, childFiled, handle, handleResult));
    }
}
exports.LoopDFS = LoopDFS;
function LoopDFSTail(tree, childFiled, handle) {
    const children = (tree[childFiled] || []), currentResults = [];
    for (let i = 0; i < children.length; i++) {
        const prevResult = LoopDFSTail(children[i], childFiled, handle);
        if (prevResult) {
            currentResults.push(prevResult);
            if (prevResult.break)
                break;
        }
    }
    return handle(tree, currentResults);
}
exports.LoopDFSTail = LoopDFSTail;
