export default abstract class TestCase {
    abstract test(): void;
    log: string[] = [];

    run() {
        this.log = ['test'];
        this.test();
    }
}