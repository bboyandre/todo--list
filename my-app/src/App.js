import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import './Pure.css';

    const App = () => {
      const [listaDeFrutas, setListaDeFrutas] = useState([])
      const [texto, setTexto] = useState('')

      useEffect(() => {
        axios.get('http://localhost:3001/listaTodos').then(resposta => {
            setListaDeFrutas([...listaDeFrutas, ...resposta.data])
          })
      }, [])      
    
      const adicionarTextoDoInputNaLista = () => {
        axios.post('http://localhost:3001', {name: texto}).then(() => {
          axios.get('http://localhost:3001/lista').then(resposta => {
            setTexto('')
            setListaDeFrutas([...resposta.data, ...listaDeFrutas])
          })
        })
        setListaDeFrutas([...listaDeFrutas, {etiqueta: texto}])
        setTexto('')
      }
    
      const marcarFruta = (posicaoDaFruta) => {
        setListaDeFrutas(prev => [
          ...prev.slice(0, posicaoDaFruta),
          {...prev[posicaoDaFruta], estaMarcado: !prev[posicaoDaFruta].estaMarcado},
          ...prev.slice(posicaoDaFruta + 1)
        ])
      }

      const marcarNoBanco = (idDaTarefa, estaMarcado) => {
        axios.post('http://localhost:3001/marcar/', {
          id: idDaTarefa,
          estaMarcado,
        })
      }

      const deletarItem = (id) => {
        axios.get('http://localhost:3001/delete/' + id)
          .then(() => {

            listaDeFrutas.splice(id)
          })
          .then(() => {
            console.log('excluido')
            axios.get('http://localhost:3001/listaTodos').then(resposta => {
            
              setListaDeFrutas([...resposta.data])
              
                
              })
          })
            
          }
      
     
      // const outroDelete = (id) => {
      //   app.delete('/user', function (req, res) {
      //     res.send('Got a DELETE request at /user');
      //   }
      // }
      // const removeData = (id) => {

      //   axios.delete(`${URL}/${id}`).then(res => {
      //       const del = employees.filter(employee => id !== employee.id)
      //       setEmployees(del)
      //   })
      // }
    
      return (
        <div class="container">
          <div class="alinhaSpaceAround">
          <input type="e-mail" class="inputTexto " placeholder="example" value={texto} onChange={(e) => setTexto(e.target.value)} />
          <button class="buttonTexto pure-button" onClick={adicionarTextoDoInputNaLista}>Salvar na Lista</button>
          </div>
          <ul class=" ">
            {console.log('lista', listaDeFrutas)}
            {listaDeFrutas.map((tarefa, posicaoDaTarefa) => (
              
              <li class="alinhaSpaceBetween">
                
                <input class="inputCheckbox" type="checkbox" checked={tarefa.estaMarcado} onClick={() => {
                  marcarFruta(posicaoDaTarefa)
                  marcarNoBanco(tarefa._id, !tarefa.estaMarcado)
                }} />
                {tarefa.name}
                <button class="buttonDelete pure-button" onClick={() => deletarItem(tarefa._id)}>Delete</button>
                
              </li>
              
            ))}
          </ul>
        </div>
  );
}

export default App;
