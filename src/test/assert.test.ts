import { assertEqual, assertThrowError } from "../lib/assert";
import { TestCase } from "../lib/testcase";
import { TestSuite } from "../lib/testsuite";

export class AssertTest extends TestSuite {
    constructor() {
        super([
            AssertEqualTest, 
            AssertThrowErrorTest,
        ]);
    }
}

class AssertEqualTest extends TestCase {
    async test() {
        assertEqual<string>('hi', 'hi');
        assertEqual<{hi: string}>({
            hi: 'Hello',
        }, {
            hi: 'Hello',
        });
    }
}

class AssertThrowErrorTest extends TestCase {
    async test() {
        const ERROR_MESSAGE = '3 === 3 is false.';
        assertThrowError(() => {
            assertEqual(3, 4, ERROR_MESSAGE);
        }, 'assertEqualBoolean() should throw an error');
    }
}
