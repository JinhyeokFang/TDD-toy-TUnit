import { TestResult } from './test-result';
import { Testable } from "./testable";

export class TestSuite extends Testable {
    private tests: (typeof Testable)[] = [];
    private result: TestResult[] = []; 

    constructor(tests: (typeof Testable)[]) {
        super();
        this.tests = tests;
    }
    
    protected setUp() {};
    protected tearDown() {};

    run() {
        this.setUp();
        for (const test of this.tests) {
            this.runTest(test);
        }
        this.tearDown();
    }

    private runTest(test: (typeof Testable)) {
        const testInstance = new test();
        testInstance.run();
        const result = testInstance.getResult();
        this.addTestCaseResult(result);
    }

    private addTestCaseResult(testcaseResult: TestResult[]) {
        this.result = this.result.concat(testcaseResult);
    }

    getResult(): TestResult[] {
        return this.result;
    }
}
