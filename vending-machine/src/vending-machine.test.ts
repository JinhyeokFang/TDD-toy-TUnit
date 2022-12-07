describe('test VendingMachine', () => {
    it('a vending machine displays list of items', () => {
        const vendingMachine = new VendingMachine();
        const items = vendingMachine.getItems();
        expect(items).toEqual([]);
    });
});
