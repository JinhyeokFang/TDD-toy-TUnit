import { AnonymousTestCase } from "../lib/anonymous-testcase";
import { assertEqual } from "../lib/assert";
import { TestCase } from "../lib/testcase";

export const CreateTestCaseTest = AnonymousTestCase
    .create('CreateTestCaseTest', async () => {
    const testCase: TestCase = AnonymousTestCase.create('Test', async () => {
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
