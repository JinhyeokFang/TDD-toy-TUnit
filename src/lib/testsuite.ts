import TestResult from './test-result';
import Testable from "./testable";
import { TestState } from './teststate';

export default class TestSuite extends Testable {
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
        this.changeStateIfAllTestSucceed();
    }

    private runTest(test: (typeof Testable)) {
        const testInstance = new test();
        testInstance.run();
        const result = testInstance.getResult();
        this.addTestCaseResult(result);
        this.changeStateIfTestFailed(testInstance);
    }

    private addTestCaseResult(testcaseResult: TestResult[]) {
        this.result = this.result.concat(testcaseResult);
    }

    private changeStateIfTestFailed(test: Testable) {
        if (test.state == TestState.Failed)
            this.testFailed();
    }

    private changeStateIfAllTestSucceed() {
        if (this.state != TestState.Failed)
            this.testSucceeded();
    }

    getResult(): TestResult[] {
        return this.result;
    }
}