const fs = require('fs');
let knex = null
let tabla
class Contenedor{
    constructor(configuracion,nombreTabla){
        tabla = nombreTabla
         knex = require('knex')({
            client: configuracion,
            connection:{
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'desafio'
            }
        })

        knex.schema.createTable(nombreTabla, table => {
            table.increments('id')
            table.string('title',30)
            table.float('price')
            table.string('thumbnail', 255)
        })    
        .then(() => console.log(`Tabla ${nombreTabla} CREADA`))
        .catch(err => console.log(`Error: ${err.message}`))
    }

    

    

   async save(object){
              
    knex(tabla)
    .insert(object)
    .then(() => console.log('Producto insertado'))
    .catch(err => console.log(`Error: ${err.message}`))
    
  }
    async update(object){

        let objects = await this.getAll()
        let index = object.id -1
        objects.splice(index ,1,object)
        
        await this.deleteAll()
        for(let i = 0; i < objects.length; i++ ){
            let obj = {
                "title":objects[i].title,
                "price":objects[i].price,
                "thumbnail":objects[i].thumbnail
            }
            await this.save(obj)
        }
       
     
    }

    async getById(id){
        
        return knex.from(tabla)
        .select('*')
        .where('id', '=', id)
 
    }
 
    async getAll(){
    
        return knex.from(tabla).select('*')
 
    }

    async deleteById(id){

    return knex.from(tabla)
    .where('id', id)
    .del()
   
    }
    

    async deleteAll(){
        return knex.from(tabla)
        .del()
    }

    async getRandom(){
        let data= this.getAll()
        let id = Math.floor(Math.random()*data.length)
        return this.getById(id)
    }
}

module.exports = Contenedor

