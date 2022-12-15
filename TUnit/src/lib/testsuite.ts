import ReportGenerator from "./report-generator";
import TestCase from "./testcase";
import TestCaseResult from "./testcase-result";

export default class TestSuite {
    private testcases: (typeof TestCase)[] = [];
    private result: TestCaseResult[] = []; 

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
        this.addTestCaseResult(result)
    }

    private addTestCaseResult(testcaseResult: TestCaseResult) {
        this.result.push(testcaseResult);
    }

    getResult() {
        return {
            total: this.result.length,
            success: this.result.filter(r => r.isSuccess).length,
            fail: this.result.filter(r => !r.isSuccess).length,
        };
    }

    resultReport() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...this.result);
        return reportGenerator.report;
    }
}