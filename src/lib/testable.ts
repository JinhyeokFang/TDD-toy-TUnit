import TestResult from "./test-result";
import { TestState } from "./teststate";

export default class Testable {
    private testState = TestState.NotBeTested;

    protected testFailed(): void {
        this.testState = TestState.Failed;
    }

    protected testSucceeded(): void {
        this.testState = TestState.Succeeded;
    }

    run(): void {};
    getResult(): TestResult[] { return [] };

    get state(): TestState {
        return this.testState;
    }
}
