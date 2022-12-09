import { Item } from "./item";

export class VendingMachine {
    private itemLists: Item[];
    private amountOfMoney = 0;

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists;
    }

    insert(money) {
        this.amountOfMoney += money;
    }

    get insertedMoney() {
        return this.amountOfMoney;
    }
}
