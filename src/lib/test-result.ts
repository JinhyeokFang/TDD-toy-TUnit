export interface TestResult {
    testcaseName: string;
    isSuccess: boolean;
    cause?: string;
    children?: TestResult[];
}
