
import { X, Trash2, Check, Copy, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContex";
import CheckOutPage from "./CheckOutPage";
import { useState } from "react";

const AddToCart = ({ close }) => {
    const { cartItems, increment, decrement, removeFromCart, totalPrice } = useCart();
    const { coupons, calculateDiscount } = useCoupon();
    const [showCheckout, setShowCheckout] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);

    const { discount, finalPrice } = calculateDiscount(totalPrice);

    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 1500);
    };

    return (
        <>
            {/* Cart Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 w-full sm:w-[420px] lg:w-[400px] h-screen bg-white shadow-2xl rounded-l-2xl flex flex-col transition-transform duration-300 ease-in-out ${showCheckout ? "blur-sm pointer-events-none" : ""
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gradient-to-b from-yellow-400 to-yellow-700 text-white rounded-tl-2xl">
                    <h2 className="font-semibold text-lg tracking-wide">
                        🛒 Your Cart ({cartItems.length})
                    </h2>
                    <button
                        onClick={close}
                        className="text-white/90 hover:text-white transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 border-b scrollbar-hide">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-400 mt-10 text-sm">
                            Your cart is empty 🛍️
                        </p>
                    ) : (
                        cartItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-xl shadow-sm transition"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm">
                                            <span className="line-through text-gray-400">
                                                ₹{item.originalPrice}
                                            </span>
                                            <span className="text-orange-600 font-semibold">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => decrement(item.productId)}
                                            className="border h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-700">{item.quantity}</span>
                                        <button
                                            onClick={() => increment(item.productId)}
                                            className="border h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="ml-auto text-gray-500 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Coupon Section */}
                {cartItems.length > 0 && (
                    <div className="px-4 py-3 bg-green-50 border-t border-b-2 max-h-[100px] overflow-y-auto scrollbar-hide">
                        <div className="flex items-center gap-2 mb-2">
                            <Tag className="text-green-600" size={18} />
                            <p className="font-semibold text-gray-800">Available Coupons</p>
                        </div>

                        <div className="space-y-2">
                            {coupons.map((coupon, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleCopyCoupon(coupon.code)}
                                    className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-green-400 cursor-pointer transition-all"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                                            {coupon.code}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {coupon.description}
                                        </p>
                                    </div>
                                    {copiedCode === coupon.code ? (
                                        <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                                            <Check size={16} /> Copied
                                        </span>
                                    ) : (
                                        <Copy
                                            size={18}
                                            className="text-gray-500 hover:text-green-600 transition"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-center text-gray-500 mt-2">
                            Tap a coupon to copy 💡
                        </p>
                    </div>
                )}

                {/* Totals */}
                {cartItems.length > 0 && (
                    <div className="p-4 bg-white shadow-inner rounded-b-2xl">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Subtotal:</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Discount:</span>
                            <span>-₹{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2 text-lg font-semibold">
                            <span>Total:</span>
                            <span>₹{finalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => setShowCheckout(true)}
                            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
                        >
                            Checkout
                        </button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Free Shipping on Orders Above ₹500
                        </p>
                    </div>
                )}
            </div>

            {/* Checkout Overlay */}
            {showCheckout && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center animate-fade-in">
                    <div className="relative bg-white w-full sm:w-[500px] md:w-[650px] lg:w-[800px] h-[90vh] rounded-xl shadow-2xl overflow-hidden">
                        <CheckOutPage
                            closeCheckout={() => setShowCheckout(false)}
                            originalTotal={finalPrice}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AddToCart;
