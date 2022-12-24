import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { BaseTestCase } from "../lib/base-testcase";
import { TestState } from "../lib/teststate";
import { TestSuite } from "../lib/testsuite";
import { TestCase } from "../lib/testcase";

const TestCase1 = TestCase('TestCase1', async () => {});
const TestCase2 = TestCase('TestCase2', async () => {
    fail('IT MUST BE FAILED');
});
class TestCase3 extends BaseTestCase { async test() {} }
class TestSuite1 extends TestSuite {
    logForTest: string[] = [];

    async setUp() {
        this.logForTest.push('setUp');          
    }
    constructor() {
        super([TestCase3]);
    }
    async tearDown() {
        if (this.getResult().length > 0)
            this.logForTest.push('test');
        this.logForTest.push('tearDown');
    }
}

export class TestSuiteTest extends TestSuite {
    static TestSuiteTestMethodTest = TestCase('testSuite.getResult()', async () => {
        const tests = [TestCase1, TestCase2, TestSuite1];
        const testSuite = new TestSuite(tests);
        await testSuite.run();
        const result = testSuite.getResult()[0].children;
        const testSuiteChildren = result.find(test => test.testName === 'TestSuite1').children;
        assertEqual<TestResult>(
            result.find(test => test.testName === 'TestCase1'),
            {
                testName: 'TestCase1',
                isSuccess: true,
            }
        );
        assertEqual<TestResult>(
            result.find(test => test.testName === 'TestCase2'),
            {
                testName: 'TestCase2',
                isSuccess: false,
                cause: 'IT MUST BE FAILED'
            }
        );
        assertEqual<TestResult>(
            testSuiteChildren.find(test => test.testName === 'TestCase3'),
            {
                testName: 'TestCase3',
                isSuccess: true,
            }
        );
    });

    static TestSuiteLogTest = TestCase('TestSuite.run()', async () => {
        const testSuite: TestSuite = new TestSuite1();
        await testSuite.run();
        const logForTest = (testSuite as TestSuite1).logForTest;
        assertEqual<string>(logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');
    });

    static TestSuiteStateTest = TestCase('TestSuite.state', async () => {
        const successfulTest = TestCase('', async () => {});
        assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        await successfulTest.run();
        assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = TestCase('', async () => {
            fail('');
        });
        assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        await unsuccessfulTest.run();
        assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    });

    constructor() {
        super([
            TestSuiteTest.TestSuiteTestMethodTest,
            TestSuiteTest.TestSuiteLogTest, 
            TestSuiteTest.TestSuiteStateTest,
        ])
    }
}
