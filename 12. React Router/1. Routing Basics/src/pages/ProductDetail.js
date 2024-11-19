import { Link, useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const params = useParams();

    // to=".." go back in the routes tree by default, so it depends the initial configuration in your routes, in this example /products and
    // /products/productId are siblings so go back its the parent "/", Home. But you can change this by adding "relative" prop to the Link
    // component, this prop accept "route" (by default) and "path" witch take a look at the currently active path and remove a segment
    return (
        <>
            <h1>Product details</h1>
            <p>{params.productId}</p>
            <p><Link to=".." relative="path">Back</Link></p>
        </>
    )
}

export default ProductDetailPage
