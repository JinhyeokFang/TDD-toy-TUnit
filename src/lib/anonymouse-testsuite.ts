import { BaseTestSuite, Test } from "./base-testsuite";

export interface AnonymousTestSuiteMethods {
    tests: Test[],
    setUp?: () => Promise<void>,
    tearDown?: () => Promise<void>,
}

export class AnonymousTestSuite extends BaseTestSuite {
    private setUpMethod: () => Promise<void> = async () => {};
    private tearDownMethod: () => Promise<void> = async () => {};

    constructor(
        testName: string,
        method: AnonymousTestSuiteMethods
    ) {
        super(method.tests, testName);
        this.setUpMethod = method.setUp || this.setUpMethod;
        this.tearDownMethod = method.tearDown || this.tearDownMethod;
    }

    protected async setUp() {
        await this.setUpMethod();
    }

    protected async tearDown() {
        await this.tearDownMethod();
    }
}
