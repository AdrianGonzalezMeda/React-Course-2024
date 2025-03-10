import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces() {
    let places = await fetchAvailablePlaces();

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                places,
                position.coords.latitude,
                position.coords.longitude
            );

            resolve(sortedPlaces);
        });
    });
}

export default function AvailablePlaces({ onSelectPlace }) {
    const { 
        isFetching, 
        fetchData: availablePlaces,
        error 
    } = useFetch(fetchSortedPlaces, []);

    if (error) {
        return <ErrorPage title="An error occurred!" message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching place data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
