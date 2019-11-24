import { LoopHandleResult } from '../Tree';
import LinkedTree from './LinkedTree';
export declare function LoopDFS(tree: LinkedTree, handle: (current: LinkedTree, parentResult?: LoopHandleResult) => any, handleResult?: LoopHandleResult): void;
export declare function LoopDFSTail(tree: LinkedTree, handle: (current: LinkedTree, childrenResults: LoopHandleResult[]) => any): any;
