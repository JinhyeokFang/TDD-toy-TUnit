import { AnonymousTestCase } from "./anonymous-testcase";
import { BaseTestCase } from "./base-testcase";

export function TestCase(
    testName: string, 
    testMethod: () => Promise<void>
): BaseTestCase {
    const testCase = new AnonymousTestCase(testName, testMethod);
    return testCase;
}
