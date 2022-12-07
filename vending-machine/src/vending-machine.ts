export class VendingMachine {
    private itemLists;

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists;
    }
}
