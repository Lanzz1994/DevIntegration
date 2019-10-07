import { KeyValue } from '@/Types/Common';
export declare type LoopHandleResult<T = any> = {
    parent?: T;
    prev?: T;
    break?: boolean;
    [key: string]: any;
};
export declare function LoopDFS(tree: KeyValue, childFiled: string, handle: (current: KeyValue, parentResult?: LoopHandleResult) => any, handleResult?: LoopHandleResult): void;
export declare function LoopDFSTail(tree: KeyValue, childFiled: string, handle: (current: KeyValue, childrenResults: LoopHandleResult[]) => any): any;
