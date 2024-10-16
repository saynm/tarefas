import { useState, useEffect } from "react";
import Tarefa from "../Tarefa";
import "./ListaDeTarefas.css";
import AddTask from "../AddTask";

/**
 * Componente ListaDeTarefas.
 *
 * @returns {JSX.Element} - O componente ListaDeTarefas.
 */
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

  const addTask = (taskText) => {
    const novaTarefa = {
      id: Date.now(),
      title: taskText,
      user: { id: 1 },
      completed: false,
    };
    setTarefas([novaTarefa, ...tarefas]);
  };

  /**
   * Função que escreve uma tarefa.
   *
   * @param {Object} tarefa - A tarefa a ser escrita.
   * @param {boolean} completa - Indica se a tarefa está completa ou não.
   * @returns {JSX.Element} - O componente de tarefa renderizado.
   */
  function escreveTarefa(tarefa, completa) {
    // Encontra o usuário correspondente ao ID da tarefa
    const usuario = usuarios.find((user) => user.id === tarefa.userId);
    const userName = usuario ? usuario.name : "Usuário Desconhecido";
    return (
      <Tarefa
        userName={userName}
        titulo={tarefa.title}
        key={tarefa.id}
        id={tarefa.id}
        completa={completa}
        onCompletaChange={onCompletaChange}
      />
    );
  }

  function onCompletaChange(tarefaId, novaCompleta) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === tarefaId ? { ...tarefa, completed: novaCompleta } : tarefa
      )
    );
  }

  /**
   * Filtra as tarefas com base no parâmetro de completas.
   *
   * @param {boolean} completas - Indica se as tarefas devem ser completas ou não.
   * @returns {Array} - Um array contendo as tarefas filtradas.
   */
  function filtrarTarefas(completas) {
    return tarefas.filter((tarefa) => tarefa.completed === completas);
  }

  return (
    <div className="light-gray container">
      <AddTask addTask={addTask} />
      <div>
        <h2>Tarefas Pendentes</h2>
        {/* o método map é chamado no array retornado por filtrarTarefas(false). 
        O método map percorre cada elemento do array e executa uma função para cada um deles. 
        Neste caso, a função passada para o map é (tarefa) => escreveTarefa(tarefa), 
        que chama a função escreveTarefa para cada tarefa. */}
        {filtrarTarefas(false).map((tarefa) => escreveTarefa(tarefa, false))}
      </div>
      <div>
        <h2>Tarefas Completas</h2>
        {/* o método map é chamado no array retornado por filtrarTarefas(true). 
        O método map percorre cada elemento do array e executa uma função para cada um deles. 
        Neste caso, a função passada para o map é (tarefa) => escreveTarefa(tarefa), 
        que chama a função escreveTarefa para cada tarefa. */}
        {filtrarTarefas(true).map((tarefa) => escreveTarefa(tarefa, true))}
      </div>
    </div>
  );
}

export default ListaDeTarefas;
