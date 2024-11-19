import { Form, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
    const navigate = useNavigate();
    const navigation = useNavigation(); // access to: data subbmited, state currently active transition
    const actionData = useActionData(); // access to data returned in the action function

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
    }

    return (
        <Form method={method} className={classes.form}>
            {actionData && actionData.errors && <ul>
                {Object.values(actionData.errors).map(err => <li key={err}>{err}</li>)}
            </ul>}
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
            </div>
        </Form>
    );
}

export default EventForm;

// Like in the loader functions, react-router use this action function configured in the router conf to execute it when
// a <Form /> component is submitted
export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }

    let url = 'http://localhost:8080/events/';
    if (method === 'PATCH') {
        url = url + params.eventId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    // Code returned in our custom dummy server
    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Could not save event.' }), { status: 500 })
    }
    
    return redirect('/events');
}
