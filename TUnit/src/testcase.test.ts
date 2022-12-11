class TestCaseTestCase {
    log: string[] = [];

    test() {
        this.log = ['test'];
    }
}

export default new TestCaseTestCase();