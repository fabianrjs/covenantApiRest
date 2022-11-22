const express = require('express')
const {pool} = require('./pg')


const app = express()



app.use(express.json())



 app.get('/usuarios', async(req,res)=>{
    const users = await pool.query('SELECT * FROM usuarios')
    res.send({
        message: users
    })
})

 app.post('/usuarios/add', async(req,res) =>{
    const {nombre, correo, tipo, experto} = req.body;
    const sentencia = "INSERT INTO usuarios(nombre,correo,tipo,experto) VALUES('"+nombre+"', '"+correo+"', '"+tipo+"', '"+experto+"');"
    if(nombre && correo && tipo && experto){
        const result = await pool.query(sentencia) 
        res.send('Usuario creado')      
    }else{
        res.send('Datos invalidos')
    }
    
 })   

app.listen(process.env.PORT || 3000)
console.log('Server on port ', process.env.PORT || 3000)

 