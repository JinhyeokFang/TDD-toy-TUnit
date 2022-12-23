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
        });
        reportGenerator.addResult({
            testcaseName: 'TS',
            isSuccess: true,
            children: [{
                testcaseName: 'TC3',
                isSuccess: true,
            },
            {
                testcaseName: 'TC4',
                isSuccess: true,
            }],
        });
        assertEqual(reportGenerator.report, `
===============Test_Result===============
Summary:
    Total: 4
    Success: 3
    Fail: 1

TC1:
    Result: Success

TC2:
    Result: Fail
    Cause: IT MUST BE FAILED

TS:
    Result: Success
    TC3:
        Result: Success
    
    TC4:
        Result: Success
    `
        );
    }
}
