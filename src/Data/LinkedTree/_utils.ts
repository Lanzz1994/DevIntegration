import LinkedTree from './LinkedTree';

export function setFirst(tree: LinkedTree, target: LinkedTree) {
    if (target._firstChild && target.SubLength > 1) {
        tree._next = target._firstChild;
        target._firstChild._prev = tree;
        target._firstChild = tree;
    } else {
        target._firstChild = tree;
        target._lastChild = tree;
    }
    if (tree._prev) tree._prev = undefined;
}

export function setLast(tree: LinkedTree, target: LinkedTree) {
    if (target._lastChild && target.SubLength > 1) {
        target._lastChild._next = tree;
        tree._prev = target._lastChild;
        target._lastChild = tree;
    } else {
        target._firstChild = tree;
        target._lastChild = tree;
    }
    if (tree._next) tree._next = undefined;
}

export function setAfter(tree: LinkedTree, target: LinkedTree) {
    if (target._parent) {
        let next = target._next;
        tree._prev = target;
        if (next) {
            tree._next = next;
            next._prev = tree;
            target._next = tree;
        } else {
            target._next = tree;
            target._parent._lastChild = tree;
        }
    }
}

export function setBefore(tree: LinkedTree, target: LinkedTree) {
    if (target._parent) {
        let prev = target._prev;
        tree._next = target;
        if (prev) {
            tree._prev = prev;
            prev._next = tree;
            target._prev = tree;
        } else {
            target._prev = tree;
            target._parent._firstChild = tree;
        }
    }
}

export function cutLinked(tree: LinkedTree): void {
    if (tree._parent) {
        //处理第一个节点
        if (tree._prev) {
            tree._prev._next = tree._next;
        } else {
            tree._parent._firstChild = tree._next;
            if (tree._next) { tree._next._prev = undefined }
        }

        //处理最后一个节点
        if (tree._next) {
            tree._next._prev = tree._prev;
        } else {
            tree._parent._lastChild = tree._prev;
            if (tree._prev) { tree._prev._next = undefined }
        }

        tree._prev = undefined;
        tree._next = undefined;
        tree._parent = undefined;
    }
}

export function insert(tree: LinkedTree, target: LinkedTree) {
    tree._parent = target;
    target._children.push(tree);
}

export function remove(tree: LinkedTree) {
    if (tree._parent) {
        let index = tree._parent._children.indexOf(tree);
        if (index > -1) {
            tree._parent._children.splice(index, 1);
            cutLinked(tree);
            return tree;
        }
    }
}

export function destroy(tree: LinkedTree) {
    remove(tree);
    tree.Data = undefined;
    tree._firstChild = undefined;
    tree._lastChild = undefined;
    tree._children.length = 0;
}