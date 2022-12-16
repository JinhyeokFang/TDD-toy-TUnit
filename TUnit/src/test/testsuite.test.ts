import { assertEqual } from "../lib/assert";
import { fail } from "../lib/fail";
import ReportGenerator from "../lib/report-generator";
import TestCase from "../lib/testcase";
import TestSuite from "../lib/testsuite";

class TC1 extends TestCase { test() {} }
class TC2 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TC3 extends TestCase { test() {} }
class TC4 extends TestCase { test() {
    fail('IT MUST BE FAILED');
} }
class TS extends TestSuite { 
    constructor() {
        super([TC3, TC4]);
    }
}

export default class TestSuiteTest extends TestCase {
    test() {
        const tests = [TC1, TC2, TS];
        const testSuite = new TestSuite(tests);
        testSuite.run();
        const result = testSuite.getResult();
        assertEqual(
            result[0],
            {
                testcaseName: 'TC1',
                isSuccess: true,
            }
        );
        assertEqual(
            result[1],
            {
                testcaseName: 'TC2',
                isSuccess: false,
                cause: 'IT MUST BE FAILED'
            }
        );
        assertEqual(
            result[2],
            {
                testcaseName: 'TC3',
                isSuccess: true,
            }
        );
        assertEqual(
            result[3],
            {
                testcaseName: 'TC4',
                isSuccess: false,
                cause: 'IT MUST BE FAILED'
            }
        );
    }
}
