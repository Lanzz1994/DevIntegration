"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoopDFS(tree, childFiled, handle, handleResult) {
    var children = (tree[childFiled] || []);
    handleResult = (handle(tree, handleResult) || {});
    if (children.length && !handleResult.break) {
        children.forEach(function (node) { return LoopDFS(node, childFiled, handle, handleResult); });
    }
}
exports.LoopDFS = LoopDFS;
function LoopDFSTail(tree, childFiled, handle) {
    var children = (tree[childFiled] || []), currentResults = [];
    for (var i = 0; i < children.length; i++) {
        var prevResult = LoopDFSTail(children[i], childFiled, handle);
        if (prevResult) {
            currentResults.push(prevResult);
            if (prevResult.break)
                break;
        }
    }
    return handle(tree, currentResults);
}
exports.LoopDFSTail = LoopDFSTail;
