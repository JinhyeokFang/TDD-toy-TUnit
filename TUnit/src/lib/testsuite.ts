import TestCase from "./testcase";

export default class TestSuite {
    private testcases: (typeof TestCase)[] = [];
    private result = {
        total: 0, success: 0, fail: 0,
    }

    constructor(testcases: (typeof TestCase)[]) {
        this.testcases = testcases;
    }

    run() {
        this.clearResult();
        for (const testcase of this.testcases) {
            const tcInstance = new testcase();
            this.runTestCase(tcInstance);
        }
    }

    private runTestCase(testcase: TestCase) {
        try {
            const isSuccess = this.runTestCaseAndReturnTestResult(testcase);
            this.countResult(isSuccess);
        } catch {
            this.countResult(false);
        }
    }

    private clearResult() {
        this.result = {
            total: 0,
            success: 0,
            fail: 0,
        }
    }

    private runTestCaseAndReturnTestResult(testcase: TestCase): boolean {
        testcase.run();
        const isSuccess = testcase.log[2] == "tearDown";
        return isSuccess;
    }

    private countResult(isSuccess) {
        this.result.total += 1;
        if (isSuccess)
            this.result.success += 1;
        else
            this.result.fail += 1;
    }

    getResult() {
        return this.result;
    }
}