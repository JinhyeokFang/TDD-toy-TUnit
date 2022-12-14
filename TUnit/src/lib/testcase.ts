export default abstract class TestCase {
    abstract setUp(): void;
    abstract test(): void;
    abstract tearDown(): void;
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