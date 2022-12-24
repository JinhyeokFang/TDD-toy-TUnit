import { TestResult } from './test-result';
import { Testable } from './testable';

export class TestCase extends Testable {
    private result: TestResult[] = [];
    private testName: string;

    constructor(testName?: string) {
        super();
        this.testName = testName || TestCase.getTestName(this);
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
                testName: this.testName,
            });
        } catch (error) {
            this.result.push({
                isSuccess: false,
                testName: this.testName,
                cause: error.message,
            });
        }
        await this.tearDown();
    }

    getResult() {
        return this.result;
    }
}
