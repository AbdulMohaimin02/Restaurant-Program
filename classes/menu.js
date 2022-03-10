const {Item} = require('./item')
const db = require('better-sqlite3')('./database.sqlite');



class Menu{

    // This Static all will hold a refrence to alll the Menu instances that have
    // been made, we do this by pushing 'this' at the bottom of the Menu constructor
    static all = []

    // In this init funciton we Create a menus table in the database if one does not 
    // already exist 
    static init = function() {
        db.prepare("CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, restaurant_id INTEGER, title TEXT);").run();
    }

    // This constructor takes in the parameters restaurant_id(to identify which restaurant the menu belongs to)
    // title (to know what the menu is about)
    // id(switch parameter, if it is present we convert sql to js object and if it is not we convert js object to sql, by inserting the js object to the menus table)
    constructor(restaurant_id, title, id){
        this.title = title
        this.restaurant_id = restaurant_id
        this.menuItems = []

        if (id) {
            // SQL -> Javascript
            this.id = id
        } else {
            // Javascript -> SQL
            const insert = db.prepare('INSERT INTO menus (restaurant_id, title) VALUES (?,?);').run(this.restaurant_id, this.title)
            this.id = insert.lastInsertRowid
        }

        Menu.all.push(this)
    }
    
    addItem(item){
        this.menuItems.push(item)
        
    }

    removeItem(item){
        const index = this.menuItems.indexOf(item)
        if (index > -1){
            this.menuItems.splice(index,1)
        }
    }

}


module.exports = {Menu}