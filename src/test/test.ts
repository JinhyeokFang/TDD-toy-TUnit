import { TUnit } from "../lib/tunit";
import { AssertTest } from './assert.test';
import { CreateTestCaseTest } from "./create-testcase.test";
import { ReportGeneratorTest } from './report-generator.test';
import { TestableTest } from "./testable.test";
import { TestCaseTest } from './testcase.test';
import { TestSuiteTest } from './testsuite.test';
import { TUnitTest } from "./tunit.test";

TUnit.test([
    AssertTest,
    TestableTest,
    TestCaseTest,
    TestSuiteTest,
    ReportGeneratorTest,
    TUnitTest,
    CreateTestCaseTest,
]);
