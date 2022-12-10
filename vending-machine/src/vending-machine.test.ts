import { Item } from "./item";
import { VendingMachine } from "./vending-machine";

describe('test VendingMachine', () => {
    it('VendingMachine.displayItems', () => {
        let vendingMachine = new VendingMachine([]);
        let items = vendingMachine.displayItems();
        expect(items).toEqual([]);

        const LIST_OF_ITEMS = [
            new Item({
                name: '피자',
                price: 1000,
                amount: 10,
            }), 
            new Item({
                name: '콜라',
                price: 2000,
                amount: 0,
            }),
        ];
        vendingMachine = new VendingMachine(LIST_OF_ITEMS);
        items = vendingMachine.displayItems();
        expect(items).toEqual(LIST_OF_ITEMS);
    });

    it('VendingMachine.insertedMoney', () => {
        const INSERTED_MONEY = 3000;
        const ITEM_LISTS = [];
        const vendingMachine = new VendingMachine(ITEM_LISTS);
        vendingMachine.insert(INSERTED_MONEY);
        expect(vendingMachine.insertedMoney).toBe(INSERTED_MONEY);
    });

    describe('VendingMachine.popItem', () => {
        const INSERTED_MONEY = 3000;
        const ITEM_LISTS = [
            new Item({
                name: '자장면',
                price: 2000,
                amount: 2,
            }),
            new Item({
                name: '짬뽕',
                price: 5000,
                amount: 1,
            })
        ];
        let vendingMachine: VendingMachine;

        beforeEach(() => {
            vendingMachine = new VendingMachine(ITEM_LISTS);
            vendingMachine.insert(INSERTED_MONEY);
        });

        it('pop an item', () => {
            const ITEM = new Item({ 
                name: '자장면',
                price: 2000,
                amount: 1,
            });
            expect(
                vendingMachine
                    .popItem(ITEM, 1)
                    .equal(ITEM)
            )
            .toBe(true);
        });

        it('throw error when inserted money is not enough', () => {
            const ITEM = new Item({
                name: '짬뽕',
                price: 5000,
                amount: 1,
            });
            expect(() => {
                vendingMachine
                    .popItem(ITEM, 1)
            })
            .toThrowError();
        })
    });
});
