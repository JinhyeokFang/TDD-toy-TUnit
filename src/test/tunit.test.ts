import { assertEqual } from '../lib/assert';
import { ReportGenerator } from '../lib/report-generator';
import { TestCase } from '../lib/testcase';
import { TestSuite } from '../lib/testsuite';
import { TUnit } from '../lib/tunit';

class TestCase1ForTUnitTest extends TestCase { test() {} }
class TestCase2ForTUnitTest extends TestCase { test() {} }
class TestSuiteForTUnitTest extends TestSuite {
    constructor() { super([ TestCase2ForTUnitTest ]); }
}

export class TUnitTest extends TestCase {
    test() {
        const tunit = new TUnit([
            TestCase1ForTUnitTest, 
            TestSuiteForTUnitTest,
        ]);
        const testSuite = new TestSuite([
            TestCase1ForTUnitTest,
            TestSuiteForTUnitTest,
        ]);
        tunit.run();
        testSuite.run();
        const tunitResult = tunit.getResult();
        const testSuiteResult = testSuite.getResult();

        tunitResult.forEach(test => {
            delete test.testcaseName;
        });
        testSuiteResult.forEach(test => {
            delete test.testcaseName;
        });

        assertEqual(testSuiteResult, tunitResult);
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...testSuiteResult);
        assertEqual(reportGenerator.report, tunit.report);
    }
}
