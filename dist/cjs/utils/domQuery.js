"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domQuery = exports.DOMQuery = void 0;
var utils_1 = require("./utils");
var dom_1 = require("./dom");
var constant_1 = require("../constant");
var DOMQuery = /** @class */ (function () {
    function DOMQuery(nodes) {
        var _this = this;
        nodes.forEach(function (node, i) {
            _this[i] = node;
        });
        this.length = nodes.length;
    }
    DOMQuery.prototype.each = function (callback) {
        for (var i = 0, len = this.length; i < len; i++) {
            callback(this[i], i, this);
        }
        return this;
    };
    DOMQuery.prototype.find = function (selector) {
        var nodes = [];
        this.each(function (node) {
            var foundNodes = node.querySelectorAll(selector);
            foundNodes.forEach(function (foundNode) {
                nodes.push(foundNode);
            });
        });
        return new DOMQuery(nodes);
    };
    DOMQuery.prototype.parent = function (selector) {
        var node = this[0];
        if (node) {
            var parentNode = node.parentNode;
            if (!parentNode) {
                return new DOMQuery(constant_1.EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([parentNode]);
            }
            var matchFn = dom_1.createMathFunc(selector);
            var isMatch = matchFn(parentNode);
            if (isMatch) {
                return new DOMQuery([parentNode]);
            }
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.parents = function (selector) {
        var node = this[0];
        if (node) {
            var parentNode = node;
            var matchFn = selector == null
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ? function (_) { return true; }
                : dom_1.createMathFunc(selector);
            var nodes = [];
            while (parentNode !== document.body) {
                parentNode = parentNode.parentNode;
                if (parentNode) {
                    var isMatch = matchFn(parentNode);
                    if (isMatch) {
                        nodes.push(parentNode);
                    }
                }
            }
            if (nodes.length) {
                return new DOMQuery(nodes);
            }
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    // next/prev/nextAll/prevAll方法与jQuery有差别，jQuery是查询集合中所有元素的next/prev/nextAll/prevAll，这里只实现了查询第一个元素
    DOMQuery.prototype.next = function (selector) {
        var node = this[0];
        if (node) {
            var nextNode = node.nextElementSibling;
            if (!nextNode) {
                return new DOMQuery(constant_1.EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([nextNode]);
            }
            var matchFn = dom_1.createMathFunc(selector);
            var isMatch = matchFn(nextNode);
            if (isMatch) {
                return new DOMQuery([nextNode]);
            }
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.nextAll = function (selector) {
        var node = this[0];
        var matched = [];
        var matchFn = selector ? dom_1.createMathFunc(selector) : undefined;
        if (node) {
            while ((node = node.nextElementSibling)) {
                if (matchFn) {
                    if (matchFn(node)) {
                        matched.push(node);
                    }
                }
                else {
                    matched.push(node);
                }
            }
            return new DOMQuery(matched);
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.prev = function (selector) {
        var node = this[0];
        if (node) {
            var prevNode = node.previousElementSibling;
            if (!prevNode) {
                return new DOMQuery(constant_1.EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([prevNode]);
            }
            var matchFn = dom_1.createMathFunc(selector);
            var isMatch = matchFn(prevNode);
            if (isMatch) {
                return new DOMQuery([prevNode]);
            }
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.prevAll = function (selector) {
        var node = this[0];
        var matched = [];
        var matchFn = selector ? dom_1.createMathFunc(selector) : undefined;
        if (node) {
            while ((node = node.previousElementSibling)) {
                if (matchFn) {
                    if (matchFn(node)) {
                        matched.push(node);
                    }
                }
                else {
                    matched.push(node);
                }
            }
            return new DOMQuery(matched.reverse());
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.focus = function () {
        var node = this[0];
        if (node && node.focus) {
            node.focus();
        }
        return this;
    };
    DOMQuery.prototype.blur = function () {
        var node = this[0];
        if (node && node.blur) {
            node.blur();
        }
        return this;
    };
    DOMQuery.prototype.is = function (selector) {
        if (selector instanceof DOMQuery) {
            return this[0] === selector[0];
        }
        else if (utils_1.isString(selector)) {
            var target = document.querySelector(selector);
            return this[0] === target;
        }
        return this[0] === selector;
    };
    DOMQuery.prototype.attr = function (key, value) {
        var element = this[0];
        if (utils_1.isString(key)) {
            if (value === undefined) {
                return element.getAttribute(key);
            }
            element.setAttribute(key, value);
            return this;
        }
        for (var k in key) {
            element.setAttribute(k, key[k]);
        }
        return this;
    };
    DOMQuery.prototype.val = function (value) {
        if (value == null) {
            if (!this[0])
                return undefined;
            return this[0].value;
        }
        if (this[0]) {
            this[0].value = value;
        }
        return this;
    };
    DOMQuery.prototype.addClass = function (className) {
        if (this[0]) {
            this[0].classList.add(className);
        }
        return this;
    };
    DOMQuery.prototype.removeClass = function (className) {
        if (this[0]) {
            this[0].classList.remove(className);
        }
        return this;
    };
    DOMQuery.prototype.hasClass = function (className) {
        if (this[0]) {
            return this[0].classList.contains(className);
        }
        return false;
    };
    DOMQuery.prototype.eq = function (index) {
        var node = this[index];
        if (node) {
            return new DOMQuery([node]);
        }
        return new DOMQuery(constant_1.EMPTY_ARRAY);
    };
    DOMQuery.prototype.index = function () {
        return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
    };
    DOMQuery.prototype.filter = function (callback) {
        var matched = [];
        for (var i = 0, len = this.length; i < len; i++) {
            if (callback(this[i], i, this)) {
                matched.push(this[i]);
            }
        }
        return new DOMQuery(matched);
    };
    return DOMQuery;
}());
exports.DOMQuery = DOMQuery;
function domQuery(selector, context) {
    var nodes = [];
    if (selector) {
        if (selector instanceof DOMQuery)
            return selector;
        if (utils_1.isString(selector)) {
            var nodeList = (context || document).querySelectorAll(selector);
            if (nodeList.length) {
                nodeList.forEach(function (node) {
                    nodes.push(node);
                });
            }
        }
        else if (selector instanceof NodeList) {
            if (selector.length && selector[0].nodeType) {
                selector.forEach(function (node) {
                    nodes.push(node);
                });
            }
        }
        else {
            nodes.push(selector);
        }
    }
    return new DOMQuery(nodes);
}
exports.domQuery = domQuery;
