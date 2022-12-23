import { assertEqual } from "../lib/assert";
import testResult from "../lib/test-result";
import Testable from "../lib/testable";
import TestCase from "../lib/testcase";
import { TestState } from "../lib/teststate";

class SuccessfulTest extends Testable {
    getResult(): testResult[] {
        return [{
            isSuccess: true,
            testcaseName: 'Test'
        }];
    }
}

class UnsuccessfulTest extends Testable {
    getResult(): testResult[] {
        return [{
            isSuccess: false,
            testcaseName: 'Test'
        }];
    }
}

export default class TestableTest extends TestCase {
    test() {
        const test = new Testable();
        assertEqual(TestState.NotBeTested, test.state, 'state should be NotBeTested');

        const successfulTest = new SuccessfulTest();
        successfulTest.run();
        assertEqual(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new UnsuccessfulTest();
        unsuccessfulTest.run();
        assertEqual(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    }
}
