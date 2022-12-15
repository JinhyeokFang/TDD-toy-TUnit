import TestResult from "./test-result";

export default interface Testable {
    run(): void;
    getResult(): TestResult[];
}
