import { TestResult } from './test-result';
import { Testable } from "./testable";

export class TestSuite extends Testable {
    private tests: (typeof Testable)[] = [];
    private result: TestResult[] = []; 

    constructor(tests: (typeof Testable)[]) {
        super();
        this.tests = tests;
    }
    
    protected async setUp() {};
    protected async tearDown() {};

    async run() {
        this.result = [{
            testName: Testable.getTestName(this),
            isSuccess: true,
            children: []
        }];
        await this.setUp();
        await Promise.all(
            this.tests.map(test => this.runTest(test))
        );
        for (const test of this.tests) {
            await this.runTest(test);
        }
        await this.tearDown();
        this.setIsSuccess();
    }

    private async runTest(test: (typeof Testable)) {
        const testInstance = new test();
        await testInstance.run();
        const result = testInstance.getResult();
        this.addTestCaseResult(result);
    }

    private addTestCaseResult(testcaseResult: TestResult[]) {
        this.result[0].children = this.result[0].children.concat(testcaseResult);
    }

    private setIsSuccess() {
        this.result[0].isSuccess = true;
        for (const childResult of this.result[0].children) {
            if (!childResult.isSuccess)
                this.result[0].isSuccess = false;
        }
    }

    getResult(): TestResult[] {
        return this.result;
    }
}
