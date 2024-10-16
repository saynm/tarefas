import React, { useEffect, useState } from "react";
import "./ListaDeTarefas.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const todosResponse = await fetch(
                "https://jsonplaceholder.typicode.com/todos"
            );
            const usersResponse = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            const todosData = await todosResponse.json();
            const usersData = await usersResponse.json();

            const usersMap = usersData.reduce((acc, user) => {
                acc[user.id] = user.name;
                return acc;
            }, {});

            setTodos(todosData);
            setUsers(usersMap);
        };

        fetchData();
    }, []);

    const tarefasCompletas = todos.filter((todo) => todo.completed);
    const tarefasPendentes = todos.filter((todo) => !todo.completed);

    const alterarEstado = (id) => {
        setTodos((preTodos) =>
            preTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    return (
        <div className="App">
            <h1>Lista de Tarefas</h1>
            <main>

                <div className="tarefas-completas">
                    <h2>Tarefas Completas</h2>
                    {tarefasCompletas.map((todo) => (
                        <div key={todo.id} className="tarefa">
                            <strong>{users[todo.userId]}</strong>:{" "}
                            <strike>{todo.title}</strike>
                        </div>
                    ))}
                </div>

                <div className="tarefas-pendentes" >
                    <h2>Tarefas Pendentes</h2>
                    {tarefasPendentes.map((todo) => (
                        <div key={todo.id} className="tarefa" onClick={() => alterarEstado(todo.id)}>
                            <strong>{users[todo.userId]}</strong>: {todo.title}
                        </div>
                    ))}
                </div>
                
            </main>
        </div>
    );

}

export default App;