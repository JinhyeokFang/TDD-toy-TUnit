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

    static async test(
        tests: (typeof Testable)[], 
        logger: (string) => void = console.log
    ) {
        const tunitInstance = new TUnit(tests);
        await tunitInstance.run();
        logger(tunitInstance.report);
        if (tunitInstance.state === TestState.Failed)
            process.exit(1);
    }
}
