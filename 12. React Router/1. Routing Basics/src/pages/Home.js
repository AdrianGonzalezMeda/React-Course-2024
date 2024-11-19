import { Link, useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/products'); // Method to imperative navigation
    }

    return (
        <>
            <h1>My home page</h1>
            <p>Go to the <Link to="/products">list of products</Link></p>
            <p>
                <button onClick={navigateHandler}>Navigate</button>
            </p>
        </>
    )
}

export default HomePage
