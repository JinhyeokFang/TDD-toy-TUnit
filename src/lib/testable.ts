import TestResult from "./test-result";

export default class Testable {
    run(): void {};
    getResult(): TestResult[] { return [] };
}
