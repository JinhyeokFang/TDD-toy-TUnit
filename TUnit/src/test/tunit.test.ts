import TestSuite from '../lib/testsuite';
import assertTest from './assert.test';
import testcaseTest from './testcase.test';
import testsuiteTest from './testsuite.test';

const test = () => {
    const testSuite = new TestSuite([
        testcaseTest,
        assertTest,
        testsuiteTest,
    ]);
    testSuite.run();
    console.log(testSuite.getResult());
}

test();
