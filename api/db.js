const MongoClient = require('mongodb').MongoClient;
const app = require('express')()

const uri = 'mongodb://root:todolist123@localhost:27017';

MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err)
    const listaCollection = client.db('todolist').collection('lista')

    listaCollection.insertOne({
      name: 'Limão',
      created_at: new Date(),
      marcador: true
    })
    .catch((err) => console.log('Deu um erro na hora de inserir', err))
    .then(data => {
      console.log('Inseriu com sucesso', data.result)

      listaCollection.find().toArray()
      .then(results => {
        console.log('Os resultados da tabela de teste são', results)
      }).catch(err => {
        console.log('Deu um erro ao tentar pegar os dados da tabela de teste')
      });
    })



    
})