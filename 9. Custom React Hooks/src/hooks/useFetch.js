import { useEffect, useState } from "react";

// Los custom hooks deben empezar por 'use' obligatoriamente
export function useFetch(fetchFn, initialValue) {
    const [isFetching, setIsFetching] = useState(); 
    const [error, setError] = useState();
    const [fetchData, setFetchData] = useState(initialValue);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }

            setIsFetching(false);
        }

        fetchPlaces();
    }, [fetchFn]);

    return {
        isFetching,
        fetchData,
        setFetchData,
        error
    }
}