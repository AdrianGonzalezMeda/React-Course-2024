import { useDispatch } from 'react-redux';
import Button from '../UI/Button/Button';
import classes from './TaskItem.module.css';
import { tasksActions } from '../../store/tasks';

const TaskItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleCompleteTask = () => {
        dispatch(tasksActions.toggleComplete(item.id));
    }

    const handleDeleteTask = () => {
        dispatch(tasksActions.removeTask(item.id));
    }

    return (
        <li className={`${classes['task-item']} ${item.completed ? classes.completed : undefined}`}>
            {item.title}
            {!item.completed && <Button mode='edit'>Edit</Button>}
            <Button mode='delete' onClick={handleDeleteTask}>Delete</Button>
            <input className={classes['task-item-checkbox']} type='checkbox' checked={item.completed} onChange={handleCompleteTask} />
        </li>
    )
}

export default TaskItem
