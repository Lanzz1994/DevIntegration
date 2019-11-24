"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 根据指定字段值，对数据进行分组
 * @example
 * groupData('field',[{field:'f1'},{field:'f1'},{field:'f2'},{field:'f3'}])
 * // {f1:[{field:'f1'},{field:'f1'}],f2:[{field:'f2'},f3:{field:'f3'}]}
 */
function groupData(field, data) {
    let groupData = {};
    return data.map((v) => {
        let fieldValue = v[field];
        if (fieldValue || fieldValue === 0) {
            groupData[field]
                ? groupData[field].push(v)
                : groupData[field] = [v];
        }
    });
}
exports.groupData = groupData;
