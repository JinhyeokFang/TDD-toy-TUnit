import { assertEqual } from "../lib/assert";
import { ReportGenerator } from "../lib/report-generator";
import { TestCase } from "../lib/testcase";

export class ReportGeneratorTest extends TestCase {
    test() {
        const reportGenerator = new ReportGenerator();
        reportGenerator.addResult({
            testcaseName: 'TC1',
            isSuccess: true,
        });
        reportGenerator.addResult({
            testcaseName: 'TC2',
            isSuccess: false,
            cause: 'IT MUST BE FAILED',
        })
        assertEqual(reportGenerator.report, `
===============Test_Result===============
Summary:
    Total: 2
    Success: 1
    Fail: 1

TC1:
    Result: Success

TC2:
    Result: Fail
    Cause: IT MUST BE FAILED
`
        );
    }
}
