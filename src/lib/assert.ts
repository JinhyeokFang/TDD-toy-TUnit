import { isEqual } from 'lodash'

export function assertEqual<T>(
    expected: T, received: T, errorMessage?: string
): void {
    const equalivant = isEqual(expected, received);
    if (!equalivant)
        throw new Error(errorMessage || `Expected [${expected}] but Received [${received}]`);
}

export function assertThrowError(
    testFunction: Function, errorMessage?: string
): void {
    try {
        testFunction();
    } catch {
        return;
    }
    throw new Error(errorMessage);
}
