const {potatos,curry,margarita,pringles} = require('./item')
const db = require('better-sqlite3')('./database.sqlite');



class Menu{

    static init = function() {
        db.prepare("CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, restaurant_id INTEGER, title TEXT);").run();
    }

    constructor(restaurant_id, title, id){
        this.title = title
        this.restaurant_id = restaurant_id

        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO menus (title, restaurant_id) VALUES (?,?);').run(this.title, this.restaurant_id)
            this.id = insert.lastInsertRowid
        }

        this.menuItems = []
    }
    
    addItem(item){
        
    }

    removeItem(item){
        const index = this.menuItems.indexOf(item)
        if (index > -1){
            this.menuItems.splice(index,1)
        }
    }

}


module.exports = {Menu}