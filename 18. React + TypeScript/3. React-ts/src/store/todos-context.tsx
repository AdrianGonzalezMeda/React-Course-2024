import React, { PropsWithChildren, useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
    items: Todo[],
    addTodo: (text: string) => void,
    removeTodo: (id: string) => void
}

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (text: string) => { },
    removeTodo: (id: string) => { }
});

export const TodosContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddTodo = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        });
    }

    const handleRemoveTodo = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId);
        });
    }

    const ctxValue: TodosContextObj = {
        items: todos,
        addTodo: handleAddTodo,
        removeTodo: handleRemoveTodo
    }

    return <TodosContext.Provider value={ctxValue}>
        {props.children}
    </TodosContext.Provider>
}