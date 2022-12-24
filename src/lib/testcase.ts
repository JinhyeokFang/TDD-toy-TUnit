import { AnonymousTestCase, AnonymousTestCaseMethods } from "./anonymous-testcase";
import { BaseTestCase } from "./base-testcase";

export function TestCase(
    testName: string, 
    method: AnonymousTestCaseMethods
): BaseTestCase {
    const testCase = new AnonymousTestCase(testName, method);
    return testCase;
}
