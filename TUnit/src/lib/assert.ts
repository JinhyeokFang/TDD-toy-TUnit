import { isEqual } from 'lodash'

export function assertEqual(
    expected: any, received: any, errorMessage?: string
): void {
    const equalivant = isEqual(expected, received);
    if (!equalivant)
        throw new Error(errorMessage || `Expected ${expected} but Received ${received}`);
}
