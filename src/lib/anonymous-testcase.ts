import { BaseTestCase } from "./base-testcase";

export class AnonymousTestCase extends BaseTestCase {
    private testMethod: () => Promise<void>;

    constructor(testName: string, testMethod: () => Promise<void>) {
        super(testName);
        this.testMethod = testMethod;
    }

    protected async test() {
        await this.testMethod();
    }
}
