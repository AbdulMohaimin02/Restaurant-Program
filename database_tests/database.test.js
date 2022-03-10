const db = require('better-sqlite3')(':memory:');


describe('Testing SQL databse', () => {

    beforeAll(() => {
        db.prepare('CREATE TABLE restaurants (id INTEGER PRIMARY KEY, name TEXT)').run();
        const restaurantsInsert = db.prepare('INSERT INTO restaurants (name) VALUES (?)')
        restaurantsInsert.run('Nobu')
        restaurantsInsert.run('Nandos')
    })

    test('Checking connection to database', () => {
        const rows = db.prepare('SELECT * FROM restaurants').all();
        expect(rows.length).toBe(2)
        expect(rows[0].name).toBe('Nobu')
    })


    test('Updating rows in a table', () => {
        const getRestaurant = db.prepare('SELECT * FROM restaurants WHERE id =? ;')
        expect(getRestaurant.get(2).name).toBe('Nandos')

        const update = db.prepare('UPDATE restaurants SET name =? WHERE id = ?;')
        update.run("Cheecky Nandos",2)

        expect(getRestaurant.get(2).name).toBe('Cheecky Nandos')

    })

    test('Can get a single item', () => {
        const row = db.prepare('SELECT * FROM restaurants WHERE id = ?').get(1);
        expect(row.name).toBe('Nobu')

    })

    test('Inserting items into the database', () => {
        const insertingItem = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
        insertingItem.run('McDonalds')

        const newItem = db.prepare('SELECT * FROM restaurants WHERE id =?').get(3)
        expect(newItem.name).toBe('McDonalds')
        
    })

    test('Deleting items form table', () => {
        db.prepare('DELETE FROM restaurants WHERE id = 2').run()
        const rows = db.prepare('SELECT * FROM restaurants').all();
        expect(rows.length).toBe(2)
    })



})

