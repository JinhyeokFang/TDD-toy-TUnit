import TestCaseResult from "./testcase-result";

export default class TestCase {
    private result: TestCaseResult = {
        testcaseName: '',
        isSuccess: false,
    }

    constructor() {
        this.result.testcaseName = this.constructor
            .toString()
            .split(' ')[1]
            .slice(0, -2);
    }
    
    protected setUp() {};
    protected test() {
        throw new Error('testcase must define test()')
    };
    protected tearDown() {};

    run() {
        this.setUp();
        try {
            this.test();
            this.result.isSuccess = true;
        } catch (error) {
            this.result.isSuccess = false;
            this.result.cause = error.message;
        }
        this.tearDown();
    }

    getResult() {
        return this.result;
    }
}