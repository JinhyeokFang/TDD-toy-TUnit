import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { TestCase } from "../lib/testcase";
import { TestState } from "../lib/teststate";
import { TestSuite } from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TC3 extends TestCase { test() {} }
class TC4 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TS1 extends TestSuite {
    logForTest: string[] = [];

    setUp() {
        this.logForTest.push('setUp');          
    }
    constructor() {
        super([TC3, TC4]);
    }
    tearDown() {
        if (this.getResult().length > 0)
            this.logForTest.push('test');
        this.logForTest.push('tearDown');
    }
}
class TS2 extends TestSuite {
    constructor() {
        super([TC3]);
    }
}

export class TestSuiteTest extends TestSuite {
    constructor() {
        super([
            TestSuiteTestMethodTest, TestSuiteLogTest, TestsuiteStateTest,
        ])
    }
}

class TestSuiteTestMethodTest extends TestCase {
    test() {
        const tests = [TC1, TC2, TS1];
        const testSuite = new TestSuite(tests);
        testSuite.run();
        const result = testSuite.getResult()[0].children;
        const testSuiteChildren = result[2].children;
        assertEqual<TestResult>(
            result[0],
            {
                testName: 'TC1',
                isSuccess: true,
            }
        );
        assertEqual<TestResult>(
            result[1],
            {
                testName: 'TC2',
                isSuccess: false,
                cause: 'IT MUST BE FAILED'
            }
        );
        assertEqual<TestResult>(
            testSuiteChildren[0],
            {
                testName: 'TC3',
                isSuccess: true,
            }
        );
        assertEqual<TestResult>(
            testSuiteChildren[1],
            {
                testName: 'TC4',
                isSuccess: false,
                cause: 'IT MUST BE FAILED'
            }
        );
    }
}

class TestSuiteLogTest extends TestCase {
    test() {
        const testSuite: TestSuite = new TS1();
        testSuite.run();
        const logForTest = (testSuite as TS1).logForTest;
        assertEqual<string>(logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');
    }
}

class TestsuiteStateTest extends TestCase {
    test() {
        const successfulTest = new TS2();
        assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        successfulTest.run();
        assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new TS1();
        assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        unsuccessfulTest.run();
        assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    }
}
