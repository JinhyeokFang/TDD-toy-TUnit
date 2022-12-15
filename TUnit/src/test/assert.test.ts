import { assertEqual, assertThrowError } from "../lib/assert";
import TestCase from "../lib/testcase";

export default class AssertTest extends TestCase {
    setUp(): void {};
    tearDown(): void {};
    test(): void {
        assertEqual('hi', 'hi');
        assertEqual({
            hi: 'Hello',
        }, {
            hi: 'Hello',
        });
        const ERROR_MESSAGE = '3 === 3 is false.';
        assertThrowError(() => {
            assertEqual(3, 4, ERROR_MESSAGE);
        }, 'assertEqualBoolean() should throw an error');
    }
}
