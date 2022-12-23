import { TestResult } from './test-result';

export class ResultSummarizer {
    private result: TestResult[] = [];

    addResult(...testcaseResult: TestResult[]) {
        this.result = this.result.concat(testcaseResult);
    }
    
    get summary() {
        return {
            total: this.result.length,
            success: this.result.filter(r => r.isSuccess).length,
            fail: this.result.filter(r => !r.isSuccess).length,
        };
    }
}
