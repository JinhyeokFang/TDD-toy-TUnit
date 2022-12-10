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

    popItem(item, amount) {
        this.checkIsMoneyEnough(item, amount);
        return item;
    }

    private checkIsMoneyEnough(item, amount) {
        const totalPrice = item.price * amount;
        const isMoneyEnough = this.amountOfMoney >= totalPrice;
        if (!isMoneyEnough)
            throw new Error('inserted money is not enough');
    }

    get insertedMoney() {
        return this.amountOfMoney;
    }
}
