import { TestResult } from './test-result';

export class ResultSummarizer {
    private result: TestResult[] = [];

    addResult(...testcaseResult: TestResult[]) {
        for (const test of testcaseResult) {
            if (test.children)
                this.splitAndAddTestResult(test);
            else
                this.result.push(test);
        }
    }

    private splitAndAddTestResult(result: TestResult) {
        const resultSummarizer = new ResultSummarizer();
        resultSummarizer.addResult(...result.children);
        this.result = this.result.concat(resultSummarizer.result);
    }
    
    get summary() {
        return {
            total: this.result.length,
            success: this.result.filter(r => r.isSuccess).length,
            fail: this.result.filter(r => !r.isSuccess).length,
        };
    }
}
