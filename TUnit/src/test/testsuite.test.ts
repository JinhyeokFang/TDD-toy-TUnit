import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import TestCase from "../lib/testcase";
import TestSuite from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    fail();
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
            testSuite.getResult(),
            {
                total: 3,
                success: 2,
                fail: 1,
            }
        );
    }
}
