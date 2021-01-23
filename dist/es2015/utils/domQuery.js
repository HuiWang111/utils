import { isString } from './utils';
import { createMathFunc } from './dom';
import { EMPTY_ARRAY } from '../constant';
export class DOMQuery {
    constructor(nodes) {
        nodes.forEach((node, i) => {
            this[i] = node;
        });
        this.length = nodes.length;
    }
    each(callback) {
        for (let i = 0, len = this.length; i < len; i++) {
            callback(this[i], i, this);
        }
        return this;
    }
    find(selector) {
        const nodes = [];
        this.each(node => {
            const foundNodes = node.querySelectorAll(selector);
            foundNodes.forEach(foundNode => {
                nodes.push(foundNode);
            });
        });
        return new DOMQuery(nodes);
    }
    parent(selector) {
        const node = this[0];
        if (node) {
            const parentNode = node.parentNode;
            if (!parentNode) {
                return new DOMQuery(EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([parentNode]);
            }
            const matchFn = createMathFunc(selector);
            const isMatch = matchFn(parentNode);
            if (isMatch) {
                return new DOMQuery([parentNode]);
            }
        }
        return new DOMQuery(EMPTY_ARRAY);
    }
    parents(selector) {
        const node = this[0];
        if (node) {
            let parentNode = node;
            const matchFn = selector == null
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ? (_) => true
                : createMathFunc(selector);
            const nodes = [];
            while (parentNode !== document.body) {
                parentNode = parentNode.parentNode;
                if (parentNode) {
                    const isMatch = matchFn(parentNode);
                    if (isMatch) {
                        nodes.push(parentNode);
                    }
                }
            }
            if (nodes.length) {
                return new DOMQuery(nodes);
            }
        }
        return new DOMQuery(EMPTY_ARRAY);
    }
    // next/prev/nextAll/prevAll方法与jQuery有差别，jQuery是查询集合中所有元素的next/prev/nextAll/prevAll，这里只实现了查询第一个元素
    next(selector) {
        const node = this[0];
        if (node) {
            const nextNode = node.nextElementSibling;
            if (!nextNode) {
                return new DOMQuery(EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([nextNode]);
            }
            const matchFn = createMathFunc(selector);
            const isMatch = matchFn(nextNode);
            if (isMatch) {
                return new DOMQuery([nextNode]);
            }
        }
        return new DOMQuery(EMPTY_ARRAY);
    }
    nextAll(selector) {
        let node = this[0];
        const matched = [];
        const matchFn = selector ? createMathFunc(selector) : undefined;
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
        return new DOMQuery(EMPTY_ARRAY);
    }
    prev(selector) {
        const node = this[0];
        if (node) {
            const prevNode = node.previousElementSibling;
            if (!prevNode) {
                return new DOMQuery(EMPTY_ARRAY);
            }
            if (selector == null) {
                return new DOMQuery([prevNode]);
            }
            const matchFn = createMathFunc(selector);
            const isMatch = matchFn(prevNode);
            if (isMatch) {
                return new DOMQuery([prevNode]);
            }
        }
        return new DOMQuery(EMPTY_ARRAY);
    }
    prevAll(selector) {
        let node = this[0];
        const matched = [];
        const matchFn = selector ? createMathFunc(selector) : undefined;
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
        return new DOMQuery(EMPTY_ARRAY);
    }
    focus() {
        const node = this[0];
        if (node && node.focus) {
            node.focus();
        }
        return this;
    }
    blur() {
        const node = this[0];
        if (node && node.blur) {
            node.blur();
        }
        return this;
    }
    is(selector) {
        if (selector instanceof DOMQuery) {
            return this[0] === selector[0];
        }
        else if (isString(selector)) {
            const target = document.querySelector(selector);
            return this[0] === target;
        }
        return this[0] === selector;
    }
    attr(key, value) {
        const element = this[0];
        if (isString(key)) {
            if (value === undefined) {
                return element.getAttribute(key);
            }
            element.setAttribute(key, value);
            return this;
        }
        for (const k in key) {
            element.setAttribute(k, key[k]);
        }
        return this;
    }
    val(value) {
        if (value == null) {
            if (!this[0])
                return undefined;
            return this[0].value;
        }
        if (this[0]) {
            this[0].value = value;
        }
        return this;
    }
    addClass(className) {
        if (this[0]) {
            this[0].classList.add(className);
        }
        return this;
    }
    removeClass(className) {
        if (this[0]) {
            this[0].classList.remove(className);
        }
        return this;
    }
    hasClass(className) {
        if (this[0]) {
            return this[0].classList.contains(className);
        }
        return false;
    }
    eq(index) {
        const node = this[index];
        if (node) {
            return new DOMQuery([node]);
        }
        return new DOMQuery(EMPTY_ARRAY);
    }
    index() {
        return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
    }
    filter(callback) {
        const matched = [];
        for (let i = 0, len = this.length; i < len; i++) {
            if (callback(this[i], i, this)) {
                matched.push(this[i]);
            }
        }
        return new DOMQuery(matched);
    }
}
export function domQuery(selector, context) {
    const nodes = [];
    if (selector) {
        if (selector instanceof DOMQuery)
            return selector;
        if (isString(selector)) {
            const nodeList = (context || document).querySelectorAll(selector);
            if (nodeList.length) {
                nodeList.forEach(node => {
                    nodes.push(node);
                });
            }
        }
        else if (selector instanceof NodeList) {
            if (selector.length && selector[0].nodeType) {
                selector.forEach(node => {
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
