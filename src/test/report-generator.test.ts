import { assertEqual } from "../lib/assert";
import { ReportGenerator } from "../lib/report-generator";
import { TestCase } from "../lib/testcase";

export const ReportGeneratorTest = TestCase('ReportGenerator', { async test() {
    const reportGenerator = new ReportGenerator();
    reportGenerator.addResult({
        testName: 'TC1',
        isSuccess: true,
    });
    reportGenerator.addResult({
        testName: 'TC2',
        isSuccess: false,
        cause: 'IT MUST BE FAILED',
    });
    reportGenerator.addResult({
        testName: 'TS',
        isSuccess: true,
        children: [{
            testName: 'TC3',
            isSuccess: true,
        },
        {
            testName: 'TC4',
            isSuccess: true,
        }],
    });
    assertEqual<string>(reportGenerator.report, `
TUnit Test Result
Summary:
    Total: 4
    Success: 3
    Fail: 1

TC1: Success

TC2: Fail
    Cause: IT MUST BE FAILED

TS: Success
    TC3: Success
    
    TC4: Success
    `
    );
}});
