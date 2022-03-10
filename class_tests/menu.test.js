const {potatos,curry,margarita,pringles} = require('../classes/item')
const {Menu} = require('../classes/menu')


describe('Tests the menu class', () =>{

    test('adding items to a menu', () => {
        const basicMenu = new Menu('Basic Menu')
        basicMenu.addItem(potatos)

        expect(basicMenu.menuItems[0]).toEqual(potatos)
    })

    test('removing items from a menu', () => {
        const basicMenu = new Menu('Basic Menu')
        basicMenu.addItem(potatos)
        basicMenu.addItem(pringles)

        basicMenu.removeItem(potatos)
        expect(basicMenu.menuItems[0]).toEqual(pringles)
    })
})