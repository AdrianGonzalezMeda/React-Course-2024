import React, { useState, useEffect, useCallback } from 'react';
/*
Descripción: Crea un input de búsqueda. Cada vez que el usuario escribe, el componente hace una llamada a la API para obtener resultados.
Objetivo: Usa useEffect para hacer la búsqueda cada vez que el valor cambie y useCallback para evitar recrear la función de búsqueda innecesariamente.
*/
function UserSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const fetchUsers = useCallback(async () => {
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
        fetchUsers();
    }, [fetchUsers]);

    return (
        <section id='user-search'>
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
    );
}

export default UserSearch;
