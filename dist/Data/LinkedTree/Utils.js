"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LoopDFS(tree, handle, handleResult) {
    let subTree = tree._firstChild;
    handleResult = (handle(tree, handleResult) || {});
    while (subTree && !handleResult.break) {
        LoopDFS(subTree, handle, handleResult);
        subTree = subTree._next;
    }
}
exports.LoopDFS = LoopDFS;
function LoopDFSTail(tree, handle) {
    let subTree = tree._firstChild, currentResults = [];
    while (subTree) {
        let prevResult = LoopDFSTail(subTree, handle);
        if (prevResult) {
            currentResults.push(prevResult);
            if (prevResult.break)
                break;
        }
        subTree = subTree._next;
    }
    return handle(tree, currentResults);
}
exports.LoopDFSTail = LoopDFSTail;
