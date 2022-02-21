import Database from 'better-sqlite3';
import { museums, works } from './initData';
import { Museum, museumData, Work } from './types';

const db = new Database('./data.db', {
   verbose: console.log,
});

const createMuseumsTable = () => db.prepare(`
    CREATE TABLE IF NOT EXISTS museums(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        city TEXT NOT NULL
    );
`).run()



const createWorksTable = () => db.prepare(`
    CREATE TABLE IF NOT EXISTS works(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        picture TEXT NOT NULL,
        museumId INTEGER NOT NULL,
        FOREIGN KEY(museumId) REFERENCES museums(id)
    );
`).run()

const deleteTable=(table:string)=>db.prepare(`
DROP TABLE IF EXISTS ${table}
`).run()


deleteTable('works')
deleteTable('museums')


createMuseumsTable()
createWorksTable()

export const createMuseum=(name:string,city:string)=> db.prepare(`INSERT INTO museums (name,city) VALUES (?,?);`).run(name,city)
export const createWork=(name:string,picture:string,museumId:number)=> db.prepare(`INSERT INTO works (name,picture,museumId) VALUES (?,?,?);`).run(name,picture,museumId)

export const getAllMuseums=():Museum[]=>db.prepare(`SELECT * FROM museums;`).all()
export const getMuseumBySpecific = (value:number|string,column:string):Museum=> db.prepare(`SELECT * FROM museums WHERE ${column}=?;`).get(value)
export const getAllWorks=():Work[]=>db.prepare(`SELECT * FROM works;`).all()
export const getWorksBySpecific = (value:number|string,column:string)=> db.prepare(`SELECT * FROM works WHERE ${column}=?;`).all(value)
export const getWorkBySpecific = (value:number|string,column:string):Work=> db.prepare(`SELECT * FROM works WHERE ${column}=?;`).get(value)

export const updateWorkMuseum = (newMuseumId:number,id:number)=>db.prepare(`UPDATE works SET museumId=? WHERE id=?;`).run(newMuseumId,id)


for (const {name,city} of museums) {
    createMuseum(name,city)
}

for (const {name,picture,museumId} of works) {
    createWork(name,picture,museumId)
}


