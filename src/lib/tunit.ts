import ReportGenerator from "./report-generator";
import Testable from "./testable";
import TestSuite from "./testsuite";

export default class TUnit extends TestSuite {
    constructor(tests: (typeof Testable)[]) {
        super(tests);
    }

    get report() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...this.getResult());
        return reportGenerator.report;
    }

    static test(tests: (typeof Testable)[]) {
        const tunitInstance = new TUnit(tests);
        tunitInstance.run();
        console.log(tunitInstance.report);
    }
}
