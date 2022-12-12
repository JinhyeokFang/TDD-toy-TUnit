export default abstract class TestCase {
    abstract testMethod(): void;
    log: string[] = [];

    test() {
        this.log = ['test'];
        this.testMethod();
    }
}