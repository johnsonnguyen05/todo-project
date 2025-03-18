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

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a task"
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={addTodo}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2">
                    {todos.map(todo => (
                        <li key={todo._id} className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
                            <span>{todo.title}</span>
                            <button 
                                onClick={() => deleteTodo(todo._id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
