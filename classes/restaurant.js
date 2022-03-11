const db = require('better-sqlite3')('./database.sqlite');
const {Menu} = require('./menu')

class Restaurant{
    
    // This static all class will hold a refrence to all Restaurant instances, as 
    // we push "this" at the bottom of the Restaurant constructor
    static all = [] 

    // This init funciton will run everytime a Restaurant class is called
    static init = function () {

        // We first write the SQL query to Create a new restaurants table, if one dosn't exist.
        // There for the first time the restaurant class is called a new restaurants table will be made
        // and every subsequnet time the sql query will be ignored
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT,imageUrl TEXT);').run()
        // The below variable 'restaurants' holds a refrence to all the items in the restaurants table
        const restaurants = db. prepare('SELECT * FROM restaurants;').all()

        // We iterate over all the items in th restaurant sql table, using a for each loop
        restaurants.forEach(restaurant => {
            // For each item in the restaurant table we first deconstruct its values into id, name and imageUrl
            const {id, name, imageUrl} = restaurant
            // Then with the deconstructed values of id, name and imageUrl we create a restaurant. 
            // Currently what we have done so far is that we have converted SQL entries into JS objects
            const restaurantInstance = new Restaurant(name,imageUrl,id)

            // The variable 'menuRows' will now hold a refrence to all the items from the menu table where
            // restaurant_id from the menus table matches with the restaurantInstance ID
            const menusRows = db.prepare('SELECT * FROM menus WHERE restaurant_id =?;').all(restaurantInstance.id)
            // console.log(menusRows)


            // Now we are iterating over all the items in menusRows which is the above variable
            menusRows.forEach(menusRow =>  {

                // For each Menu row item we desconstruct its values into id restaurant_id and title
                const {id, restaurant_id, title } = menusRow
                // console.log(title)

                // We then use the deconstructed values to create a new "menuInstance"
                const menuInstance = new Menu(restaurant_id,title,id)
                // Finally we then push that new menuInstance onto the restaurantMenus array.
                restaurantInstance.restaurantMenus.push(menuInstance)
            })
        })


    }

    // The restaurant constructor takes in three parameters
    // The name of the restaurant, its Image and the *switch case parameter 'id'
    constructor(name, imageUrl,id){
        this.name = name
        this.imageUrl = imageUrl
        this.restaurantMenus = []

        if (id) {
            // SQL -> Javascript
            this.id = id
        } else {
            // Javascript -> SQL
            const insert = db.prepare('INSERT INTO restaurants (name,imageUrl) VALUES (?,?);').run(this.name,this.imageUrl)
            this.id = insert.lastInsertRowid
        }

        Restaurant.all.push(this)
    }

    // This add menu function can be called from the outside to add a menu to a 
    // restaurant. By calling this function, you can simply pass in a string, this will then 
    // create a new instance of the Menu class and push it to the retaurant Menus array
    addMenu(menu){
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



// *switch case parameter is my own term. It referes to an paramater that changes
// the functionality of the function depending on weather it is passed in.

// In the the current example if the id parameter is not passed in, we are converting
// a JS object into SQL code, whereas if the id parameter is passed in, we are converting 
// SQL code to a JS object 