import { CartProducts } from "@/src/mock/Products";
export type Cart = {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
};

export async function addItem(itemId: number) {
  let cart = {} as Cart | null;
  const selectedProduct = CartProducts[0];

  // Handling if the selected product is not found
  if (!selectedProduct) {
    console.error(`Product with id ${itemId} not found.`);
    return;
  }

  // Creating a new cart object if the cart is empty or doesn't exist
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      items: [
        {
          ...selectedProduct,
          quantity: 1,
        },
      ],
    };
  } else {
    // Checking if the item is already in the cart
    let itemFound = false;

    // Updating the quantity of the existing item or adding a new item to the cart
    myCart.items = cart.items.map((item) => {
      if (item.id === itemId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    }) as Cart["items"];

    if (!itemFound) {
      myCart.items.push({
        ...selectedProduct,
        quantity: 1,
      });
    }
  }
}

export async function delItem(userId: string, productId: number) {
  // Retrieving the cart based on the user ID
  let cart = {} as Cart | null;

  // Checking if the cart and its items exist
  if (cart && cart.items) {
    // Filtering out the item to be deleted from the cart
    const updatedCart = {
      userId: userId,
      items: cart.items.filter((item) => item.id !== productId),
    };

    return updatedCart;
  }
}
