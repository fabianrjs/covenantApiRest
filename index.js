const express = require('express')
const {pool} = require('./pg')


const app = express()



app.use(express.json())



 app.get('/usuarios', async(req,res)=>{ //https://proyecto-calidad-back.herokuapp.com/usuarios
    const users = await pool.query('SELECT * FROM usuario')
    res.send({
        message: users.rows
    })
})

 app.post('/usuarios/add', async(req,res) =>{ //https://proyecto-calidad-back.herokuapp.com/usuarios/add
    const {idusuario, nombre, correo, tipo, experto} = req.body;
    const sentencia = "INSERT INTO usuario(idusuario,nombre,correo,tipo,experto) VALUES('"+idusuario+"','"+nombre+"', '"+correo+"', '"+tipo+"', '"+experto+"');"
    if(idusuario && nombre && correo && tipo && experto){
        const result = await pool.query(sentencia) 
        res.send('Usuario creado')      
    }else{
        res.send('Datos invalidos')
    }
    
 })   

app.get('/mecanismos', async(req,res)=>{ //https://proyecto-calidad-back.herokuapp.com/mecanismos
    const mecanismos = await pool.query('SELECT * FROM mecanismo')
    res.send({
        message: mecanismos.rows
    })
})

 app.post('/mecanismo/add', async(req,res) =>{ //https://proyecto-calidad-back.herokuapp.com/mecanismos/add
    const {idmecanismo, estado} = req.body;
    const sentencia = "INSERT INTO mecanismo(idmecanismo,estado) VALUES('"+idmecanismo+"', '"+estado+"');"
    if(idmecanismo && estado){
        const result = await pool.query(sentencia) 
        res.send('Mecanismo creado')      
    }else{
        res.send('Datos invalidos')
    }

 })

 app.get('/propuestas/:idmecanismo', async(req,res)=>{ //https://proyecto-calidad-back.herokuapp.com/propuestas/{idmecanismo}
    let idmecanismopar = req.params.idmecanismo;
    const sentencia = "SELECT * FROM propuesta WHERE idmecanismo="+idmecanismopar+";"
    const propuestas = await pool.query(sentencia)
    if(propuestas){
        res.send({
            message: propuestas.rows
        })
    }else{
        res.send('No tiene propuestas')
    }
    

 })

 app.post('/propuesta/add', async(req,res) =>{ //https://proyecto-calidad-back.herokuapp.com/propuesta/add
    const{idpropuesta, votos, idmecanismo, autor} = req.body;
    const sentencia = "INSERT INTO propuesta(idpropuesta,votos,idmecanismo,autor) VALUES('"+idpropuesta+"', '"+votos+"', '"+idmecanismo+"', '"+autor+"');"
    const result = await pool.query(sentencia)
    res.send('propuesta agregada')

 })

 app.put('/votar/:propuestaid/:mecanismoid', async(req,res) =>{
    let propid = req.params.propuestaid;
    let mecid = req.params.mecanismoid;
    const votosbuscar = "SELECT SUM(votos) FROM propuesta WHERE idmecanismo="+mecid+" AND idpropuesta="+propid+";"
    const votar = await pool.query(votosbuscar)
    const sentencia = "UPDATE propuesta SET votos="+4+" WHERE idmecanismo="+mecid+" AND idpropuesta="+propid+";"
    const result = await pool.query(sentencia)
    res.send('Voto agregado')

 })


app.listen(process.env.PORT || 3000)
console.log('Server on port ', process.env.PORT || 3000)

 