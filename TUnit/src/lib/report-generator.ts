import TestResult from './test-result';

export default class ReportGenerator {
    private result: TestResult[] = [];

    addResult(...testcaseResult: TestResult[]) {
        this.result = this.result.concat(testcaseResult);
    }
    
    get report() {
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

    private getTestCaseReport(testcaseResult: TestResult) {
        if (testcaseResult.isSuccess)
            return this.getSuccessReport(testcaseResult);
        return this.getFailReport(testcaseResult);
    }

    private getSuccessReport(testcaseResult: TestResult) {
        return `
${testcaseResult.testcaseName}:
    Result: Success
`;
    }

    private getFailReport(testcaseResult: TestResult) {
        return `
${testcaseResult.testcaseName}:
    Result: Fail
    Cause: ${testcaseResult.cause}
`;
    }

    private getResult() {
        return {
            total: this.result.length,
            success: this.result.filter(r => r.isSuccess).length,
            fail: this.result.filter(r => !r.isSuccess).length,
        };
    }
}