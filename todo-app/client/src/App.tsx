import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        axios.get<Todo[]>(API_URL)
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    const addTodo = async () => {
        if (newTodo.trim() === "") return;
        const response = await axios.post<Todo>(API_URL, { title: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo("");
    };

    const deleteTodo = async (id: string) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    // Custom styles for appearance
    const styles = {
        container: `
            min-h-screen 
            flex items-center justify-center p-4
            bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
            text-center
        `,
        todoBox: `
            w-full max-w-md
            bg-gradient-to-b from-gray-600 to-gray-800
            border-2 border-gray-500
            shadow-lg
            rounded-lg
            p-6
            relative
            text-center
            before:content-[''] before:absolute before:inset-0
            before:rounded-lg before:shadow-inner
            before:border before:border-gray-400/20 before:pointer-events-none
        `,
        heading: `
            text-3xl font-bold mb-6
            bg-clip-text text-transparent
            bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300
            tracking-wide
            drop-shadow-md
            font-sans
        `,
        inputGroup: `
            flex gap-2 mb-6
            p-2
            bg-gray-700/50
            border border-gray-600
            rounded-md
            shadow-inner
        `,
        input: `
            flex-1 p-2
            border border-gray-500
            rounded-md
            bg-gray-800
            text-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-300
            font-sans
        `,
        addButton: `
            bg-gradient-to-r from-gray-500 to-gray-700
            text-gray-200
            px-4 py-2
            rounded-md
            hover:from-gray-600 hover:to-gray-800
            transition duration-300
            border border-gray-500
            shadow-md
            font-sans
            font-semibold
        `,
        taskList: `
            space-y-3
            rounded-md
            bg-gray-700/50
            p-3
            border border-gray-600
            shadow-inner
        `,
        taskItem: `
            flex justify-between items-center
            bg-gradient-to-r from-gray-600 to-gray-700
            p-3
            rounded-md
            border border-gray-500/50
            shadow-md
        `,
        taskText: `
            text-gray-200
            font-sans
        `,
        deleteButton: `
            text-red-400
            hover:text-red-500
            transition
            bg-gray-800/50
            rounded-full
            w-6 h-6
            flex items-center justify-center
            border border-gray-600/50
        `,
    };

    return (
        <div className={styles.container}>
            <div className={styles.todoBox}>
                <h1 className={styles.heading}>TO-DO LIST</h1>
                
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a task"
                        className={styles.input}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <button 
                        onClick={addTodo}
                        className={styles.addButton}
                    >
                        Add
                    </button>
                </div>
                
                <ul className={styles.taskList}>
                    {/* Example task that cannot be deleted */}
                    <li className={styles.taskItem}>
                        <span className={styles.taskText}>Example Task</span>
                    </li>
                    {todos.map(todo => (
                        <li key={todo._id} className={styles.taskItem}>
                            <span className={styles.taskText}>{todo.title}</span>
                            <button 
                                onClick={() => deleteTodo(todo._id)}
                                className={styles.deleteButton}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;