const {Restaurant} = require('./classes/restaurant')
const {Menu} = require('./classes/menu')
const {Item} = require('./classes/item')

const util = require('util')


Restaurant.init()
Menu.init()
Item.init()


// const Nobu = new Restaurant('Nobu','https://image.url')
// const landFood = new Menu(Nobu.id,'Land Food')
// Nobu.addMenu(landFood)


// const blackCod = new Item(landFood.id,'Black Cod', '£40.00')
// landFood.addItem(blackCod)


console.log(util.inspect(Restaurant.all, {depth: Infinity,colors: true}))



