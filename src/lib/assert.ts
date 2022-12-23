import { isEqual } from 'lodash'
import { TestError } from './test-error';

export function assertEqual<T>(
    expected: T, received: T, errorMessage?: string
): void {
    const equalivant = isEqual(expected, received);
    if (!equalivant)
        throw new TestError(
            assertEqualDefaultErrorMessage(expected, received),
            errorMessage
        );
}

export function assertThrowError(
    testFunction: Function, errorMessage?: string
): void {
    try {
        testFunction();
    } catch {
        return;
    }
    throw new TestError(
        assertThrowErrorDefaultErrorMessage(),
        errorMessage
    );
}

function assertEqualDefaultErrorMessage(expected: any, received: any) {
    return `Expected [${expected}] but Received [${received}]`;
}

function assertThrowErrorDefaultErrorMessage() {
    return `Received function does not throw the error`;
}
