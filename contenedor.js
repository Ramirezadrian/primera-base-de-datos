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
       
       
    return knex(tabla)
    .insert(object)
    .then(() => console.log('Producto insertado'))
    .catch(err => console.log(`Error: ${err.message}`))


/* 

        try{
            data  = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8') //leo archivo
            data = JSON.parse(data)
        } catch (err) {
            data = []
        }

        const lastProduct = data[data.length - 1] //conozco la posicion del ultimo elemento

        let id = 1

        if (lastProduct) { // si hay productos le sumo uno al id
             id = lastProduct.id + 1
        }
        object.id = id

        data.push(object) //agrego producto

        return fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(data, null, 2)) //save del producto nuevo
 */
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
       /*  .then(products => {
          console.log(`Total de productos: ${products.length}`)
          products.forEach(product => console.log(`Producto: ${product.name} con precio de $${product.price}`))
        })
        .catch(err => console.log(`Error: ${err.message}`)) */

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

