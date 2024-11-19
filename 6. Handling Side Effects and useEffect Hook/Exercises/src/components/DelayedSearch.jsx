import { useCallback, useEffect, useState } from "react";

/*
Descripción: Crea un input de búsqueda con sugerencias que se muestran debajo. Realiza una búsqueda cada vez que el usuario escribe, pero con un debounce (retraso) de 500ms entre llamadas.
Objetivo: Usa useCallback para optimizar la función de búsqueda y agrega un debounce para evitar llamadas innecesarias a la API.
Tips: Considera usar una función de "debounce" con setTimeout dentro de useCallback.
*/
const DelayedSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const fetchUsers = useCallback(async () => {
        console.log('fetchUsers')
        if (!query) return;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${query}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [query]);

    useEffect(() => {
        // La funcion debonunce funciona mejor aqui
        const timeout = setTimeout(() => {
            console.log('timeout')
            fetchUsers();
        }, 1000);

        return () => {
            clearTimeout(timeout)
        }
    }, [fetchUsers]);

    return (
        <section id="delayed-search">
            <h2>Search for Users</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
            />
            <ul>
                {results.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </section>
    )
}

export default DelayedSearch
