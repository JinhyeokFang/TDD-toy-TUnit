import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { BaseTestCase } from "../lib/base-testcase";
import { TestState } from "../lib/teststate";
import { BaseTestSuite } from "../lib/base-testsuite";
import { TestCase } from "../lib/testcase";
import { TestSuite } from "../lib/testsuite";

const TestCase1 = TestCase('TestCase1', { async test() {} });
const TestCase2 = TestCase('TestCase2', { async test() {
    fail('IT MUST BE FAILED');
}});
class TestCase3 extends BaseTestCase { async test() {} }
const TestSuite1 = TestSuite('TestSuite1', {
    tests: [TestCase3],
});
class TestSuite2 extends BaseTestSuite {
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

export const TestSuiteTest = TestSuite('TestSuiteTest', {
    tests: [
        TestCase('TestSuite.getResult()', { async test() {
            const tests = [TestCase1, TestCase2, TestSuite1];
            const testSuite = new BaseTestSuite(tests, 'TestSuite');
            await testSuite.run();
            assertEqual('TestSuite', testSuite.getResult()[0].testName);
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
        }}),
        TestCase('TestSuite.run()', { async test() {
            const testSuite = new TestSuite2();
            await testSuite.run();
            const logForTest = testSuite.logForTest;
            assertEqual<string>(logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');
        }}),
        TestCase('TestSuite.state', { async test() {
            const successfulTest = TestCase('', { async test() {} });
            assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
            await successfulTest.run();
            assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');
    
            const unsuccessfulTest = TestCase('', { async test() {
                fail('');
            }});
            assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
            await unsuccessfulTest.run();
            assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
        }}),
    ]
});
