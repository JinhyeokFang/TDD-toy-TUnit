import TestCase from "./testcase";

interface TestCaseResult {
    testcaseName: string;
    isSuccess: boolean;
    cause?: string;
}

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
        const testcaseName = testcase.toString().split(' ')[1].slice(0, -2);
        try {
            const tcInstance = new testcase();
            tcInstance.run();
            this.addTestCaseResult(testcaseName, true);
        } catch (error) {
            this.addTestCaseResult(testcaseName, false, error.message);
        }
    }

    private addTestCaseResult(
        testcaseName: string, 
        isSuccess: boolean, 
        cause?: string) {
            this.result.push({
                testcaseName,
                isSuccess,
                cause,
            });
    }

    getResult() {
        return {
            total: this.result.length,
            success: this.result.filter(r => r.isSuccess).length,
            fail: this.result.filter(r => !r.isSuccess).length,
        };
    }

    resultReport() {
        const reportSummary = this.getResultSummaryReport();
        const resultDetail = this.getTestSuiteDetailResultReport();
        return reportSummary + resultDetail;
    }

    private getResultSummaryReport() {
        const resultSummary = this.getResult();
        const reportSummary = `
===============Test_Result===============
Summary:
    Total: ${resultSummary.total}
    Success: ${resultSummary.success}
    Fail: ${resultSummary.fail}
`;
        return reportSummary;
    }

    private getTestSuiteDetailResultReport() {
        let resultDetail = '';
        for (const testcaseResult of this.result) {
            resultDetail += this.getTestCaseReport(testcaseResult);
        }
        return resultDetail;
    }

    private getTestCaseReport(testcaseResult: TestCaseResult) {
        if (testcaseResult.isSuccess)
            return this.getSuccessReport(testcaseResult);
        return this.getFailReport(testcaseResult);
    }

    private getSuccessReport(testcaseResult: TestCaseResult) {
        return `
${testcaseResult.testcaseName}:
    Result: Success
`;
    }

    private getFailReport(testcaseResult: TestCaseResult) {
        return `
${testcaseResult.testcaseName}:
    Result: Fail
    Cause: ${testcaseResult.cause}
`;
    }
}