export interface TryJSONParseOptions {
    empty?: any;
    catch?: (error: any) => void;
}
export declare function tryJSONParse(jsonStr: any, options?: TryJSONParseOptions): any;
