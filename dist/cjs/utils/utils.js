"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
var constant_1 = require("../constant");
var ObjectProto = Object.prototype;
var _toString = ObjectProto.toString;
function getType(value) {
    return _toString.call(value);
}
function isString(value) {
    return typeof value === 'string' || getType(value) === constant_1.TypesTag.StringTag;
}
exports.isString = isString;
