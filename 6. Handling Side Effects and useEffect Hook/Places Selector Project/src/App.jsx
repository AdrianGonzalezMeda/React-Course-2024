import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'
import { useCallback } from 'react';

// Colocamos este codigo fuera por que no es necesario que se ejecute en cada renderizacion del componente
const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storeIds.map(id => AVAILABLE_PLACES.find(place => place.id === id));

function App() {
    const selectedPlace = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    // En useEffect el primer argumento sera nuestra funcion 'side effect'. La funcion se ejecutará despues de que 
    // termine la ejecucion de la funcion del componente
    useEffect(() => {
        // Side Effect: no esta directamente relacionado con la tarea del componente (renderizar). Ademas esta funcion
        //puede tomar un tiempo, ya que requiere de la aceptacion del usuario a traves del navegador
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
            setAvailablePlaces(sortedPlaces); // Si no usaramos useEffect, esta actualizacion causaria un bucle infinito,
            // ya que al declararse en el componente directamente, estariamos haciendo una actualizacion de los datos y
            // con ello una re-renderizacion del componente, que provocaria la actualizacion otra vez etc
        });
    }, []); // Como dentro de la funcion estamos actualizando un estado el componente se volveria a ejecutar y por tanto
    // esta funcion tambien, pero antes de ejecutarse react se asegura de que el segundo parametro (dependencias) haya cambiado,
    // si no ha cambiado de valor entonces no se volvera a ejecutar la funcion. Importante definirlo para evitar el bucle

    function handleStartRemovePlace(id) {
        setIsModalOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setIsModalOpen(false);
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        // Podriamos considerar este fragmento de codigo como un 'side effect' pero no es necesario declararlo dentro
        // de la funcion useEffect, ya que este codigo no provoca ningun bucle infinito ni impacta directamente en la UI
        const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        if (storeIds.indexOf(id) === -1) {
            localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]))
        }
    }

    // useCallback: guardamos la funcion en memoria y evitamos que en cada ejecucion del componente ésta se vuelva a crear
    const handleRemovePlace = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        setIsModalOpen(false);

        const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        localStorage.setItem('selectedPlaces', JSON.stringify(storeIds.filter(id => id !== selectedPlace.current)));
    }, []); // El segundo parametro son las dependencias, funcionan igual que en useEffect

    return (
        <>
            <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe" />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText={'Select the places you would like to visit below.'}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting places by distance..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
