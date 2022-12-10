import { Item } from "./item";

export class VendingMachine {
    private itemLists: Item[];
    private amountOfMoney = 0;

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    displayItems() {
        return this.itemLists;
    }

    insert(money) {
        this.amountOfMoney += money;
    }

    popItem(item) {
        return item;
    }

    get insertedMoney() {
        return this.amountOfMoney;
    }
}
