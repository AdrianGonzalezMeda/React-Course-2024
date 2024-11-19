import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    // The loader created returns a promise but react-routers handle the promise and return de data so it doesn't
    // necesary to go with then() or await
    const { events } = useLoaderData(); // contains the data returned in the loader() function

    // Suspense its not related to react-router, its for show a fallback
    return <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    // Routes loaders can return directly the data or an object from new Response() (its a browser feature, not exclusive for react)
    // So, fetch already return a Response() so we can return directly and the router extract the data automatically

    if (!response.ok) {
        // When an error is thrown in a loader, react-router use the closest 'errorElement' defined in the createBrowserRouter
        // config
        throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });

        // This is another way to return Response with less code, and its not necesary to cast object to string
        //return json({ message: 'Could not fetch events' }, { status: 500 });
    } else {
        // return response; // when use the defer, we need to return the data and not the response
        const resData = await response.json();
        return resData.events; 
    }
}

// How to show the others EventsRootLayout's components while this component is loading the data. Then you need to use
// the <Await></Await> component in the return of the component
export function loader() {
    // defers works on functions that returns promises
    return defer({
        events: loadEvents()
    });
}

/* // This way, the entire EventsRootLayout doesnt render until loader finish
export async function loader() {
    // Loaders don't allow the use of react hooks
    return await loadEvents();
}*/