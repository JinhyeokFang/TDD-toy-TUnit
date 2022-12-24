import { assertEqual, assertThrowError } from "../lib/assert";
import { TestCase } from "../lib/testcase";
import { TestSuite } from "../lib/testsuite";

export class AssertTest extends TestSuite {
    static assertEqualTest = TestCase('assertEqual()', { async test() {
        assertEqual<string>('hi', 'hi');
        assertEqual<{hi: string}>({
            hi: 'Hello',
        }, {
            hi: 'Hello',
        });
    }});

    static assertThrowErrorTest = TestCase('assertThrowError()', { async test() {
        const ERROR_MESSAGE = '3 === 3 is false.';
        assertThrowError(() => {
            assertEqual(3, 4, ERROR_MESSAGE);
        }, 'assertEqualBoolean() should throw an error');
    }});

    constructor() {
        super([
            AssertTest.assertEqualTest, 
            AssertTest.assertThrowErrorTest,
        ]);
    }
}
