import { Item } from "./item";
import { VendingMachine } from "./vending-machine";

describe('test Item', () => {
    it('Item.equal', () => {
        const item = new Item({
            name: '과자',
            price: 3000,
        });
        const anotherItem = new Item({
            name: '탕수육',
            price: 4000,
        })
        expect(item.equal(item)).toBe(true);
        expect(item.equal(anotherItem)).toBe(false);
    });
})

describe('test VendingMachine', () => {
    it('VendingMachine.getItems', () => {
        let vendingMachine = new VendingMachine([]);
        let items = vendingMachine.getItems();
        expect(items).toEqual([]);

        const LIST_OF_ITEMS = [{
            name: '피자',
            price: 1000,
            amount: 10,
        }, {
            name: '콜라',
            price: 2000,
            amount: 0,
        }];
        const DISPLAYED_ITEMS = [{
            name: '피자',
            price: 1000,
            isSoldOut: false,
        }, {
            name: '콜라',
            price: 2000,
            isSoldOut: true,
        }];
        vendingMachine = new VendingMachine(LIST_OF_ITEMS);
        items = vendingMachine.getItems();
        expect(items).toEqual(DISPLAYED_ITEMS);
    });
});
