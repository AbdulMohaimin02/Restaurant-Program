const {Restaurant} = require('./classes/restaurant')
const {Menu} = require('./classes/menu')
const {Item} = require('./classes/item')


Restaurant.init()
Menu.init()
Item.init()

// Code the rest of converting SQL to js object for menu and items

const Nobu = new Restaurant('Nobu','https://image.url')


const landFood = new Menu(Nobu.id,'Land Food')


const blackCod = new Item(landFood.id,'Black Cod', '£40.00')





console.log(Menu.all)

