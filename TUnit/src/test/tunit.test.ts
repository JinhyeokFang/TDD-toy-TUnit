import TestCase from '../lib/testcase'

new TestCase(() => {
    const testCase = new TestCase(() => {});
    if (testCase.log.join() !== '')
        throw new Error('Wrong Log');
    testCase.test()
    if (testCase.log.join() !== 'test')
        throw new Error('Wrong Log');
}).test();
