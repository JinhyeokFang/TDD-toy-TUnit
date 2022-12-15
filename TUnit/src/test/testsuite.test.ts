import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import TestCase from "../lib/testcase";
import TestSuite from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TC3 extends TestCase { test() {} }
class TC4 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TS extends TestSuite { 
    constructor() {
        super([TC3, TC4]);
    }
}

export default class TestSuiteTest extends TestCase {
    test() {
        const tests = [TC1, TC2, TS];
        const testSuite = new TestSuite(tests);
        testSuite.run();
        assertEqual(
            testSuite.resultReport(),
`
===============Test_Result===============
Summary:
    Total: 4
    Success: 2
    Fail: 2

TC1:
    Result: Success

TC2:
    Result: Fail
    Cause: IT MUST BE FAILED

TC3:
    Result: Success

TC4:
    Result: Fail
    Cause: IT MUST BE FAILED
`
        )
    }
}
