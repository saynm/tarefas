import PropTypes from "prop-types";
import "./Tarefa.css";
function Tarefa(props) {
  return (
    <div className={"tarefa-container"}>
      <p>{props.userName}</p>
      <p className={`tarefa ${props.completa ? "completa" : ""}`}>
        {props.titulo}
      </p>
    </div>
  );
}

Tarefa.propTypes = {
  completa: PropTypes.bool.isRequired,
  titulo: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Tarefa;
