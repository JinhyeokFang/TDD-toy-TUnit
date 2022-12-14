import { isEqual } from "lodash";
import { assertEqual } from "../lib/assert";
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
        try {
            assertEqual(3, 4, ERROR_MESSAGE);
        } catch (err) {
            assertEqual(
                err.message === ERROR_MESSAGE, 
                true,
                'assertEqualBoolean should have right error message',
            );
            return;
        }
        throw new Error('assertEqualBoolean() should throw an error');
    }
}
