import TestResult from './test-result';
import Testable from './testable';

export default class TestCase extends Testable {
    private result: TestResult = {
        testcaseName: '',
        isSuccess: false,
    }

    constructor() {
        super();
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
            this.testSucceeded();
        } catch (error) {
            this.result.isSuccess = false;
            this.result.cause = error.message;
            this.testFailed();
        }
        this.tearDown();
    }

    getResult() {
        return [this.result];
    }
}