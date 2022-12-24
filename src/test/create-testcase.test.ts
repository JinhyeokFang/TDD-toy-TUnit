import { assertEqual } from "../lib/assert";
import { BaseTestCase } from "../lib/base-testcase";
import { TestCase } from "../lib/testcase";

export const CreateTestCaseTest = TestCase('CreateTestCaseTest', async () => {
    const testCase: BaseTestCase = TestCase('Test', async () => {
        assertEqual(1, 1);
        assertEqual(1, 2, 'WRONG');
    });
    await testCase.run();
    assertEqual([{
        testName: 'Test',
        isSuccess: false,
        cause: 'WRONG',
    }], testCase.getResult());
});
