import { ReportGenerator } from "./report-generator";
import { TestState } from "./teststate";
import { Test, BaseTestSuite } from "./base-testsuite";

export class TUnit extends BaseTestSuite {
    constructor(tests: Test[]) {
        super(tests, 'TUnit');
    }

    get report() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult(...this.getResult());
        return reportGenerator.report;
    }

    static async test(
        tests: Test[], 
        logger: (string) => void = console.log
    ) {
        const tunitInstance = new TUnit(tests);
        await tunitInstance.run();
        logger(tunitInstance.report);
        if (tunitInstance.state === TestState.Failed)
            process.exit(1);
    }
}
