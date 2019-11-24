"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tryJSONParse(jsonStr, options = {}) {
    let result = options.empty || {};
    try {
        result = JSON.parse(jsonStr) || options.empty;
    }
    catch (e) {
        options.catch && options.catch(e);
    }
    return result;
}
exports.tryJSONParse = tryJSONParse;
