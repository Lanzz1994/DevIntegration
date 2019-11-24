"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 匹配返回两个字符串的交集，xbc abcd => bc */
function getStringOverlap(source, target) {
    if (!source || !target)
        return undefined;
    let index = source.length;
    while (index) {
        let temp = source.slice(0, index--);
        if (temp && target.includes(temp))
            return temp;
    }
}
exports.getStringOverlap = getStringOverlap;
