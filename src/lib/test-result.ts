export interface TestResult {
    testName: string;
    isSuccess: boolean;
    cause?: string;
    children?: TestResult[];
}
