import axiosConfig from "../api/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCoupon } from "../context/CouponContex";
import { useEffect, useState } from "react";

const AddressModal = ({ closeModal, totalAmount, cartItems }) => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const { appliedCoupon, calculateDiscount } = useCoupon();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserEmail(storedUser.email);
            fetchAddresses(storedUser.email);
        }
    }, []);

    const fetchAddresses = async (email) => {
        try {
            const res = await axiosConfig.get(`/detail/${email}`);
            setAddresses(res.data.addresses || []);
        } catch (err) {
            console.error(err);
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (orderData, payload) => {
        const res = await loadRazorpay();
        if (!res) return alert("Failed to load Razorpay SDK.");

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: "INR",
            name: "Pashupati Foods",
            description: "Order Payment",
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const verifyRes = await axiosConfig.post("/payment/verify", {
                        ...response,
                        ...payload,
                    });
                    if (verifyRes.data.success) {
                        alert("✅ Payment successful! Order confirmed.");
                        closeModal();
                        window.location.reload();
                    } else {
                        alert("❌ Payment verification failed.");
                    }
                } catch (err) {
                    alert("Server error during payment verification.");
                }
            },
            prefill: {
                email: userEmail,
                contact: selectedAddress?.phone,
                name: selectedAddress?.name,
            },
            theme: { color: "#f59e0b" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) return alert("Please select an address");
        if (!cartItems?.length) return alert("Your cart is empty");
        if (!totalAmount || totalAmount <= 0) return alert("Invalid total amount");
        if (!userEmail) return alert("User not logged in");

        let couponData = null;
        if (appliedCoupon) {
            const { discount } = calculateDiscount(
                totalAmount / (1 - (appliedCoupon.discountRate || 0))
            );
            couponData = {
                code: appliedCoupon.code,
                discountRate: appliedCoupon.discountRate || 0,
                flatDiscount: appliedCoupon.flatDiscount || 0,
                discountAmount: Number(discount.toFixed(2)),
            };
        }

        const payload = {
            userEmail,
            items: cartItems,
            totalAmount: Number(totalAmount.toFixed(2)),
            address: selectedAddress,
            coupon: couponData,
        };

        try {
            const orderRes = await axiosConfig.post("/payment/orders", {
                amount: payload.totalAmount,
            });

            if (orderRes.data.success) {
                await handlePayment(orderRes.data.order, payload);
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (err) {
            alert("Payment initialization failed.");
        }
    };

    const addNewAdd = () => {
        alert("Redirecting to Profile to add a new address");
        navigate("/Signin");
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[420px] p-6 relative"
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={22} />
                    </button>

                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                        Select Delivery Address
                    </h2>

                    {addresses.length > 0 ? (
                        <div className="space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                            {addresses.map((addr, i) => (
                                <motion.div
                                    key={i}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedAddress(addr)}
                                    className={`cursor-pointer border rounded-xl p-4 transition-all ${selectedAddress === addr
                                        ? "border-amber-600 bg-amber-50"
                                        : "border-gray-300 hover:border-amber-400"
                                        }`}
                                >
                                    <p className="font-medium text-gray-800">
                                        {addr.name} {addr.lastName || ""}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-tight mt-1">
                                        {addr.address}, {addr.localAddress}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {addr.city}, {addr.state} - {addr.pincode}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">📞 {addr.phone}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center mb-3">
                            No addresses found. Please add one in Profile → Address section.
                        </p>
                    )}

                    <button
                        className="mt-4 w-full border border-dashed border-amber-400 text-amber-600 rounded-lg py-2 hover:bg-amber-50 transition"
                        onClick={addNewAdd}
                    >
                        + Add New Address
                    </button>

                    <div className="border-t border-gray-200 mt-5 pt-3 flex justify-between text-gray-700 text-sm">
                        <p>Total Payable</p>
                        <p className="font-semibold text-gray-800">₹{totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="mt-5 space-y-2">
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium transition-all"
                        >
                            Pay & Confirm Order
                        </button>
                        <button
                            onClick={closeModal}
                            className="w-full text-gray-500 hover:text-gray-700 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AddressModal;
