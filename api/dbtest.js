const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = require('express')()
const json = require('express').json
const cors = require('cors')

const uri = 'mongodb://root:todolist123@localhost:27017';

MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err)
    console.log('o jhuan é um bosta')
    const listaCollection = client.db('todolist').collection('lista')

      // app.get('/lista', function (req, res) {
      // listaCollection.find().sort({created_at: -1}).toArray().then(data => {
      //   res.json(data)
      // })
    // .catch((err) => console.log('Deu um erro na hora de inserir', err))
    // .then(data => {
    //   console.log('Inseriu com sucesso', data.result)

    //   listaCollection.find().toArray()
    //   .then(results => {
    //     console.log('Os resultados da tabela de teste são', results)
    //   }).catch(err => {
    //     console.log('Deu um erro ao tentar pegar os dados da tabela de teste')
    //   });
    // })

    app.use(cors('http://localhost:3000'))
    app.use(json())

    app.post('/', function (req, res) {
      listaCollection.insertOne({
        name: req.body.name,
        created_at: new Date(),
        estaMarcado: false
      }).then(() => {
        res.json(true)
      })
      console.log(req.body)
    })

    app.get('/listaTodos', function (req, res) {
      listaCollection.find().sort({created_at: -1}).toArray().then(data => {
        res.json(data)  
      })
    })

    app.post('/marcar', function (req, res) {
      const id = req.body.id;
      const estaMarcado = req.body.estaMarcado;
      console.log(id, estaMarcado);
      listaCollection.updateOne({_id: ObjectId(id) }, { $set: {
        estaMarcado
      } }).then(() => {
        res.json('ok')
      })
      // listaCollection.updateOne({
      //   estaMarcado : 
      // })
    })
    
    app.get('/lista', function (req, res) {
      listaCollection.find().sort({created_at: -1}).toArray().then(data => {
        res.json(data.slice(0,1))
      })
      // res.json([{
      //   nome: 'Maçã',
      //   estaMarcado: true
      // }, {
      //   nome: 'Laranja',
      //   estaMarcado: false
      // }])
    })

    // app.delete('/lista', function (req, res) {
    //   ({
    //     name: req.body.name,
    //     created_at: new Date(),
    //     estaMarcado: false
    //   }).then(() => {
    //     res.json(true)
    //   })
    //   console.log(req.body.id)
    //   res.send('DELETE request to homepage')
    // })
    
    app.get('/delete/:id', function (req, res) {
      var id = req.params.id
      console.log('bateu', id)
        listaCollection.deleteOne(
          {
            _id: ObjectId(id)
          }).then(() => {
            res.json(true)
              
            
            console.log('Removido com sucesso!')
          })
      })

    app.listen(3001, () => {
        console.log('Server running on port 3001')
    })
})