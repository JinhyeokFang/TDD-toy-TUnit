import TestResult from './test-result';
import Testable from './testable';

export default class TestCase extends Testable {
    private testcaseName: string;
    private result: TestResult[] = [];

    constructor() {
        super();
        this.testcaseName = this.constructor
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
        this.result = [];
        try {
            this.test();
            this.result.push({
                isSuccess: true,
                testcaseName: this.testcaseName,
            });
        } catch (error) {
            this.result.push({
                isSuccess: true,
                testcaseName: this.testcaseName,
                cause: error.message,
            });
        }
        this.tearDown();
    }

    getResult() {
        return this.result;
    }
}