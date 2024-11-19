import { useContext, useRef } from "react";
import classes from './NewTodo.module.css'
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    // useRef necesita especificar un tipado generico y un valor por defecto
    const todoTextInput = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // Typescript te añade un ? cuando hay posibilidad de que el valor sea nulo, ya que las referencias se asignan
        // despues de la primera ejecucion del componente. Pero si como devs sabemos a ciencia cierta que el valor no
        // va a ser nulo, podemos usar ! en su lugar
        const enteredText = todoTextInput.current!.value;

        if (enteredText.trim().length === 0) {
            // throw error
            return;
        }

        todosCtx.addTodo(enteredText);
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo text</label>
            <input id="text" type="text" ref={todoTextInput} />
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo
