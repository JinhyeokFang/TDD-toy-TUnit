import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import TestCase from "../lib/testcase";

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

export default class TestCaseTest extends TestCase {
    setUp(): void {};
    tearDown(): void {};
    test() {
        const tc = new TestCaseForTest();
        tc.run();
        assertEqual(tc.logForTest.join('-'), 'setUp-test-tearDown', 'Wrong Log');

        const tc2 = new TestCaseForFail();
        try {
            tc2.run();
        } catch {}
        const result = tc2.getResult();
        assertEqual(result, {
            testcaseName: 'TestCaseForFail',
            isSuccess: false,
            cause: 'ERROR'
        });
    }
}
