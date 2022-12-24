import { TestResult } from './test-result';
import { Testable } from './testable';

export class TestCase extends Testable {
    private result: TestResult[] = [];

    constructor() {
        super();
    }
    
    protected async setUp() {};
    protected async test() {
        throw new Error('testcase must define test()')
    };
    protected async tearDown() {};

    async run() {
        await this.setUp();
        this.result = [];
        try {
            await this.test();
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
        await this.tearDown();
    }

    getResult() {
        return this.result;
    }
}
