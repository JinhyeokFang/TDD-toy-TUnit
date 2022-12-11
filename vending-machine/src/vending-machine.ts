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
        this.validatePopRequest(item, amount);
        return item;
    }

    private validatePopRequest(item, amount) {
        const itemFromVendingMachine = this.checkIsItemExistsAndGetItem(item);
        this.checkIsMoneyEnough(itemFromVendingMachine, amount);
        this.checkIsAmountEnough(itemFromVendingMachine, amount);
    }

    private checkIsItemExistsAndGetItem(item) {
        return this.findItemFromVendingMachine(item) as Item;
    }

    private checkIsMoneyEnough(item, amount) {
        const totalPrice = item.price * amount;
        const isMoneyEnough = this.amountOfMoney >= totalPrice;
        if (!isMoneyEnough)
            throw new Error('inserted money is not enough');
    }

    private checkIsAmountEnough(item, amount) {
        const isAmountEnough = item.isAmountEnough(amount);
        console.log(item, amount)
        if (!isAmountEnough)
            throw new Error('inserted amount is not enough');
    }

    private findItemFromVendingMachine(item) {
        const itemFromLists = this.itemLists.find(
            i => i.equal(item)
        );
        return itemFromLists;
    }

    get insertedMoney() {
        return this.amountOfMoney;
    }
}
