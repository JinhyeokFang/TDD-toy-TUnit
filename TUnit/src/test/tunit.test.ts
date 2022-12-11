import TestCase from '../lib/testcase'

new TestCase(() => {
    const testCase = new TestCase(() => {});
    console.log(testCase.log)
    testCase.test()
    console.log(testCase.log)
}).test();
