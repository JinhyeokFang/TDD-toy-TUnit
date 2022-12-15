import ReportGenerator from "./report-generator";
import TestCase from "./testcase"
import TestResult from './test-result';
import Testable from "./testable";

export default class TestSuite extends Testable {
    private testcases: (typeof Testable)[] = [];
    private result: TestResult[] = []; 

    constructor(testcases: (typeof Testable)[]) {
        super();
        this.testcases = testcases;
    }

    run() {
        for (const testcase of this.testcases) {
            this.runTestCase(testcase);
        }
    }

    private runTestCase(testable: (typeof Testable)) {
        const testInstance = new testable();
        testInstance.run();
        const result = testInstance.getResult();
        this.addTestCaseResult(result);
    }

    private addTestCaseResult(testcaseResult: TestResult[]) {
        this.result = this.result.concat(testcaseResult);
    }

    resultReport() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...this.result);
        return reportGenerator.report;
    }

    getResult(): TestResult[] {
        return this.result;
    }
}