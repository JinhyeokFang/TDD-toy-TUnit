import ReportGenerator from "./report-generator";
import TestCase from "./testcase"
import TestResult from './test-result';
import Testable from "./testable";

export default class TestSuite implements Testable {
    private testcases: (typeof TestCase)[] = [];
    private result: TestResult[] = []; 

    constructor(testcases: (typeof TestCase)[]) {
        this.testcases = testcases;
    }

    run() {
        for (const testcase of this.testcases) {
            this.runTestCase(testcase);
        }
    }

    private runTestCase(testcase: (typeof TestCase)) {
        const tcInstance = new testcase();
        tcInstance.run();
        const result = tcInstance.getResult();
        this.addTestCaseResult(result[0]);
    }

    private addTestCaseResult(testcaseResult: TestResult) {
        this.result.push(testcaseResult);
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