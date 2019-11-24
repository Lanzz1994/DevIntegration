import { KV } from '../../Types/Common';
export declare type LoopHandleResult<T = any> = {
    parent?: T;
    prev?: T;
    break?: boolean;
    [key: string]: any;
};
export declare function LoopDFS(tree: KV, childFiled: string, handle: (current: KV, parentResult?: LoopHandleResult) => any, handleResult?: LoopHandleResult): void;
export declare function LoopDFSTail(tree: KV, childFiled: string, handle: (current: KV, childrenResults: LoopHandleResult[]) => any): any;
