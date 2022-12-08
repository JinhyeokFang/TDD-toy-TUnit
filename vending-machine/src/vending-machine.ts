export class VendingMachine {
    private itemLists;

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists.map(item => ({
            name: item.name,
            isSoldOut: item.amount === 0,
        }));
    }
}
