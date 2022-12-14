import { assertEqualBoolean, assertEqualString } from "../lib/assert";
import TestCase from "../lib/testcase";
import TestSuite from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    assertEqualBoolean(true, false, 'FAILED');
} }
class TC3 extends TestCase { test() {} }

export default class TestSuiteTest extends TestCase {
    setUp() {}
    tearDown() {}
    test() {
        const testcases = [TC1, TC2, TC3];
        const testSuite = new TestSuite(testcases);
        testSuite.run();
        assertEqualString(
            testSuite.getResult().success.toString(),
            "2"
        );
        assertEqualString(
            testSuite.getResult().fail.toString(),
            "1"
        );
        assertEqualString(
            testSuite.getResult().total.toString(),
            "3"
        );
    }
}
