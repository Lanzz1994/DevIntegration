
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import { KV } from '../../Types/Common';
import { LoopDFSTail, Bubble } from './Utils';
import { LoopDFSTail as TreeLoopDFSTail } from '../Tree/Utils';
import { insert, setFirst, setLast, remove, setBefore, setAfter, destroy } from './_utils';

export type NullableLinkedTree = LinkedTree | undefined;

export type LinkedTreeParams = {
    parent?: LinkedTree,
    children?: LinkedTree,
    deep?: boolean
};

export interface ILinkedTreeRaw<T = any> {
    Data: T;
    Children: ILinkedTreeRaw<T>[];
}

export type FormatOptions<T> = {
    format?: (data: T) => KV,
    childrenField?: string,
    useTreeForamt?: boolean
}

export type ImportOptions<T> = {
    coverRoot?: boolean
} & FormatOptions<T>;

export interface ILinkedTree<T> extends ILinkedTreeRaw {
    Data: T;
    Parent?: ILinkedTree<T>;
    Prev?: ILinkedTree<T>;
    Next?: ILinkedTree<T>;
    Children: ILinkedTree<T>[];
    FirstChild?: ILinkedTree<T>;
    LastChild?: ILinkedTree<T>;
    IsLeaf: boolean;
    SubLength: number;
}

export default class LinkedTree<T = any> implements ILinkedTree<T> {

    //=================== Fields =====================
    _parent?: LinkedTree<T>;
    _prev?: LinkedTree<T>;
    _next?: LinkedTree<T>;
    _children: LinkedTree<T>[] = [];
    _firstChild?: LinkedTree<T>;
    _lastChild?: LinkedTree<T>;
    Data: T;

    //=================== Properties =====================

    get Parent() { return this._parent }
    get Children() { return this._children; }
    get Prev() { return this._prev; }
    get Next() { return this._next; }
    get FirstChild() { return this._firstChild; }
    get LastChild() { return this._lastChild; }
    get IsLeaf() { return this._children.length === 0; }
    get SubLength() { return this._children.length; }

    //=================== Constructor =====================
    constructor(data: T, params?: LinkedTreeParams) {
        this.Data = data;
        if (params) {
            if (params.deep) this.Data = cloneDeep(data);
            if (params.parent) params.parent.AddLast(this);
            if (params.children) this.AddFirst(params.children);
        }
    }

    /** 尾递归遍历 */
    static LoopDFSTail = LoopDFSTail

    //=================== Add =====================
    /**
     * Adds the specified new tree at the start of children of this
     * @returns added node
     */
    AddFirst(tree: LinkedTree) {
        insert(tree, this);
        setFirst(tree, this);
        return tree;
    }

    /**
     * Adds the specified new tree at the end of children of this
     * @returns added node
     */
    AddLast(tree: LinkedTree) {
        insert(tree, this);
        setLast(tree, this);
        return tree;
    }

    /**
     * Adds the new tree before the specified existing trees
     * that filtering from 'fn' parameter in children of this
     */
    // AddBefore(tree:LinkedTree,fn):void{}
    // AddAfter(tree:LinkedTree,fn):void{}

    //=================== Move =====================
    private _moveToChildren(tree: LinkedTree) {
        if (tree._parent) {
            remove(tree);
        }
    }

    private _moveToSibling(tree: LinkedTree, target: LinkedTree) {
        if (target._parent) {
            remove(tree);
            insert(tree, target._parent);
        }
    }

    /**
     * @returns moved node
     */
    MoveToFirst(target: LinkedTree) {
        this._moveToChildren(this);
        target.AddFirst(this);
        return this;
    }

    /**
     * @returns moved node
     */
    MoveToLast(target: LinkedTree) {
        this._moveToChildren(this);
        target.AddLast(this);
        return this;
    }

    /**
     * @returns moved node
     */
    MoveToBefore(target: LinkedTree) {
        this._moveToSibling(this, target);
        setBefore(this, target);
        return this;
    }

    /**
     * @returns moved node
     */
    MoveToAfter(target: LinkedTree) {
        this._moveToSibling(this, target);
        setAfter(this, target);
        return this;
    }

    /**
     * @returns moved node
     */
    MoveToReplace(target: LinkedTree) {
        this._moveToSibling(this, target);
        setAfter(this, target);
        remove(target);
        return this;
    }

    //=================== Remove =====================

    RemoveSelf() {
        this.Clear();
        destroy(this);
    }

    Clear() {
        LoopDFSTail(this, (cureent) => {
            destroy(cureent);
            cureent._children.length = 0;
        });
    }

    //=================== Util =====================
    HasAncestor(target: LinkedTree) {
        let has = false;
        Bubble(this, (current) => {
            has = current === target;
            return !has;
        });
        return has;
    }

    Map(callback: (current: LinkedTree<T>, children: any[]) => any) {
        return LoopDFSTail(this, (current, childrenResults) => callback(current, childrenResults));
    }

    Export({ format, childrenField = 'Children', useTreeForamt = true }: FormatOptions<T> = {}) {

        let result = LoopDFSTail(this, (current, childrenResults) => {
            let fmt = format
                ? format(current.Data)
                : current.Data;

            let Children = childrenResults.map(res => res.fmtValue);

            let fmtValue = useTreeForamt === false
                ? { Data: fmt, Children }
                : { ...fmt, [childrenField]: Children };

            return { fmtValue };
        });

        return result.fmtValue;
    }

    Import(source: KV | KV[], { format, childrenField = 'Children', useTreeForamt = true, coverRoot }: ImportOptions<T> = {}) {

        const sourceIsArray = Array.isArray(source);

        let result = TreeLoopDFSTail(sourceIsArray ? { [childrenField]: source } : source, childrenField, (current, childrenResults) => {

            let tree = new LinkedTree(
                useTreeForamt
                    ? current.Data
                    : format
                        ? format(current.Data)
                        : omit(current, childrenField)
            );

            childrenResults.forEach(res => tree.AddLast(res.tree));

            return { tree };
        }) as { tree: LinkedTree };

        result.tree.Children.forEach((v) => this.AddLast(v));

        !sourceIsArray && coverRoot && (this.Data = result.tree.Data);

        return this;
    }
}
