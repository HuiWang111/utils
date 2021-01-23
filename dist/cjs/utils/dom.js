"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMathFunc = void 0;
function createMathFunc(selector) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (!selector)
        return function (_) { return false; };
    var firstChar = selector[0];
    var restChars = selector.slice(1);
    switch (firstChar) {
        case '#':
            return function (node) { return node.getAttribute('id') === restChars; };
        case '.':
            return function (node) { return node.classList.contains(restChars); };
        default:
            return function (node) { return node.tagName.toLowerCase() === selector; };
    }
}
exports.createMathFunc = createMathFunc;
