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
}