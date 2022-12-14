import { assertEqualBoolean, assertEqualNumber, assertEqualString } from "../lib/assert";
import TestCase from "../lib/testcase";

export default class AssertTest extends TestCase {
    setUp(): void {};
    tearDown(): void {};
    test(): void {
        assertEqualString('hi', 'hi');
        const ERROR_MESSAGE = '3 === 3 is false.';
        try {
            assertEqualNumber(3, 4, ERROR_MESSAGE);
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
