import { Product } from "@/src/types/Product";

export async function addToCart(productToAdd: Product, quantity: number) {
    // Fetch product details first
    const productResponse = await fetch(`http://localhost:3001/items/${productToAdd.id}`);
    const product: Product = await productResponse.json();  // Typecast the response to Product interface
    
    // Check if product exists and stock is available
    if (!product || product.stock <= 0) {
        console.error('Product is out of stock or does not exist.');
        return;
    }

    // Add the product to the cart
    await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({product, quantity})
    })
    .then(response => response.json())
    .then(data => console.log(data))  // Handle the response (cart update)
    .catch(error => console.error('Error adding to cart:', error));
}


export async function updateQuantity(productId: number, quantityChange: number) {
    await fetch(`http://localhost:3001/cart/${productId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        quantity: quantityChange
    })
    })
    .then(response => response.json())
    .then(data => console.log('Quantity updated', data))  // Handle the response (cart update)
    .catch(error => console.error('Error updating cart:', error));
}

export async function deleteItem(productId: number) {
    fetch(`http://localhost:3001/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))  // Handle the response (cart update)
    .catch(error => console.error('Error removing from cart:', error));
}



// CSR
export async function getCart() {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
            const res = await fetch('http://localhost:3001/cart', {
            cache: 'no-store' // 🔄 Prevents Next.js from caching stale cart data
        });
        if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error('Error Getting the cart:', error);
        return []; // Avoid undefined issues in case of API failure
    }
}

  

export async function postTotalPrice(totalPrice: number) {
    try {
        const response = await fetch('http://localhost:3001/sum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalPrice }), // Ensure correct key name
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from server:", data);
        return data;
    } catch (error) {
        console.error('Error sending totalPrice:', error);
    }
}

export async function getTotalPrice() {
    try {
        const res = await fetch('http://localhost:3001/sum');
        if (!res.ok) throw new Error('Failed to fetch total Price');
        const totalPrice = await res.json(); // Await the JSON parsing
        return totalPrice; // Return the parsed data
    } catch (error) {
        console.error('Error Getting the price:', error);
        return ; // Return an empty array in case of an error to avoid undefined issues
    }
}

// route.ts

export const postResetCart = async () => {
    fetch("http://localhost:3001/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            return ("Payment successful! Your cart has been cleared.");
          } else {
            return ("Payment successful, but failed to reset the cart.");
          }
        })
        .catch(() => {throw Error("An error occurred while resetting the cart.")});
  };
  