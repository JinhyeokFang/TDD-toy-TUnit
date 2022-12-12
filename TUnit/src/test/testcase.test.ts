import { assertEqualBoolean } from "../lib/assert";
import TestCase from "../lib/testcase";

class TestCaseTest extends TestCase {
    test() {
        assertEqualBoolean(this.log.join() === 'test', true, 'Wrong Log');
    }
}

export default new TestCaseTest();