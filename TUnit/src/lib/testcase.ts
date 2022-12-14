export default class TestCase {
    setUp() {};
    test() {
        throw new Error('testcase must define test()')
    };
    tearDown() {};
    log: string[] = [];

    run() {
        this.log.push('setUp');
        this.setUp();
        this.log.push('test');
        this.test();
        this.log.push('tearDown');
        this.tearDown();
    }
}