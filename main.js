const {Restaurant} = require('./classes/restaurant')
const {Menu} = require('./classes/menu')


Restaurant.init()
Menu.init()


// const Nobu = Restaurant.all[0]
// Nobu.addMenu("Sea Food")


console.log(Menu.all)

