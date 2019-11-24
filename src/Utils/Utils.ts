export interface TryJSONParseOptions {
    empty?: any,
    catch?: (error: any) => void
}

export function tryJSONParse(jsonStr: any, options: TryJSONParseOptions = {}) {
    let result = options.empty || {};
    try { result = JSON.parse(jsonStr) || options.empty; } catch (e) { options.catch && options.catch(e); }
    return result;
}
