import { useState, useEffect } from "react";
import Tarefa from "../Tarefa";
import "./ListaDeTarefas.css";

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTarefas(data));
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }, []);

  function escreveTarefa(tarefa, completa) {
    const usuario = usuarios.find((user) => user.id === tarefa.userId);
    const userName = usuario ? usuario.name : "";
    return (
      <Tarefa
        userName={userName}
        titulo={tarefa.title}
        key={tarefa.id}
        completa={completa}
      />
    );
  }

  function filtrarTarefas(completas) {
    return tarefas.filter((tarefa) => tarefa.completed === completas);
  }

  return (
    <div className="light-gray container">
      <div>
        <h2>Tarefas Pendentes</h2>
        {filtrarTarefas(false).map((tarefa) => escreveTarefa(tarefa))}
      </div>
      <div>
        <h2>Tarefas Completas</h2>
        {filtrarTarefas(true).map((tarefa) => escreveTarefa(tarefa, true))}
      </div>
    </div>
  );
}

export default ListaDeTarefas;
