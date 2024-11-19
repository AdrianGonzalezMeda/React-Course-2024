import { useContext } from 'react';
import TodoItem from './TodoItem';
import classes from './Todos.module.css'
import { TodosContext } from '../store/todos-context';

// React.FC es un tipo generico, lo que le sigue es la definicion del tipado de los props
// Comento como estaba antes de usar el context, para ver el tipado de las funciones
//const Todos: React.FC<{ items: Todo[], onRemoveTodo: (id: string) => void }> = (props) => {
const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map(item => (
                <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} />
            ))}
        </ul>
    );
}

export default Todos
