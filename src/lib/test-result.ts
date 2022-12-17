export default interface TestResult {
    testcaseName: string;
    isSuccess: boolean;
    cause?: string;
}
