import { KeyValue } from '@/Types/Common';
export declare type NullableLinkedTree = LinkedTree | undefined;
export declare type LinkedTreeParams = {
    parent?: LinkedTree;
    children?: LinkedTree;
    deep?: boolean;
};
export declare type TreeFormat<T> = {
    Data: T;
    Children: TreeFormat<T>[];
};
export declare type TreeFormatOptions<T> = {
    format?: (data: T) => KeyValue;
    childrenField?: string;
    useTreeFormat?: boolean;
};
export interface ILinkedTree<T> {
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
    Export({ format, childrenField, useTreeFormat }: TreeFormatOptions<T>): any;
    Import(tree: KeyValue, { childrenField, useTreeFormat }: Exclude<TreeFormatOptions<T>, 'format'>): any;
}
