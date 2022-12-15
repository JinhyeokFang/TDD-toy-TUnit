export default interface TestCaseResult {
    testcaseName: string;
    isSuccess: boolean;
    cause?: string;
}
