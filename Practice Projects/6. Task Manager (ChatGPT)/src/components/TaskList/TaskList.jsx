import classes from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem'

const TaskList = ({items}) => {
    return (
        <ul className={classes['task-list']}>
            {items.map(item => <TaskItem key={item.id} item={item} />)}
        </ul>
    )
}

export default TaskList
