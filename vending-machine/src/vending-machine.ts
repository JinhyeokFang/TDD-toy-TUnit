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
        this.validatePopItemRequest(item, amount);
        return item;
    }

    private validatePopItemRequest(item, amount) {
        const itemFromVendingMachine = this.checkIsItemExistsAndGetItem(item);
        this.checkIsAmountEnough(itemFromVendingMachine, amount);
        this.checkIsMoneyEnough(itemFromVendingMachine, amount);
        itemFromVendingMachine.popItem(amount);
    }

    private checkIsItemExistsAndGetItem(item) {
        const itemFromVendingMachine = this.findItemFromVendingMachine(item);
        if (!itemFromVendingMachine)
            throw new Error('requested item is not found from vending machine');
        return itemFromVendingMachine;
    }

    private findItemFromVendingMachine(item) {
        const itemFromLists = this.itemLists.find(
            i => i.equal(item)
        );
        return itemFromLists;
    }

    private checkIsMoneyEnough(item, amount) {
        const isMoneyEnough = this.getIsMoneyEnough(item, amount);
        if (!isMoneyEnough)
            throw new Error('inserted money is not enough');
    }

    private getIsMoneyEnough(item, amount) {
        const totalPrice = item.price * amount;
        const isMoneyEnough = this.amountOfMoney >= totalPrice;
        return isMoneyEnough;
    }

    private checkIsAmountEnough(item, amount) {
        const isAmountEnough = item.isAmountEnough(amount);
        if (!isAmountEnough)
            throw new Error('amount of items is not enough');
    }

    get insertedMoney() {
        return this.amountOfMoney;
    }
}
