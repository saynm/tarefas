// AddTask.js
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./AddTask.css";

function AddTask({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"formulario"}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Nova Tarefa..."
      />
      <button className={"botao"} type="submit">
        Adicionar
      </button>
    </form>
  );
}
AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
