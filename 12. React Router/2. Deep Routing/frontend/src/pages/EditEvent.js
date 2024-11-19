import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm'

const EditEventPage = () => {
    // This search for the loader configured in the same path element of this component, so when we configure a loader
    // to a high level path we need another hook: useRouteLoaderData. This takes a parameter to specify the loader setted in router conf
    //const data = useLoaderData();
    const data = useRouteLoaderData('event-detail');

    return (
        <EventForm method='PATCH' event={data.event} />
    )
}

export default EditEventPage
