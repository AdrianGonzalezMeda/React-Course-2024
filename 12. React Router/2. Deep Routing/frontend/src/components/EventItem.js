import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
    // Another case to submit actions without <Form /> component is using useSubmit() hook
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?')

        if (proceed) {
            // First parameter its the formData, and the second parameter its an object with the same properties 
            // a form has. The action prop is not necesary because we submitted at the same path level, and this
            // components belongs to EventDetailPage wich is where we have the action method
            submit(null, {method: 'DELETE'});
            // example: submit({...formData}, {method: 'POST|PUT|DELETE|GET', action: '/another-action-path'})
        }
    }

    return (
        <article className={classes.event}>
            <img src={event.image} alt={event.title} />
            <h1>{event.title}</h1>
            <time>{event.date}</time>
            <p>{event.description}</p>
            <menu className={classes.actions}>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
            </menu>
        </article>
    );
}

export default EventItem;
