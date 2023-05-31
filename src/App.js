import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'
import axios from 'axios'
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha um cep")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    } catch {
      alert("erro ao buscar")
      setInput("")
      return;
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>
      <div className="containerinput">
        <input type="text" placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)} />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro {cep.bairro}</span>
          <span>DDD {cep.ddd}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
