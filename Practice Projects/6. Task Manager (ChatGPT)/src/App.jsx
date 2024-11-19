import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.css'
import TaskList from './components/TaskList/TaskList'
import FormGroup from './components/UI/FormGroup/FormGroup'
import Button from './components/UI/Button/Button'
import { useState } from 'react';
import Modal from './components/UI/Modal/Modal';
import TaskForm from './components/TaskForm/TaskForm';
import { uiActions } from './store/ui';

function App() {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const items = useSelector(state => state.task.items);
    const modals = useSelector(state => state.ui.modals);
    const taskFormModalIdentifier = 'task-form';

    const handleChangeTask = (event) => {
        setTask(event.target.value);
    }

    const handleOpenModal = () => {
        dispatch(uiActions.toggleModal(taskFormModalIdentifier))
    }

    const handleCloseModal = () => {
        setTask('');
        const taskFormModal = modals.find(modal => modal.id === taskFormModalIdentifier);
        if (taskFormModal.open) {
            dispatch(uiActions.toggleModal(taskFormModalIdentifier));
        }
    }

    return (
        <main className={classes['app-container']}>
            <FormGroup.Input id='new-task' label="New task" value={task} onChange={handleChangeTask} />
            <Button onClick={handleOpenModal} mode='add'>Add</Button>
            <TaskList items={items} />
            <Modal identifier={taskFormModalIdentifier} onClose={handleCloseModal}>
                <TaskForm identifier={taskFormModalIdentifier} taskText={task} />
            </Modal>
        </main>
    )
}

export default App
