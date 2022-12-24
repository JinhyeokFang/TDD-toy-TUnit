import { TestCase } from "./testcase";

export class AnonymousTestCase extends TestCase {
    private testMethod: () => Promise<void>;

    private constructor(testName: string, testMethod: () => Promise<void>) {
        super(testName);
        this.testMethod = testMethod;
    }

    protected async test() {
        await this.testMethod();
    }

    static create(testName: string, testMethod: () => Promise<void>) {
        const testCase = new AnonymousTestCase(testName, testMethod);
        return testCase;
    }
}
