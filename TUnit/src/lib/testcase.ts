import TestResult from './test-result';
import Testable from './testable';

export default class TestCase implements Testable {
    private result: TestResult = {
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
        return [this.result];
    }
}