import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);

            try {
                const places = await fetchAvailablePlaces();
                navigator.geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    sortPlacesByDistance(places, latitude, longitude);
                    setAvailablePlaces(places);
                    setIsFetching(false);
                });

            } catch (error) {
                setError({ message: error || 'Could not fetch places, try again later.' });
            }
        };
        fetchPlaces();
    }, []);

    if (error) {
        return <ErrorPage title="An error ocurred" message={error.message} />
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            isLoading={isFetching}
            loadingText="Fetching place data..."
            onSelectPlace={onSelectPlace}
        />
    );
}
