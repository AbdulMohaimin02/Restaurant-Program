const {Item} = require('./item')
const db = require('better-sqlite3')('./database.sqlite');



class Menu{

    // This Static all will hold a refrence to alll the Menu instances that have
    // been made, we do this by pushing 'this' at the bottom of the Menu constructor
    static all = []

    static init = function() {
        db.prepare("CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, restaurant_id INTEGER, title TEXT);").run();
        const menus = db. prepare('SELECT * FROM menus;').all()

        menus.forEach(menu => { 
            const {id, restaurant_id, title} = menu
            const menuInstance = new Menu(restaurant_id,title,id)
        })

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
            const itemRows = db.prepare('SELECT * FROM items WHERE menu_id = ?').all(this.id)

            itemRows.forEach( itemRow => {
                const {id, menu_id, name, price} = itemRow

                const itemInstance = new Item(menu_id,name,price,id)

                this.menuItems.push(itemInstance)
                // console.log(menuInstance)
            

            })
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

    // Currently only works for removing object from the javascript array and not 
    // the sql table 
    removeItem(item){
        const index = this.menuItems.indexOf(item)
        if (index > -1){
            this.menuItems.splice(index,1)
        }
    }

}


module.exports = {Menu}