import {
    isString
} from './utils';

describe('test utils', () => {
    it('isString should work', () => {
        expect(isString('')).toBe(true);
        expect(isString(new String())).toBe(true);
        expect(isString([])).toBe(false);
        expect(isString(/\d+/)).toBe(false);
        expect(isString(1)).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString(undefined)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(void 0)).toBe(false);
        expect(isString(() => {})).toBe(false);
        expect(isString(new Set())).toBe(false);
        expect(isString(new Map())).toBe(false);
    });
});
