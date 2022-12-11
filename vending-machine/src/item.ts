export class Item {
    public readonly name: string;
    public readonly price: number;
    private readonly amount: number;

    constructor({ name, price, amount = 0 }) {
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

    public isAmountEnough(amount: number) {
        return this.amount >= amount;
    }

    get isSoldOut() {
        return this.amount === 0;
    }
}