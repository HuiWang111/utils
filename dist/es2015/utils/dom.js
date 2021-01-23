export function createMathFunc(selector) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (!selector)
        return (_) => false;
    const firstChar = selector[0];
    const restChars = selector.slice(1);
    switch (firstChar) {
        case '#':
            return (node) => node.getAttribute('id') === restChars;
        case '.':
            return (node) => node.classList.contains(restChars);
        default:
            return (node) => node.tagName.toLowerCase() === selector;
    }
}
