import { KV } from '../../Types/Common';
import { LoopDFSTail } from './Utils';
export declare type NullableLinkedTree = LinkedTree | undefined;
export declare type LinkedTreeParams = {
    parent?: LinkedTree;
    children?: LinkedTree;
    deep?: boolean;
};
export interface ILinkedTreeRaw<T = any> {
    Data: T;
    Children: ILinkedTreeRaw<T>[];
}
export declare type FormatOptions<T> = {
    format?: (data: T) => KV;
    childrenField?: string;
    useTreeForamt?: boolean;
};
export declare type ImportOptions<T> = {
    coverRoot?: boolean;
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
    _parent?: LinkedTree<T>;
    _prev?: LinkedTree<T>;
    _next?: LinkedTree<T>;
    _children: LinkedTree<T>[];
    _firstChild?: LinkedTree<T>;
    _lastChild?: LinkedTree<T>;
    Data: T;
    readonly Parent: LinkedTree<T> | undefined;
    readonly Children: LinkedTree<T>[];
    readonly Prev: LinkedTree<T> | undefined;
    readonly Next: LinkedTree<T> | undefined;
    readonly FirstChild: LinkedTree<T> | undefined;
    readonly LastChild: LinkedTree<T> | undefined;
    readonly IsLeaf: boolean;
    readonly SubLength: number;
    constructor(data: T, params?: LinkedTreeParams);
    /** 尾递归遍历 */
    static LoopDFSTail: typeof LoopDFSTail;
    /**
     * Adds the specified new tree at the start of children of this
     * @returns added node
     */
    AddFirst(tree: LinkedTree): LinkedTree<any>;
    /**
     * Adds the specified new tree at the end of children of this
     * @returns added node
     */
    AddLast(tree: LinkedTree): LinkedTree<any>;
    /**
     * Adds the new tree before the specified existing trees
     * that filtering from 'fn' parameter in children of this
     */
    private _moveToChildren;
    private _moveToSibling;
    /**
     * @returns moved node
     */
    MoveToFirst(target: LinkedTree): this;
    /**
     * @returns moved node
     */
    MoveToLast(target: LinkedTree): this;
    /**
     * @returns moved node
     */
    MoveToBefore(target: LinkedTree): this;
    /**
     * @returns moved node
     */
    MoveToAfter(target: LinkedTree): this;
    /**
     * @returns moved node
     */
    MoveToReplace(target: LinkedTree): this;
    RemoveSelf(): void;
    Clear(): void;
    Map(callback: (current: LinkedTree<T>, children: any[]) => any): any;
    Export({ format, childrenField, useTreeForamt }?: FormatOptions<T>): any;
    Import(source: KV | KV[], { format, childrenField, useTreeForamt, coverRoot }?: ImportOptions<T>): this;
}
