export async function fetchProducts() {
    const response = await fetch('http://localhost:3000/meals');
    if (!response.ok) {
        throw new Error('Failed to fecth user places');
    }
    const resData = await response.json();
    return resData;
}

export async function submitOrder(checkoutData) {
    const response = await fetch('http://localhost:3000/orders',{
        method: 'POST',
        body: JSON.stringify({ checkoutData }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to checkout');
    }
    const resData = await response.json();
    return resData;
}