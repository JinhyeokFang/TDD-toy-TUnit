import { VendingMachine } from "./vending-machine";

describe('test VendingMachine', () => {
    it('a vending machine displays list of items', () => {
        let vendingMachine = new VendingMachine([]);
        let items = vendingMachine.getItems();
        expect(items).toEqual([]);

        const LIST_OF_ITEMS = ['피자', '콜라', '오레오', '물티슈'];
        vendingMachine = new VendingMachine(LIST_OF_ITEMS);
        items = vendingMachine.getItems();
        expect(items).toEqual(LIST_OF_ITEMS);
    });
});
