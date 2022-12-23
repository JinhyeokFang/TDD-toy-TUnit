import TUnit from "../lib/tunit";
import AssertTest from './assert.test';
import ReportGeneratorTest from './report-generator.test';
import TestableTest from "./testable.test";
import TestcaseTest from './testcase.test';
import TestsuiteTest from './testsuite.test';
import TUnitTest from "./tunit.test";

TUnit.test([
    TestcaseTest,
    AssertTest,
    TestsuiteTest,
    ReportGeneratorTest,
    TUnitTest,
    TestableTest,
]);
