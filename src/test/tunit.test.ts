import { assertEqual } from '../lib/assert';
import { ReportGenerator } from '../lib/report-generator';
import { TestResult } from '../lib/test-result';
import { BaseTestSuite } from '../lib/base-testsuite';
import { TUnit } from '../lib/tunit';
import { TestCase } from '../lib/testcase';
import { TestSuite } from '../lib/testsuite';

const TestCase1ForTUnitTest = TestCase('TestCase1ForTUnitTest', { async test() {} });
const TestCase2ForTUnitTest = TestCase('TestCase2ForTUnitTest', { async test() {} });
const TestSuiteForTUnitTest = TestSuite('TestSuiteForTUnitTest', {
    tests: [TestCase2ForTUnitTest],
});

export const TUnitTest = TestCase('TUnitTest', { async test() {
    const tunit = new TUnit([
        TestCase1ForTUnitTest, 
        TestSuiteForTUnitTest,
    ]);
    const testSuite = new BaseTestSuite([
        TestCase1ForTUnitTest,
        TestSuiteForTUnitTest,
    ]);
    await tunit.run();
    await testSuite.run();
    const tunitResult = tunit.getResult();
    const testSuiteResult = testSuite.getResult();

    tunitResult.forEach(test => {
        delete test.testName;
    });
    testSuiteResult.forEach(test => {
        delete test.testName;
    });

    assertEqual<TestResult[]>(testSuiteResult, tunitResult);
    const reportGenerator = new ReportGenerator();
    reportGenerator.addResult(...testSuiteResult);
    assertEqual<string>(reportGenerator.report, tunit.report);
}});
