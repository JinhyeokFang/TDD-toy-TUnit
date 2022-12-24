import { TestResult } from './test-result';
import { Testable } from "./testable";

export type Test = ((typeof Testable) | Testable);

export class BaseTestSuite extends Testable {
    private tests: Test[] = [];
    private result: TestResult[] = []; 

    constructor(tests: Test[]) {
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
        await this.tearDown();
        this.setIsSuccess();
    }

    private async runTest(test: Test) {
        const isInstance = typeof test === 'object';
        const testInstance = isInstance ? test : new test();
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
