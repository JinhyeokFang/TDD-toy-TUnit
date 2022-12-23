import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { TestCase } from "../lib/testcase";
import { TestState } from "../lib/teststate";
import { TestSuite } from "../lib/testsuite";

class TestCaseForTest extends TestCase {
    logForTest: string[] = [];
    test() {
        this.logForTest.push('test');
    }
    setUp() {
        this.logForTest.push('setUp');
    }
    tearDown() {
        this.logForTest.push('tearDown');
    }
}
class TestCaseForFail extends TestCase {
    test() {
        fail('ERROR');
    }
}

export class TestCaseTest extends TestSuite {
    constructor() {
        super([
            TestCaseLogTest, 
            TestCaseResultTest,
            TestcaseStateTest,
        ])
    }
}

class TestCaseLogTest extends TestCase {
    test() {
        const tc = new TestCaseForTest();
        tc.run();
        assertEqual<string>(tc.logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');
    }
}

class TestCaseResultTest extends TestCase {
    test() {
        const tc2 = new TestCaseForFail();
        try {
            tc2.run();
        } catch {}
        const result = tc2.getResult();
        assertEqual<TestResult>(result[0], {
            testName: 'TestCaseForFail',
            isSuccess: false,
            cause: 'ERROR'
        });
    }
}

class TestcaseStateTest extends TestCase {
    test() {
        const successfulTest = new TestCaseForTest();
        assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        successfulTest.run();
        assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new TestCaseForFail();
        assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        unsuccessfulTest.run();
        assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    }
}
