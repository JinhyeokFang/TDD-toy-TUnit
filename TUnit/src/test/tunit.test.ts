import TestSuite from '../lib/testsuite';
import AssertTest from './assert.test';
import ReportGeneratorTest from './report-generator.test';
import TestcaseTest from './testcase.test';
import TestsuiteTest from './testsuite.test';

const test = () => {
    const testSuite = new TestSuite([
        TestcaseTest,
        AssertTest,
        TestsuiteTest,
        ReportGeneratorTest,
    ]);
    testSuite.run();
    console.log(testSuite.resultReport());
}

test();
