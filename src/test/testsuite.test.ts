import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import { TestResult } from "../lib/test-result";
import { TestCase } from "../lib/testcase";
import { TestState } from "../lib/teststate";
import { TestSuite } from "../lib/testsuite";

class TC1 extends TestCase { async test() {} }
class TC2 extends TestCase { async test() {
    fail('IT MUST BE FAILED');
} }
class TC3 extends TestCase { async test() {} }
class TC4 extends TestCase { async test() {
    fail('IT MUST BE FAILED');
} }
class TS1 extends TestSuite {
    logForTest: string[] = [];

    async setUp() {
        this.logForTest.push('setUp');          
    }
    constructor() {
        super([TC3, TC4]);
    }
    async tearDown() {
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
    async test() {
        const tests = [TC1, TC2, new TC3(), TS1];
        const testSuite = new TestSuite(tests);
        await testSuite.run();
        const result = testSuite.getResult()[0].children;
        const testSuiteChildren = result[3].children;
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
            result[2],
            {
                testName: 'TC3',
                isSuccess: true,
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
    async test() {
        const testSuite: TestSuite = new TS1();
        await testSuite.run();
        const logForTest = (testSuite as TS1).logForTest;
        assertEqual<string>(logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');
    }
}

class TestsuiteStateTest extends TestCase {
    async test() {
        const successfulTest = new TS2();
        assertEqual<TestState>(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        await successfulTest.run();
        assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new TS1();
        assertEqual<TestState>(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        await unsuccessfulTest.run();
        assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    }
}
