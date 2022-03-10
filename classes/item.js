const db = require('better-sqlite3')('./database.sqlite');


class Item{
    static all = []

    static init = function() {
        db.prepare("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, menu_id INTEGER, name TEXT, price INTEGER);").run();
    }

    constructor(menu_id, name, price, id){
        this.menu_id = menu_id
        this.name = name
        this.price = price

        if (id){
            // SQL -> Javascript
            this.id = id
        } else {
            // Javascript -> SQL
            const insert = db.prepare('INSERT INTO items (menu_id,name,price) VALUES (?,?,?);').run(this.menu_id,this.name,this.price);
            this.id = insert.lastInsertRowid
        }

        Item.all.push(this)
    }

}




module.exports = {Item}