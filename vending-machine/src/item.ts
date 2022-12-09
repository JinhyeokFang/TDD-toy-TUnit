export class Item {
    public readonly name: string;
    public readonly price: number;
    private readonly amount: number;

    constructor({ name, price, amount }) {
        this.name = name;
        this.price = price;
        this.amount = amount;
    }

    public equal(anotherItem: Item) {
        return (
            this.name == anotherItem.name &&
            this.price == anotherItem.price
        );
    }

    get isSoldOut() {
        return this.amount !== 0;
    }
}