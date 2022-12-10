import { Item } from "./item";

describe('test Item', () => {
    it('Item.equal', () => {
        const item = new Item({
            name: '과자',
            price: 3000,
            amount: 10
        });
        const anotherItem = new Item({
            name: '탕수육',
            price: 4000,
            amount: 10,
        })
        expect(item.equal(item)).toBe(true);
        expect(item.equal(anotherItem)).toBe(false);
    });

    it('Item.isSoldOut', () => {
        const itemSoldOut = new Item({
            name: '치즈',
            price: 1000,
            amount: 0,
        });
        const itemNotSoldOut = new Item({
            name: '치즈',
            price: 1000,
            amount: 2,
        });
        expect(itemSoldOut.isSoldOut).toBe(true);
        expect(itemNotSoldOut.isSoldOut).toBe(false);
    });

    it('Item.isAmountEnough', () => {
        const item = new Item({
            name: '치즈',
            price: 1000,
            amount: 2,
        })
        expect(item.isAmountEnough(2)).toBe(true);
        expect(item.isAmountEnough(3)).toBe(true);
    })
});
