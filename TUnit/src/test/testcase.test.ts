import { assertEqualString } from "../lib/assert";
import TestCase from "../lib/testcase";

class TestCaseForTest extends TestCase {
    test() {}
}

export default class TestCaseTest extends TestCase {
    setUp(): void {};
    tearDown(): void {};
    test() {
        const tc = new TestCaseForTest();
        tc.run();
        assertEqualString(tc.log.join('-'), 'setUp-test-tearDown', 'Wrong Log');
    }
}
