export class VendingMachine {
    private itemLists;

    constructor() {
        this.itemLists = [];
    }

    getItems() {
        return this.itemLists;
    }
}
