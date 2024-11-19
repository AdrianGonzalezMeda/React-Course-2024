import { useEffect, useState } from "react";
import Product from "./Product.jsx";
import { fetchProducts } from "../http.js";



const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            fetchProducts().then((response) => {
                setProducts(response);
            });
        } catch {
            console.log('Error fetching: ' + error);
        }
    }, []);

    return (
        <section id="meals">
            {products && products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </section>
    )
}

export default ProductsList
