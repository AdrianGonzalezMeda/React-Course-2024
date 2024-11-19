import { useEffect, useState } from "react"

/*
Descripción: Haz un componente que haga un fetch de datos a una API al cargarse. Puedes usar una API pública como JSONPlaceholder (ejemplo: https://jsonplaceholder.typicode.com/posts).
Objetivo: Obtener y mostrar los datos una vez, solo cuando el componente se monte.
*/
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [test, setTest] = useState(0);

    /* Con la funcion useEffect evitamos el bucle infinito de reevaluar el componente al hacer la actualizacion de 
    setPosts(), ademas podemos cambiar el valor de otros stados que no se ejecutara de nuevo la funcion de fetch */
    useEffect(() => {
        async function fetchPosts() {
            console.log('fetching');
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, [])

    return (
        <section id="posts">
            <h1>POSTS</h1>
            <button onClick={() => {
                setTest(prev => prev + 1);
            }}>Test: {test}</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Posts
