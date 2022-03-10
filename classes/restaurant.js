const db = require('better-sqlite3')('./database.sqlite');
const {Menu} = require('./menu')

class Restaurant{
    static all = [] 

    static init = function () {
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        const restaurants = db. prepare('SELECT * FROM restaurants;').all()

        restaurants.forEach(restaurant => {
            const {id, name, imageUrl} = restaurant
            const restaurantInstance = new Restaurant(name,imageUrl,id)
            const menusRows = db.prepare('SELECT * FROM menus WHERE restaurant_id =?;').all(restaurantInstance.id)
            // console.log(menusRows)

            menusRows.forEach(menusRow =>  {
                const {id, restaurant_id, title } = menusRow
                // console.log(title)
                const menuInstance = new Menu(restaurant_id,title,id)
                restaurantInstance.restaurantMenus.push(menuInstance)
            })
        })


    }

    constructor(name, imageUrl,id){
        this.name = name
        this.imageUrl = imageUrl
        this.restaurantMenus = []

        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO restaurants (name) VALUES (?);').run(this.name)
            this.id = insert.lastInsertRowid
        }

        Restaurant.all.push(this)
    }

    addMenu(menuTitle){
        const menu = new Menu(this.id, menuTitle)
        this.restaurantMenus.push(menu)
    }

    removeMenu(menu){
        const index = this.removeMenu.indexOf(menu)
        if (index > -1){
            this.restaurantMenus.splice(index,1)
        }
    }

    showAllRestaurants(){
        return db.prepare('SELECT * FROM restaurants').all()
    }

}


module.exports = {Restaurant}