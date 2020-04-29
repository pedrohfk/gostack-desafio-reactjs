import React, { useState, useEffect } from "react";
import Api from "./services/api";

import "./styles.css";

function App() {
  const[repositories, setrepositories] = useState([]);

  useEffect(() => {
    Api.get('/repositories').then(response => {
      setrepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await Api.post('repositories', {      
        "url" : "https://github.com/Rocketseat/umbriel",
        "title": "Umbriel",
        "techs": ["Node", "Express", "TypeScript"]      
    })
      
    const repositorie = response.data;

    setrepositories([...repositories, repositorie]);
    
  };

  async function handleRemoveRepository(id) {
    const response = Api.delete(`repositories/${id}`)
    
    return response.then(response => response.data);
  }

  console.log('REPOSITORIO:', repositories);

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
           {repositories.map(repositorie =>
                             <li key={repositorie.id}>{repositorie.title}
                              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                              Remover </button></li>)}       
          </ul>

         
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
