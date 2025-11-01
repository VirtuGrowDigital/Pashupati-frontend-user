import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "../context/ProductContext.jsx";
import { useCart } from "../context/CartContext";
import AddToCart from "./AddTOcart";

const BulkOrderPage = () => {
    const { bulkproducts } = useProducts();
    const { addToCart, isCartOpen, setIsCartOpen } = useCart();

    const closeCart = () => setIsCartOpen(false);

    const FIXED_PRICE = 300;
    const MIN_ORDER_VALUE = 15000;
    const MIN_LITERS = Math.ceil(MIN_ORDER_VALUE / FIXED_PRICE);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        productId: "",
        quantity: MIN_LITERS,
        location: "",
        message: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "quantity") {
            const qty = Math.max(MIN_LITERS, Number(value));
            setFormData({ ...formData, quantity: qty });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleWhatsApp = (e) => {
        e.preventDefault();
        const whatsappNumber = "9208468980";
        const product =
            bulkproducts.find((p) => p.id === Number(formData.productId))?.name ||
            "N/A";
        const totalPrice = formData.quantity * FIXED_PRICE;

        const message = `📦 *Bulk Order Inquiry*\n\nProduct: ${product}\nFull Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nQuantity: ${formData.quantity} Liters\nPrice: ₹${FIXED_PRICE}/L\nTotal: ₹${totalPrice}\n\nLocation: ${formData.location}\n\n📝 Product Details:\n${formData.message}`;

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    const handleEmail = (e) => {
        e.preventDefault();
        const toEmail = "pashupatifood25@gmail.com";
        const subject = `Bulk Order Inquiry from ${formData.name}`;
        const product =
            bulkproducts.find((p) => p.id === Number(formData.productId))?.name ||
            "N/A";
        const totalPrice = formData.quantity * FIXED_PRICE;

        const body = `📦 Bulk Order Inquiry\n\nProduct: ${product}\nFull Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nQuantity: ${formData.quantity} Liters\nPrice: ₹${FIXED_PRICE}/L\nTotal: ₹${totalPrice}\n\nLocation: ${formData.location}\n\n📝 Product Details:\n${formData.message}`;

        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`,
            "_blank"
        );
    };

    const handleProductSelect = (e) => {
        const selectedId = e.target.value;
        setFormData({
            ...formData,
            productId: selectedId,
            quantity: MIN_LITERS,
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#e9f0e2] pt-38 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-center ">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#5E7141] mb-3">
                    Bulk Order
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                    Fixed Price: ₹300 per liter | Minimum Order Value: ₹15,000 (50 liters)
                </p>
            </motion.div>

            {/* Product Cards */}
            <div className="flex flex-wrap  gap-8 max-w-7xl mx-auto mb-20">
                {bulkproducts.map((bulkitem, i) => (
                    <motion.div
                        key={bulkitem.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={bulkitem.images[0]}
                                alt={bulkitem.name}
                                className="w-full h-56 sm:h-64 object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow justify-between">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-[#5E7141] mb-2">
                                    {bulkitem.name}
                                </h2>
                                <ul className="text-gray-600 text-sm mb-4 list-disc pl-4">
                                    {bulkitem.description.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-2">
                                <p className="text-[#5E7141] font-bold text-lg">
                                    ₹{bulkitem.price.toLocaleString()}{" "}
                                    <span className="text-gray-400 line-through text-sm ml-2">
                                        ₹{bulkitem.originalPrice.toLocaleString()}
                                    </span>
                                </p>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => addToCart(bulkitem)}
                                    className="w-full mt-4 bg-[#5E7141] text-white py-2.5 rounded-full font-semibold hover:bg-[#4c5d32] transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Add to Bulk Cart
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Inquiry Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-10"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#5E7141] mb-3">
                    Bulk Order Inquiry
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    We’ll get back to you with custom pricing & packaging details.
                </p>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-4xl mx-auto mb-20"
            >
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleProductSelect}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-[#5E7141] focus:border-transparent outline-none transition md:col-span-2"
                        required
                    >
                        <option value="">Select Product</option>
                        {bulkproducts.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>

                    {["name", "email", "phone", "company", "quantity", "location"].map(
                        (field) => (
                            <input
                                key={field}
                                type={
                                    field === "email"
                                        ? "email"
                                        : field === "phone"
                                            ? "tel"
                                            : "text"
                                }
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={
                                    field === "quantity"
                                        ? `Liters (min ${MIN_LITERS})`
                                        : field.charAt(0).toUpperCase() + field.slice(1)
                                }
                                min={field === "quantity" ? MIN_LITERS : undefined}
                                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#5E7141] outline-none transition"
                                required={["name", "email"].includes(field)}
                            />
                        )
                    )}

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Product details or special requirements"
                        className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2 resize-none focus:ring-2 focus:ring-[#5E7141] outline-none transition"
                    ></textarea>

                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsApp}
                            className="bg-[#25D366] text-white font-semibold px-10 py-3.5 rounded-full hover:bg-[#1DA851] transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            Send via WhatsApp
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmail}
                            className="bg-[#5E7141] text-white font-semibold px-10 py-3.5 rounded-full hover:bg-[#4c5d32] transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            Send via Email
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            {/* ✅ Animated Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            key="overlay"
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeCart}
                        />
                        <motion.div
                            key="drawer"
                            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                        >
                            <AddToCart close={closeCart} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default BulkOrderPage;
