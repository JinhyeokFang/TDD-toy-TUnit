import { assertEqual } from "../lib/assert";
import Testable from "../lib/testable";
import TestCase from "../lib/testcase";
import { TestState } from "../lib/teststate";

class SuccessfulTest extends Testable {
    run() {
        this.testSucceeded();
    }
}

class UnsuccessfulTest extends Testable {
    run() {
        this.testFailed();
    }
}

export default class TestableTest extends TestCase {
    test() {
        const successfulTest = new SuccessfulTest();
        assertEqual(TestState.NotBeTested, successfulTest.state, 'state should be NotBeTested');
        successfulTest.run();
        assertEqual(TestState.Succeeded, successfulTest.state, 'state should be Succeeded');

        const unsuccessfulTest = new UnsuccessfulTest();
        assertEqual(TestState.NotBeTested, unsuccessfulTest.state, 'state should be NotBeTested');
        unsuccessfulTest.run();
        assertEqual(TestState.Failed, unsuccessfulTest.state, 'state should be Failed');
    }
}
