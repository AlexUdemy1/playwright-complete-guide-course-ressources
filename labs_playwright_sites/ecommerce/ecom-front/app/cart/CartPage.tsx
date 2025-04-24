// "use client";

// import { StaticImport } from "next/dist/shared/lib/get-img-props";
// import Image from "next/image";
// import Link from "next/link";
// import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
// import { deleteItem, getCart, postTotalPrice, updateQuantity } from "../api/cart/route";

// const CartPage = () => {
//   const [items, setItems] = useState<any[]>([]); // Initialize as an empty array
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCart() {
//       const cartData = await getCart();
//       setItems(cartData);
//       setLoading(false);
//     }

//     fetchCart();
//   }, []); // Runs only once on component mount

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Group items by their id and sum quantities
//   const groupedItems = items.reduce((acc: any[], item: { id: any; quantity: any }) => {
//     const existingItem = acc.find((i) => i.id === item.id);
//     if (existingItem) {
//       existingItem.quantity += item.quantity;
//     } else {
//       acc.push({ ...item });
//     }
//     return acc;
//   }, []);

//   // Handle quantity increase
//   const handleIncreaseQuantity = async (item: any) => {
//     if (item.quantity < item.stock) {
//       await updateQuantity(item.id, 1);
//       setItems(await getCart()); // Refresh cart
//     }
//   };

//   // Handle quantity decrease
//   const handleDecreaseQuantity = async (item: any) => {
//     if (item.quantity > 1) {
//       await updateQuantity(item.id, -1);
//     } else {
//       await deleteItem(item.id);
//     }
//     setItems(await getCart()); // Refresh cart
//   };

//   const totalPrice = groupedItems.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-col flex-1 overflow-auto p-4">
//         <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
//         {groupedItems.length === 0 ? (
//           <div className="flex flex-col items-center justify-center mt-20">
//             <p className="text-center">Your order is empty.</p>
//             <Link href="/shop" className="w-full max-w-44">
//               <p className="text-center bg-blue-600 p-4 rounded-lg hover:bg-blue-500 mt-12">
//                 Continue Shopping
//               </p>
//             </Link>
//           </div>
//         ) : (
//           <ul className="space-y-4">
//             {groupedItems.map((item: { image: string | StaticImport; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; price: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, key: Key | null | undefined) => (
//               <li key={key} className="flex border-b pb-4">
//                 <div className="flex flex-shrink-0 w-18 h-18 mr-4">
//                   <Image
//                     src={item.image}
//                     alt="car image"
//                     width={100}
//                     height={100}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//                 <div className="flex justify-between flex-1 flex-col w-full">
//                   <div>
//                     <p className="text-lg">{item.name}</p>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className="flex items-center space-x-1 border-b-2 border-black p-0.5">
//                       <button
//                         onClick={() => handleDecreaseQuantity(item)}
//                         className="text-gray-600"
//                       >
//                         -
//                       </button>
//                       <span className="px-4">{item.quantity}</span>
//                       <button
//                         onClick={() => handleIncreaseQuantity(item)}
//                         className="text-gray-600"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <div className="text-sm pt-1">
//                       €{item.price}
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md p-4">
//         <div className="flex justify-between items-center text-lg font-semibold">
//           <span>Subtotal:</span>
//           <span>€{totalPrice}</span>
//         </div>
//         <div className="text-center p-4">
//           Shipping, taxes, and discount codes calculated at checkout.
//         </div>
//         {totalPrice != 0 &&
//           <Link
//           href="/checkout"
//           className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-center w-full block"
//           onClick={() => postTotalPrice(totalPrice)}
//           >
//             CHECK OUT
//           </Link>
//         }
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import { getCart } from "../api/cart/route"; // Fetch from API
import CartClient from "./CartClient";

export default async function CartPage() {
  const cartItems = await getCart(); // Fetch data on the server

  return <CartClient />;
}
