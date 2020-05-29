import React, { useState, useEffect } from "react";
import Api from "./services/api";

import "./styles.css";

function App() {
  const[repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const info = await Api.post('repositories', {      
        "url" : "https://github.com/pedrohfk",
        "title": "Pedro ReactJS",
        "techs": ["ReactJS"]      
    })     

    setRepositories([...repositories, info.data]);
    
  };

  async function handleRemoveRepository(id) {
    await Api.delete(`repositories/${id}`)
    
    setRepositories(repositories.filter(repositorio => repositorio.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorio => 
          <li key={repositorio.id}>

            <ul>
              <li><a href={repositorio.url} target="_blank">{repositorio.title}</a></li>
            </ul>

            <button onClick={() => handleRemoveRepository(repositorio.id)}>
              Remover
            </button>

          </li>
          )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
