import { assertEqualBoolean, assertEqualNumber } from "../lib/assert";
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
        assertEqualNumber(
            testSuite.getResult().success,
            2
        );
        assertEqualNumber(
            testSuite.getResult().fail,
            1
        );
        assertEqualNumber(
            testSuite.getResult().total,
            3
        );
    }
}
