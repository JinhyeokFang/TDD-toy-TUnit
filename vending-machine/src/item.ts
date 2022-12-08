export class Item {
    private name: string;
    private price: number;

    constructor({ name, price }) {
        this.name = name;
        this.price = price;
    }

    public equal(anotherItem: Item) {
        return (
            this.name == anotherItem.name &&
            this.price == anotherItem.price
        );
    }
}