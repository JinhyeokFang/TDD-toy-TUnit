import { isEqual } from 'lodash'

export function assertEqual(
    expected: any, received: any, errorMessage?: string
): void {
    const equalivant = isEqual(expected, received);
    if (!equalivant)
        throw new Error(errorMessage || `Expected ${expected} but Received ${received}`);
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
