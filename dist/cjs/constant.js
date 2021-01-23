"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesTag = exports.EMPTY_ARRAY = exports.KEYCODE = void 0;
var KEYCODE;
(function (KEYCODE) {
    KEYCODE[KEYCODE["Enter"] = 13] = "Enter";
    KEYCODE[KEYCODE["ArrowUp"] = 38] = "ArrowUp";
    KEYCODE[KEYCODE["ArrowDown"] = 40] = "ArrowDown";
    KEYCODE[KEYCODE["ArrowLeft"] = 37] = "ArrowLeft";
    KEYCODE[KEYCODE["ArrowRight"] = 39] = "ArrowRight";
})(KEYCODE = exports.KEYCODE || (exports.KEYCODE = {}));
exports.EMPTY_ARRAY = Object.freeze([]);
var TypesTag;
(function (TypesTag) {
    TypesTag["StringTag"] = "[object String]";
})(TypesTag = exports.TypesTag || (exports.TypesTag = {}));
