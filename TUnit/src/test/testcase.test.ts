import { assertEqualBoolean, assertEqualString } from "../lib/assert";
import TestCase from "../lib/testcase";

class TestCaseTest extends TestCase {
    test() {
        assertEqualString(this.log.join(), 'test', 'Wrong Log');
    }
}

export default new TestCaseTest();