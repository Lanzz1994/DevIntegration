import { LoopHandleResult } from '../Tree';
import LinkedTree, { NullableLinkedTree } from './LinkedTree';

export function LoopDFS(
    tree: LinkedTree,
    handle: (current: LinkedTree, parentResult?: LoopHandleResult) => any,
    handleResult?: LoopHandleResult
) {

    let subTree: NullableLinkedTree = tree._firstChild;
    handleResult = (handle(tree, handleResult) || {}) as LoopHandleResult;

    while (subTree && !handleResult.break) {
        LoopDFS(subTree, handle, handleResult);
        subTree = subTree._next;
    }
}

export function LoopDFSTail(
    tree: LinkedTree,
    handle: (current: LinkedTree, childrenResults: LoopHandleResult[]) => any
) {
    let subTree: NullableLinkedTree = tree._firstChild,
        currentResults: LoopHandleResult[] = [];

    while (subTree) {
        let prevResult = LoopDFSTail(subTree, handle);
        if (prevResult) {
            currentResults.push(prevResult);
            if (prevResult.break) break;
        }
        subTree = subTree._next;
    }
    return handle(tree, currentResults);
}

export function Bubble(tree: LinkedTree, handle: (current: LinkedTree) => boolean | void) {
    let top: LinkedTree = tree;
    while (top._parent) {
        if (handle(top) === false) break;
        top = top._parent;
    }
}
