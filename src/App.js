import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: '',
      techs: []
    })

    const respositorie = response.data
    setRepositories([...respositories, respositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(respositories.filter(
      respository => respository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(respository => (
          <li key={respository.id}>
            {respository.title}
            <button onClick={() => handleRemoveRepository(respository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;