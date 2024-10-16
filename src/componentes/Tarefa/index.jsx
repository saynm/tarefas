import PropTypes from "prop-types";
import "./Tarefa.css";
function Tarefa(props) {
  const handleClick = () => {
    const newCompleta = !props.completa;
    // Use a callback function to update the value of `completa` in the parent component
    props.onCompletaChange(props.id, newCompleta);
  };

  return (
    <div className={"tarefa-container"} onClick={handleClick}>
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
  onCompletaChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Tarefa;
