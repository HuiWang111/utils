import { DOMQuery } from './domQuery';
export declare type NodeType = Node | Window | Document | EventTarget;
export declare type Selector = string | DOMQuery | NodeList | Node | Window | Document | null | EventTarget;
export declare type EachCallback = (node: NodeType, index: number, nodes: DOMQuery) => void;
export declare type FilterCallback = (node: NodeType, index: number, nodes: DOMQuery) => boolean;
