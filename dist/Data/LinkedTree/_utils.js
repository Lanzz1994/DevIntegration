"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setFirst(tree, target) {
    if (target._firstChild && target.SubLength > 1) {
        tree._next = target._firstChild;
        target._firstChild._prev = tree;
        target._firstChild = tree;
    }
    else {
        target._firstChild = tree;
        target._lastChild = tree;
    }
    if (tree._prev)
        tree._prev = undefined;
}
exports.setFirst = setFirst;
function setLast(tree, target) {
    if (target._lastChild && target.SubLength > 1) {
        target._lastChild._next = tree;
        tree._prev = target._lastChild;
        target._lastChild = tree;
    }
    else {
        target._firstChild = tree;
        target._lastChild = tree;
    }
    if (tree._next)
        tree._next = undefined;
}
exports.setLast = setLast;
function setAfter(tree, target) {
    if (target._parent) {
        var next = target._next;
        tree._prev = target;
        if (next) {
            tree._next = next;
            next._prev = tree;
            target._next = tree;
        }
        else {
            target._next = tree;
            target._parent._lastChild = tree;
        }
    }
}
exports.setAfter = setAfter;
function setBefore(tree, target) {
    if (target._parent) {
        var prev = target._prev;
        tree._next = target;
        if (prev) {
            tree._prev = prev;
            prev._next = tree;
            target._prev = tree;
        }
        else {
            target._prev = tree;
            target._parent._firstChild = tree;
        }
    }
}
exports.setBefore = setBefore;
function cutLinked(tree) {
    if (tree._parent) {
        //处理第一个节点
        if (tree._prev) {
            tree._prev._next = tree._next;
        }
        else {
            tree._parent._firstChild = tree._next;
            if (tree._next) {
                tree._next._prev = undefined;
            }
        }
        //处理最后一个节点
        if (tree._next) {
            tree._next._prev = tree._prev;
        }
        else {
            tree._parent._lastChild = tree._prev;
            if (tree._prev) {
                tree._prev._next = undefined;
            }
        }
        tree._prev = undefined;
        tree._next = undefined;
        tree._parent = undefined;
    }
}
exports.cutLinked = cutLinked;
function insert(tree, target) {
    tree._parent = target;
    target._children.push(tree);
}
exports.insert = insert;
function remove(tree) {
    if (tree._parent) {
        var index = tree._parent._children.indexOf(tree);
        if (index > -1) {
            tree._parent._children.splice(index, 1);
            cutLinked(tree);
            return tree;
        }
    }
}
exports.remove = remove;
function destroy(tree) {
    remove(tree);
    tree.Data = undefined;
    tree._firstChild = undefined;
    tree._lastChild = undefined;
    tree._children.length = 0;
}
exports.destroy = destroy;
