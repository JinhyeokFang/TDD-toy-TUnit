import { Item } from "./item";

export class VendingMachine {
    private itemLists: Item[];

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists;
    }
}
