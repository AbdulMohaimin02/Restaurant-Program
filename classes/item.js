class Item{
    constructor(name,price){
        this.name = name
        this.price = price
    }

}


const potatos = new Item('potatos','£2.00')
const pringles = new Item('pringles','£1.70')
const curry = new Item('curry','£4.00')
const margarita = new Item('margarita', '£16.99')


module.exports = {Item,potatos,pringles,curry,margarita}