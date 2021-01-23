import { TypesTag } from '../constant';
const ObjectProto = Object.prototype;
const _toString = ObjectProto.toString;
function getType(value) {
    return _toString.call(value);
}
export function isString(value) {
    return typeof value === 'string' || getType(value) === TypesTag.StringTag;
}
