import ReportGenerator from '../lib/report-generator';
import TestSuite from '../lib/testsuite';
import AssertTest from './assert.test';
import ReportGeneratorTest from './report-generator.test';
import TestcaseTest from './testcase.test';
import TestsuiteTest from './testsuite.test';

class TUnitTest extends TestSuite {
    constructor() {
        super([
            TestcaseTest,
            AssertTest,
            TestsuiteTest,
            ReportGeneratorTest,
        ]);
    }

    resultReport() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...this.getResult());
        return reportGenerator.report;
    }
}

const bootstrap = () => {
    const tunitTest = new TUnitTest();
    tunitTest.run();
    console.log(tunitTest.resultReport());
}

bootstrap();
