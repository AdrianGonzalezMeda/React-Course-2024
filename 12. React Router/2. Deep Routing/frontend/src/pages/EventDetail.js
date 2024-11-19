import { Await, defer, redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetailPage

async function loadEvent(id) {
    const response = await fetch(`http://localhost:8080/events/${id}`);

    if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Could not fetch details for selected event' }), { status: 500 });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

// React router give access to this two parameters when executes the loader. 
export async function loader({ request, params }) {
    // this is in case we need two diferents loaders
    return defer({
        event: await loadEvent(params.eventId), // just add await if you want to wait to render the page when the loader finish
        events: loadEvents()
    });
}

export async function action({ request, params }) {
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
        method: request.method
    });

    if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Could not delete selected event' }), { status: 500 });
    }

    return redirect('/events');
}