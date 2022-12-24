import { assertEqual } from "../lib/assert";
import { TestResult } from "../lib/test-result";
import { Testable } from "../lib/testable";
import { TestState } from "../lib/teststate";
import { TestCase } from "../lib/testcase";

class SuccessfulTest extends Testable {
    getResult(): TestResult[] {
        return [{
            isSuccess: true,
            testName: 'Test'
        }];
    }
}

class UnsuccessfulTest extends Testable {
    getResult(): TestResult[] {
        return [{
            isSuccess: false,
            testName: 'Test'
        }];
    }
}

export const TestableTest = TestCase('Testable', { async test() {
    const test = new Testable();
    assertEqual<TestState>(TestState.NotBeTested, test.state, 'state should be NotBeTested');

    const successfulTest = new SuccessfulTest();
    successfulTest.run();
    assertEqual<TestState>(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

    const unsuccessfulTest = new UnsuccessfulTest();
    unsuccessfulTest.run();
    assertEqual<TestState>(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
}});
