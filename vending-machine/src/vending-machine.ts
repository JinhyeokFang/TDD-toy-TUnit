import { Item } from "./item";

export class VendingMachine {
    private itemLists: Item[];

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists.map(item => ({
            name: item.name,
            price: item.price,
            isSoldOut: item.amount === 0,
        }));
    }
}
