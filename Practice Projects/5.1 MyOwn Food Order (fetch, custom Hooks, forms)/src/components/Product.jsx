import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

const Product = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);

    return (
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
                <span className="meal-item-price">{product.price}</span>
                <p className="meal-item-description">{product.description}</p>
                <div className="meal-item-actions">
                    <button className="button"
                        onClick={() => addItemToCart(product)}
                    >Add to Cart</button>
                </div>
            </article>
        </div>
    )
}

export default Product
