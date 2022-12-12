import assertEqualBoolean from '../lib/assert';
import TestCase from '../lib/testcase'

new TestCase(() => {
    const testCase = new TestCase(() => {});
    assertEqualBoolean(testCase.log.join() === '', true, 'Wrong Log');
    testCase.test()
    assertEqualBoolean(testCase.log.join() === 'test', true, 'Wrong Log');
}).test();

new TestCase(() => {
    assertEqualBoolean('hi' === 'hi', true);
    const ERROR_MESSAGE = '3 === 3 is false.';
    try {
        assertEqualBoolean(3 === 3, false, ERROR_MESSAGE);
    } catch (err) {
        assertEqualBoolean(
            err.message === ERROR_MESSAGE, 
            true,
            'assertEqualBoolean should have right error message',
        );
        return;
    }
    throw new Error('assertEqualBoolean() should throw an error');
}).test();
