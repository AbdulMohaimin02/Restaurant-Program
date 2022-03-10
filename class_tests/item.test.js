const { TestWatcher } = require('jest');
const {Item,potatos,pringles,curry,margarita} = require('../classes/Item')

describe("Tests the item class",() =>{

    test('Giving an item a name', () => {
        const soup = new Item('soup','£1.25')
        expect(soup.name).toBe('soup')

    });

    test('Giving a soup a price', () => {
        const soup = new Item('soup','£1.25')
        expect(soup.price).toBe('£1.25')
    })


});

