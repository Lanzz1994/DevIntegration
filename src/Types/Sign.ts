import { Mapping } from "./Utils";

/**
 * 重写超类的某个属性类型
 * @example
 * interface Example { name: string }
 * interface Example2  extends Weaken<Example, 'name'>{ name: number }
 * */
export type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};

/** 返回选取部分可空字段为必须字段 */
export type PickRequired<T, K extends keyof T> = Required<Pick<T, K>>;

export type PartialRequired<T, K extends keyof T> = Mapping<Required<Pick<T, K>> & Exclude<T, K>>;
