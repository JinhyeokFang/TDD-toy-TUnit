import { ReportGenerator } from "./report-generator";
import { Testable } from "./testable";
import { TestState } from "./teststate";
import { TestSuite } from "./testsuite";

export class TUnit extends TestSuite {
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
        if (tunitInstance.state === TestState.Failed)
            process.exit(1);
    }
}
