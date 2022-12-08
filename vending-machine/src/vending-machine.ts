export class VendingMachine {
    private itemLists;

    constructor(itemLists) {
        this.itemLists = itemLists;
    }

    getItems() {
        return this.itemLists.map(item => ({
            item: item.item,
            isSoldOut: item.amount === 0,
        }));
    }
}
