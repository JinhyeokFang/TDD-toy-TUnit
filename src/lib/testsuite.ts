import { AnonymousTestSuite, AnonymousTestSuiteMethods } from "./anonymouse-testsuite";
import { BaseTestSuite } from "./base-testsuite";

export function TestSuite(
    testName: string, 
    method: AnonymousTestSuiteMethods
): BaseTestSuite {
    const testSuite = new AnonymousTestSuite(testName, method);
    return testSuite;
};
