import { BaseTestCase } from "./base-testcase";

export interface AnonymousTestCaseMethods {
    test: () => Promise<void>,
    setUp?: () => Promise<void>,
    tearDown?: () => Promise<void>,
}

export class AnonymousTestCase extends BaseTestCase {
    private testMethod: () => Promise<void>;
    private setUpMethod: () => Promise<void> = async () => {};
    private tearDownMethod: () => Promise<void> = async () => {};

    constructor(
        testName: string,
        method: AnonymousTestCaseMethods
    ) {
        super(testName);
        this.testMethod = method.test;
        this.setUpMethod = method.setUp || this.setUpMethod;
        this.tearDownMethod = method.tearDown || this.tearDownMethod;
    }

    protected async test() {
        await this.testMethod();
    }

    protected async setUp() {
        await this.setUpMethod();
    }

    protected async tearDown() {
        await this.tearDownMethod();
    }
}
