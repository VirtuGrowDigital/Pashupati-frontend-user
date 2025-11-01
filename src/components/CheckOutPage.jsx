
import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContex";
import { X } from "lucide-react";
import AddressModal from "./AddressModal";
import { useState } from "react";

const CheckOutPage = ({ closeCheckout, originalTotal, selectedProduct }) => {
    const { cartItems } = useCart();
    const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount } = useCoupon();
    const [coupon, setCoupon] = useState("");
    const [showAddressModal, setShowAddressModal] = useState(false);

    const { discount, finalPrice } = calculateDiscount(originalTotal);

    const handleApplyCoupon = () => {
        alert('service not available ')
        // const result = applyCoupon(coupon);
        // if (!result.success) {
        //     alert("Invalid coupon code");
        // } else {
        //     setCoupon("");
        // }
    };

    return (
        <>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                bg-white w-[90%] sm:w-[420px] md:w-[450px] max-w-md rounded-2xl shadow-2xl
                overflow-hidden animate-slideIn z-50"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-semibold text-gray-800 text-lg sm:text-xl">
                        Order Summary
                    </h2>
                    <button onClick={closeCheckout}>
                        <X className="text-gray-500 hover:text-gray-700" size={22} />
                    </button>
                </div>

                {/* Order Summary */}
                <div className="px-4 sm:px-5 py-4">
                    <div className="flex justify-between items-center mb-2">
                        {cartItems.length <= 0 && (
                            <p className="text-gray-600 text-sm sm:text-base">
                                {cartItems.length} Item
                            </p>
                        )}
                        {discount > 0 && (
                            <p className="text-green-600 font-semibold text-xs sm:text-sm">
                                ₹{discount.toFixed(2)} saved
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {discount > 0 ? (
                            <>
                                <p className="line-through text-gray-400 text-sm">
                                    ₹{originalTotal.toFixed(2)}
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-800">
                                    ₹{finalPrice.toFixed(2)}
                                </p>
                            </>
                        ) : (
                            <p className="text-lg sm:text-xl font-bold text-gray-800">
                                ₹{originalTotal.toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Coupon Section */}
                <div className="border-t border-gray-200 px-4 sm:px-5 py-4">
                    {!appliedCoupon ? (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-600 transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center bg-green-100 border border-green-300 text-green-700 rounded-lg px-3 py-2 text-sm">
                            <span>
                                ✅ “{appliedCoupon.code}” applied —{" "}
                                {appliedCoupon.discountRate
                                    ? `${appliedCoupon.discountRate * 100}% discount!`
                                    : appliedCoupon.flatDiscount
                                        ? `₹${appliedCoupon.flatDiscount} off!`
                                        : ""}
                            </span>
                            <button
                                onClick={removeCoupon}
                                className="text-red-500 text-xs font-semibold hover:underline ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Offers Checkbox */}
                <div className="border-t border-gray-200 px-4 sm:px-5 py-3 flex items-start space-x-2 text-gray-600 text-xs sm:text-sm">
                    <input type="checkbox" id="offers" className="accent-yellow-500 mt-[2px]" />
                    <label htmlFor="offers" className="leading-tight">
                        Send me order updates & offers – (no spam)
                    </label>
                </div>

                {/* Continue Button */}
                <div className="border-t border-gray-200 px-4 sm:px-5 py-4">
                    <button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-semibold text-base sm:text-lg transition-all"
                        onClick={() => setShowAddressModal(true)}
                    >
                        Continue
                    </button>
                </div>

                {/* Footer Note */}
                <div className="text-[10px] sm:text-[11px] text-center text-gray-500 px-4 sm:px-5 pb-3">
                    By proceeding, I agree to Gokwik’s{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
                    <span className="underline cursor-pointer">T&C</span>
                </div>
            </div>

            {showAddressModal && (
                <AddressModal
                    closeModal={() => setShowAddressModal(false)}
                    totalAmount={finalPrice}
                    cartItems={cartItems}
                />
            )}
        </>
    );
};

export default CheckOutPage;
