import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import TestCase from "../lib/testcase";
import TestSuite from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TC3 extends TestCase { test() {} }

export default class TestSuiteTest extends TestCase {
    setUp() {}
    tearDown() {}
    test() {
        const testcases = [TC1, TC2, TC3];
        const testSuite = new TestSuite(testcases);
        testSuite.run();
        assertEqual(
            testSuite.resultReport(),
`
===============Test_Result===============
Summary:
    Total: 3
    Success: 2
    Fail: 1

TC1:
    Result: Success

TC2:
    Result: Fail
    Cause: IT MUST BE FAILED

TC3:
    Result: Success
`
        )
    }
}
