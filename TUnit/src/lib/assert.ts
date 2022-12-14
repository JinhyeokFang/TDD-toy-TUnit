import { isEqual } from 'lodash'

export function assertEqual(
    object1: any, object2: any, errorMessage = ''
): void {
    const equalivant = isEqual(object1, object2);
    if (!equalivant)
        throw new Error(errorMessage);
}
