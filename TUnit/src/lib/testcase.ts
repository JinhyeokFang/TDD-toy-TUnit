export default class TestCase {
    testMethod: () => void;
    log: string[] = [];

    constructor(testMethod: () => void) {
        this.testMethod = testMethod;
    }

    test() {
        this.testMethod();
        this.log = ['test'];
    }
}