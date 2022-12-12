import { assertEqualBoolean } from "../lib/assert";
import TestCase from "../lib/testcase";

class TestCaseTest extends TestCase {
    testMethod() {
        assertEqualBoolean(this.log.join() === 'test', true, 'Wrong Log');
    }
}

export default new TestCaseTest();