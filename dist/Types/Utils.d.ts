export declare type Mapping<T> = {
    [P in keyof T]: T[P];
};
