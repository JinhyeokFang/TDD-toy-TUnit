import assertEqualBoolean from '../lib/assert';
import TestCase from '../lib/testcase'

new TestCase(() => {
    const testCase = new TestCase(() => {});
    if (testCase.log.join() !== '')
        throw new Error('Wrong Log');
    testCase.test()
    if (testCase.log.join() !== 'test')
        throw new Error('Wrong Log');
}).test();

new TestCase(() => {
    assertEqualBoolean('hi' === 'hi', true);
    try {
        assertEqualBoolean(3 === 3, false);
    } catch {
        return;
    }
    throw new Error('assertEqualBoolean() should throw an error');
}).test();
