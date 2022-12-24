import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { BaseTestCase } from "../lib/base-testcase";
import { TestState } from "../lib/teststate";
import { TestSuite } from "../lib/testsuite";
import { TestCase } from "../lib/testcase";

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

export class TestCaseTest extends TestSuite {
    static TestCaseLogTest = TestCase('TestCase.run()', async () => {
        const testCase = new TestCaseForTest();
        await testCase.run();
        assertEqual<string>(
            testCase.logForTest.join('-'), 
            'setUp-test-tearDown', 
            'Wrong Log'
        );
    });

    static TestCaseResultTest = TestCase('TestCase.getResult()', async () => {
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
    })

    static TestcaseStateTest = TestCase('Testcase.state', async () => {
        const successfulTest = new TestCaseForTest();
        assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        await successfulTest.run();
        assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new TestCaseForFail();
        assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        await unsuccessfulTest.run();
        assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    });

    constructor() {
        super([
            TestCaseTest.TestCaseLogTest, 
            TestCaseTest.TestCaseResultTest,
            TestCaseTest.TestcaseStateTest,
        ])
    }
}

