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
    test(): void {
        assertEqual('hi', 'hi');
        assertEqual({
            hi: 'Hello',
        }, {
            hi: 'Hello',
        });
    }
}

class AssertThrowErrorTest extends TestCase {
    test(): void {
        const ERROR_MESSAGE = '3 === 3 is false.';
        assertThrowError(() => {
            assertEqual(3, 4, ERROR_MESSAGE);
        }, 'assertEqualBoolean() should throw an error');
    }
}
