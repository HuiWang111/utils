import { TypesTag } from '../constant';

const ObjectProto = Object.prototype;

const _toString = ObjectProto.toString;

function getType(value?: any): string {
    return _toString.call(value);
}

export function isString(value?: any): value is string {
    return typeof value === 'string' || getType(value) === TypesTag.StringTag;
}
