export class VendingMachine {
    private itemLists;

    constructor(itemNameLists) {
        this.itemLists = itemNameLists.map(itemName => ({
            name: itemName,
            isSoldOut: false,
        }));
    }

    getItems() {
        return this.itemLists;
    }
}
