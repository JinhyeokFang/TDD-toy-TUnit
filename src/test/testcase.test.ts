import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { BaseTestCase } from "../lib/base-testcase";
import { TestState } from "../lib/teststate";
import { BaseTestSuite } from "../lib/base-testsuite";
import { TestCase } from "../lib/testcase";
import { TestSuite } from "../lib/testsuite";

class TestCaseForTest extends BaseTestCase {
    logForTest: string[] = [];
    async test() {
        this.logForTest.push('test');
    }
    async setUp() {
        this.logForTest.push('setUp');
    }
    async tearDown() {
        this.logForTest.push('tearDown');
    }
}

class TestCaseForFail extends BaseTestCase {
    async test() {
        fail('ERROR');
    }
}

export const TestCaseTest = TestSuite('TestCaseTest', {
    tests: [
        TestCase('TestCase.run()', { async test() {
            const testCase = new TestCaseForTest();
            await testCase.run();
            assertEqual<string>(
                testCase.logForTest.join('-'), 
                'setUp-test-tearDown', 
                'Wrong Log'
            );
        }}),
        TestCase('TestCase.getResult()', { async test() {
            const tc2 = new TestCaseForFail('TestCase');
            try {
                await tc2.run();
            } catch {}
            const result = tc2.getResult();
            assertEqual<TestResult>(result[0], {
                testName: 'TestCase',
                isSuccess: false,
                cause: 'ERROR'
            });
        }}),
        TestCase('Testcase.state', { async test() {
            const successfulTest = new TestCaseForTest();
            assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
            await successfulTest.run();
            assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');
    
            const unsuccessfulTest = new TestCaseForFail();
            assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
            await unsuccessfulTest.run();
            assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
        }}),
    ]
});
