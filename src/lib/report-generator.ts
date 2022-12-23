import { ResultSummarizer } from './result-summarizer';
import { TestResult } from './test-result';

export class ReportGenerator {
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
        const resultSummarizer = new ResultSummarizer();
        resultSummarizer.addResult(...this.result);
        const resultSummary = resultSummarizer.summary;
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
            resultDetail += this.getTestReport(testcaseResult);
        }
        return resultDetail;
    }

    private getTestReport(testcaseResult: TestResult) {
        if (testcaseResult.children)
            return this.getReportsFromChildren(testcaseResult);
        if (testcaseResult.isSuccess)
            return this.getSuccessReport(testcaseResult);
        return this.getFailReport(testcaseResult);
    }

    private getReportsFromChildren(testcaseResult: TestResult) {
        let report = `
${testcaseResult.testName}:
    Result: ${testcaseResult.isSuccess ? 'Success' : 'Fail'}`;
        for (const test of testcaseResult.children) {
            report += this.getChildReport(test);
        }
        return report;
    }

    private getChildReport(childTestResult: TestResult) {
        let childReport = this.getTestReport(childTestResult);
        childReport = childReport
            .split('\n')
            .join('\n    ');
        return childReport;
    }

    private getSuccessReport(testcaseResult: TestResult) {
        return `
${testcaseResult.testName}:
    Result: Success
`;
    }

    private getFailReport(testcaseResult: TestResult) {
        return `
${testcaseResult.testName}:
    Result: Fail
    Cause: ${testcaseResult.cause}
`;
    }
}