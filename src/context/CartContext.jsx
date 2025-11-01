// import React, { createContext, useState, useContext, useEffect } from "react";
// import axiosConfig from "../api/axiosConfig";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//     const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email || null);

//     const coupon = { code: "Pashupati", description: "Get 20% OFF on Checkout" };

//     useEffect(() => {
//         if (userEmail) fetchCart(userEmail);
//     }, [userEmail]);

//     const fetchCart = async (email) => {
//         try {
//             const res = await axiosConfig.get(`/cart/${email}`);
//             setCartItems(res.data?.items || []);
//         } catch (err) {
//             console.error("Error fetching cart:", err);
//         }
//     };

//     // 🛒 Add to Cart
//     const addToCart = async (product) => {
//         try {
//             if (!userEmail) return alert("Please login first!");

//             const productId = product.id || product.productId;
//             const existing = cartItems.find((item) => item.productId === productId);

//             if (existing) {
//                 const newQuantity = existing.quantity + 1;
//                 await axiosConfig.post("/cart/update", {
//                     email: userEmail,
//                     productId,
//                     quantity: newQuantity,
//                 });

//                 setCartItems((prev) =>
//                     prev.map((item) =>
//                         item.productId === productId
//                             ? { ...item, quantity: newQuantity }
//                             : item
//                     )
//                 );
//             } else {

//                 await axiosConfig.post("/cart/add", {
//                     email: userEmail,
//                     product: {
//                         productId,
//                         name: product.name,
//                         image: product.image,
//                         price: product.price,
//                         originalPrice: product.originalPrice,
//                         quantity: 1,
//                     },
//                 });

//                 setCartItems((prev) => [
//                     ...prev,
//                     { ...product, productId, quantity: 1 },
//                 ]);
//             }
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     };

//     const increment = async (productId) => {
//         const updated = cartItems.map((item) =>
//             item.productId === productId
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//         );
//         setCartItems(updated);

//         const item = updated.find((i) => i.productId === productId);
//         await axiosConfig.post("/cart/update", {
//             email: userEmail,
//             productId,
//             quantity: item.quantity,
//         });
//     };

//     const decrement = async (productId) => {
//         const updated = cartItems
//             .map((item) =>
//                 item.productId === productId
//                     ? { ...item, quantity: item.quantity - 1 }
//                     : item
//             )
//             .filter((item) => item.quantity > 0);

//         setCartItems(updated);

//         const item = updated.find((i) => i.productId === productId);
//         await axiosConfig.post("/cart/update", {
//             email: userEmail,
//             productId,
//             quantity: item ? item.quantity : 0,
//         });
//     };
//     const removeFromCart = async (productId) => {
//         setCartItems((prev) => prev.filter((item) => item.productId !== productId));
//         await axiosConfig.post("/cart/remove", { email: userEmail, productId });
//     };

//     const clearCart = () => setCartItems([]);

//     const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const totalPrice = cartItems.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//     );

//     const [isCartOpen, setIsCartOpen] = useState(false);
//     return (
//         <CartContext.Provider
//             value={{
//                 isCartOpen,
//                 setIsCartOpen,
//                 cartItems,
//                 addToCart,
//                 increment,
//                 decrement,
//                 removeFromCart,
//                 clearCart,
//                 totalItems,
//                 totalPrice,
//                 userEmail,
//                 setUserEmail,
//                 fetchCart,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);

import React, { createContext, useState, useContext, useEffect } from "react";
import axiosConfig from "../api/axiosConfig";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem("user"))?.email || null);

    const coupon = { code: "Pashupati", description: "Get 20% OFF on Checkout" };

    useEffect(() => {
        if (userEmail) fetchCart(userEmail);
    }, [userEmail]);

    const fetchCart = async (email) => {
        try {
            const res = await axiosConfig.get(`/cart/${email}`);
            setCartItems(res.data?.items || []);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    // 🛒 Add to Cart
    const addToCart = async (product) => {
        console.log(product);

        try {
            if (!userEmail) return alert("Please login first!");

            const productId = product.id || product.productId;
            const existing = cartItems.find((item) => item.productId === productId);

            // ✅ pick correct image from product
            const productImage = product.image || product.images?.[0] || "";

            if (existing) {
                const newQuantity = existing.quantity + 1;
                await axiosConfig.post("/cart/update", {
                    email: userEmail,
                    productId,
                    quantity: newQuantity,
                });

                setCartItems((prev) =>
                    prev.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            } else {
                await axiosConfig.post("/cart/add", {
                    email: userEmail,
                    product: {
                        productId,
                        name: product.name,
                        image: productImage,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        quantity: 1,
                    },
                });

                setCartItems((prev) => [
                    ...prev,
                    { ...product, productId, quantity: 1, image: productImage },
                ]);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const increment = async (productId) => {
        const updated = cartItems.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartItems(updated);

        const item = updated.find((i) => i.productId === productId);
        await axiosConfig.post("/cart/update", {
            email: userEmail,
            productId,
            quantity: item.quantity,
        });
    };

    const decrement = async (productId) => {
        const updated = cartItems
            .map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCartItems(updated);

        const item = updated.find((i) => i.productId === productId);
        await axiosConfig.post("/cart/update", {
            email: userEmail,
            productId,
            quantity: item ? item.quantity : 0,
        });
    };

    const removeFromCart = async (productId) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
        await axiosConfig.post("/cart/remove", { email: userEmail, productId });
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                setIsCartOpen,
                cartItems,
                addToCart,
                increment,
                decrement,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
                userEmail,
                setUserEmail,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
