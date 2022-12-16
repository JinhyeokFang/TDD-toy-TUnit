import TestResult from './test-result';
import Testable from "./testable";

export default class TestSuite extends Testable {
    private testcases: (typeof Testable)[] = [];
    private result: TestResult[] = []; 

    constructor(testcases: (typeof Testable)[]) {
        super();
        this.testcases = testcases;
    }
    
    protected setUp() {};
    protected tearDown() {};

    run() {
        this.setUp();
        for (const testcase of this.testcases) {
            this.runTest(testcase);
        }
        this.tearDown();
    }

    private runTest(testable: (typeof Testable)) {
        const testInstance = new testable();
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