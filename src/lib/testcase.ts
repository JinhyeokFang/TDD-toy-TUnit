import { TestResult } from './test-result';
import { Testable } from './testable';

export class TestCase extends Testable {
    private result: TestResult[] = [];

    constructor() {
        super();
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
                testName: Testable.getTestName(this),
            });
        } catch (error) {
            this.result.push({
                isSuccess: false,
                testName: Testable.getTestName(this),
                cause: error.message,
            });
        }
        this.tearDown();
    }

    getResult() {
        return this.result;
    }
}
