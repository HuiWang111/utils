import { NodeType, Selector, EachCallback, FilterCallback } from './common';
export declare class DOMQuery {
    length: number;
    [index: number]: NodeType;
    constructor(nodes: NodeType[] | readonly never[]);
    each(callback: EachCallback): DOMQuery;
    find(selector: string): DOMQuery;
    parent(selector?: string): DOMQuery;
    parents(selector?: string): DOMQuery;
    next(selector?: string): DOMQuery;
    nextAll(selector?: string): DOMQuery;
    prev(selector?: string): DOMQuery;
    prevAll(selector?: string): DOMQuery;
    focus(): DOMQuery;
    blur(): DOMQuery;
    is(selector: string | NodeType | DOMQuery | EventTarget): boolean;
    attr(key: string | Record<string, any>, value?: any): string | null | DOMQuery;
    val(value?: string): string | DOMQuery | undefined;
    addClass(className: string): DOMQuery;
    removeClass(className: string): DOMQuery;
    hasClass(className: string): boolean;
    eq(index: number): DOMQuery;
    index(): number;
    filter(callback: FilterCallback): DOMQuery;
}
export declare function domQuery(selector: Selector, context?: HTMLElement): DOMQuery;
