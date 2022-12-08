import { VendingMachine } from "./vending-machine";

describe('test VendingMachine', () => {
    it('a vending machine displays list of items', () => {
        let vendingMachine = new VendingMachine([]);
        let items = vendingMachine.getItems();
        expect(items).toEqual([]);

        const LIST_OF_ITEMS = ['피자', '콜라'];
        const DISPLAYED_ITEMS = [{
            name: '피자',
            isSoldOut: false,
        }, {
            name: '콜라',
            isSoldOut: false,
        }];
        vendingMachine = new VendingMachine(LIST_OF_ITEMS);
        items = vendingMachine.getItems();
        expect(items).toEqual(DISPLAYED_ITEMS);
    });
});
