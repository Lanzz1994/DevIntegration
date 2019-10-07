"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seed = 0;
function GUID() {
    return Date.now() + "_" + seed++;
}
exports.default = GUID;
