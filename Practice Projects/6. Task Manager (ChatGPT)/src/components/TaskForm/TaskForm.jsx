import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasks';
import Button from '../UI/Button/Button';
import FormGroup from '../UI/FormGroup/FormGroup';
import classes from './TaskForm.module.css';
import { uiActions } from '../../store/ui';

const TaskForm = ({ identifier, item, taskText }) => {
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const formData = Object.fromEntries(fd.entries());
        const newTask = { id: new Date().toISOString(), completed: false, ...formData }
        dispatch(tasksActions.addTask(newTask));
        dispatch(uiActions.toggleModal(identifier));
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h2>New Task</h2>
            <FormGroup.Input
                id='title'
                name='title'
                type='text'
                label='Title'
                defaultValue={item ? item.title : taskText}
            />
            <FormGroup.TextArea
                id='description'
                name='description'
                label='Description'
                defaultValue={item ? item.description : null}
            />
            <FormGroup.Input
                id='dueDate'
                name='dueDate'
                type='date'
                label='Due date'
                defaultValue={item ? item.dueDate : null}
            />
            <FormGroup.Select
                id='priority'
                name='priority'
                label='Priority'
                defaultValue={item ? item.priority : null}
            >
                <FormGroup.Option>Low</FormGroup.Option>
                <FormGroup.Option>Medium</FormGroup.Option>
                <FormGroup.Option>High</FormGroup.Option>
            </FormGroup.Select>
            <Button type='submit' mode='add'>Add</Button>
        </form>
    )
}

export default TaskForm
