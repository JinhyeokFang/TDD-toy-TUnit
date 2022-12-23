import { TestError } from "./test-error";

export function fail(errorMessage?: string): void {
    throw new TestError(
        'fail() function called',
        errorMessage
    );
}
