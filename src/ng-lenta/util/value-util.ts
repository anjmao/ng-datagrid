export function isDefined(value: any) {
    return value !== null && value !== undefined;
}

export function isObject(value: any) {
    return isDefined(value) && typeof value === 'object'
}

export function isPromise(value: any) {
    return value instanceof Promise;
}

export function isArray(value: any) {
    return Array.isArray(value);
}

export function isFunction(value: any) {
    return value instanceof Function;
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}
