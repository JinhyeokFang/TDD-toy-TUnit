import { assertEqual, assertThrowError } from "../lib/assert";
import { TestCase } from "../lib/testcase";
import { TestSuite } from "../lib/testsuite";

export const AssertTest = TestSuite('AssertTest', {
    tests: [
        TestCase('assertEqual()', { async test() {
            assertEqual<string>('hi', 'hi');
            assertEqual<{hi: string}>({
                hi: 'Hello',
            }, {
                hi: 'Hello',
            });
        }}),
        TestCase('assertThrowError()', { async test() {
            const ERROR_MESSAGE = '3 === 3 is false.';
            assertThrowError(() => {
                assertEqual(3, 4, ERROR_MESSAGE);
            }, 'assertEqualBoolean() should throw an error');
        }}),
    ],
})
