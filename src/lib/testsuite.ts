import { TestResult } from './test-result';
import { Testable } from "./testable";

export class TestSuite extends Testable {
    private tests: (typeof Testable)[] = [];
    private testcaseName: string;
    private result: TestResult[] = []; 

    constructor(tests: (typeof Testable)[]) {
        super();
        this.testcaseName = this.constructor
            .toString()
            .split(' ')[1]
            .slice(0, -2);
        this.tests = tests;
    }
    
    protected setUp() {};
    protected tearDown() {};

    run() {
        this.result = [{
            testcaseName: this.testcaseName,
            isSuccess: true,
            children: []
        }];
        this.setUp();
        for (const test of this.tests) {
            this.runTest(test);
        }
        this.tearDown();
        this.setIsSuccess();
    }

    private runTest(test: (typeof Testable)) {
        const testInstance = new test();
        testInstance.run();
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
