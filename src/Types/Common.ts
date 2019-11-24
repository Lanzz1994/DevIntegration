export type KV<T = any> = { [key: string]: T };
export type KVU<U = {}, T = any> = { [key: string]: T } & U;

export type Nullable<T> = T | null | undefined;
