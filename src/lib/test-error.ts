export class TestError extends Error {
    constructor(defaultErrorMessage: string, errorMessage?: string) {
        super(errorMessage || defaultErrorMessage);
    }
}
