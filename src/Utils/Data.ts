/** 根据指定字段值，对数据进行分组
 * @example
 * groupData('field',[{field:'f1'},{field:'f1'},{field:'f2'},{field:'f3'}])
 * // {f1:[{field:'f1'},{field:'f1'}],f2:[{field:'f2'},f3:{field:'f3'}]}
 */
export function groupData<T = any>(field: keyof T, data: T[]) {
    let groupData: any = {};
    return data.map((v) => {
        let fieldValue = v[field];
        if (fieldValue || fieldValue === 0 as any) {
            groupData[field]
                ? groupData[field].push(v)
                : groupData[field] = [v];
        }
    });
}


