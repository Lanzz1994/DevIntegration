
/** 
 * 重新指定继承的某个属性的类型
 * @example 
 * interface Example { name: string } 
 * interface Example2  extends Weaken<Example, 'name'>{ name: number }
 * */
export type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};

/** 
 * 提取类型里的某些属性
 * @example
 * interface Example { id: number, name: string }
 * const Example2: PartialRecord<keyof Example, T> = { name: 'name' }
 * */
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

