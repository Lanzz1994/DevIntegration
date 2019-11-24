/** 匹配返回两个字符串的交集，xbc abcd => bc */
export function getStringOverlap(source: string, target: string) {

    if (!source || !target) return undefined;

    let index = source.length;
    while (index) {
        let temp = source.slice(0, index--);
        if (temp && target.includes(temp)) return temp;
    }
}
