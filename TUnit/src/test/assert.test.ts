import { assertEqualBoolean, assertEqualString } from "../lib/assert";
import TestCase from "../lib/testcase";

class AssertTest extends TestCase {
    test(): void {
        assertEqualString('hi', 'hi');
        const ERROR_MESSAGE = '3 === 3 is false.';
        try {
            assertEqualString('3', '4', ERROR_MESSAGE);
        } catch (err) {
            assertEqualBoolean(
                err.message === ERROR_MESSAGE, 
                true,
                'assertEqualBoolean should have right error message',
            );
            return;
        }
        throw new Error('assertEqualBoolean() should throw an error');
    }
}

export default new AssertTest();
