/** 秒转分钟字符串，70 => 00:01:10 */
export function timeToMinute(times: number) {
    let result = '00:00:00';
    let hour: any, minute: any, second: any;
    if (times > 0) {
        hour = Math.floor(times / 3600);
        if (hour < 10) {
            hour = '0' + hour;
        }
        minute = Math.floor((times - 3600 * hour) / 60);
        if (minute < 10) {
            minute = '0' + minute;
        }

        second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
        if (second < 10) {
            second = '0' + second;
        }
        if (hour == '00') {
            result = minute + ':' + second;
        } else if (minute == '00') {
            result = hour + ':' + minute + ':' + second;
        } else {
            result = second;
        }
    }
    return result;
}
