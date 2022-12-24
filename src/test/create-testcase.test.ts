import { assertEqual } from "../lib/assert";
import { BaseTestCase } from "../lib/base-testcase";
import { TestCase } from "../lib/testcase";

export const CreateTestCaseTest = TestCase('CreateTestCaseTest', { async test() {
    const log: string[] = [];
    const testCase: BaseTestCase = TestCase('Test', { 
        async test() {
            log.push('test');
            assertEqual(1, 1);
            assertEqual(1, 2, 'WRONG');
        },
        async setUp() {
            log.push('setUp');
        },
        async tearDown() {
            log.push('tearDown');
        }
    });
    await testCase.run();
    assertEqual([{
        testName: 'Test',
        isSuccess: false,
        cause: 'WRONG',
    }], testCase.getResult());
    assertEqual('setUp-test-tearDown', log.join('-'));
}});
