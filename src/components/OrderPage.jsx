import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import {
    PackageCheck,
    Truck,
    XCircle,
    Clock,
    MapPin,
    Tag,
    ShoppingBag,
    IndianRupee,
    CalendarDays,
} from "lucide-react";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser) return setOrders([]);

                const res = await axiosConfig.get(
                    `/order/orders?userEmail=${storedUser.email}`
                );
                if (res.data.success) {
                    setOrders(res.data.orders);
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return <PackageCheck className="w-5 h-5 text-green-600" />;
            case "shipped":
                return <Truck className="w-5 h-5 text-blue-600" />;
            case "cancelled":
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-yellow-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-700 border-green-300";
            case "shipped":
                return "bg-blue-100 text-blue-700 border-blue-300";
            case "cancelled":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-amber-500"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto mt-16 p-10 bg-white rounded-2xl shadow-md text-center">
                <ShoppingBag className="mx-auto text-amber-500 w-12 h-12 mb-4" />
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                    No Orders Yet
                </h1>
                <p className="text-gray-600 mb-6">
                    Looks like you haven’t ordered anything yet.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all"
                >
                    Explore Store
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto mt-17 p-4 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
                Your Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => {
                    const status = order.status || "Pending";

                    return (
                        <div
                            key={order._id}
                            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <PackageCheck className="w-5 h-5 text-amber-600" />
                                    <p className="font-semibold text-gray-700">
                                        Order ID:{" "}
                                        <span className="font-bold text-gray-900">
                                            {order._id}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
                                    <CalendarDays className="w-4 h-4 mr-1" />
                                    {new Date(order.createdAt).toLocaleString()}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 mb-4">
                                {getStatusIcon(status)}
                                <span
                                    className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                                        status
                                    )}`}
                                >
                                    {status}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="mb-4">
                                <div className="flex items-center mb-1">
                                    <ShoppingBag className="w-4 h-4 text-gray-700 mr-2" />
                                    <p className="font-medium text-gray-700">Items</p>
                                </div>
                                <ul className="space-y-1 text-gray-600 bg-gray-50 p-3 rounded-xl">
                                    {order.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between border-b border-gray-100 last:border-none pb-1"
                                        >
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="font-semibold">
                                                ₹{item.price.toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <div className="flex items-center mb-1">
                                    <MapPin className="w-4 h-4 text-gray-700 mr-2" />
                                    <p className="font-medium text-gray-700">Delivery Address</p>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl">
                                    {order.address.name} {order.address.lastName || ""},{" "}
                                    {order.address.address}, {order.address.localAddress},{" "}
                                    {order.address.city}, {order.address.state} -{" "}
                                    {order.address.pincode}
                                    <br />
                                    <span className="text-gray-500">
                                        📞 {order.address.phone}
                                    </span>
                                </p>
                            </div>

                            {/* Coupon */}
                            {order.coupon && (
                                <div className="mt-3 flex items-center bg-amber-50 border border-amber-200 p-3 rounded-xl">
                                    <Tag className="w-4 h-4 text-amber-600 mr-2" />
                                    <div>
                                        <p className="text-gray-700 font-medium">Coupon Applied:</p>
                                        <p className="text-amber-700 text-sm font-semibold">
                                            {order.coupon.code
                                                ? order.coupon.code
                                                : JSON.stringify(order.coupon)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div className="flex justify-between items-center mt-5 border-t pt-4">
                                <div className="flex items-center space-x-2 text-gray-800 font-semibold">
                                    <IndianRupee className="w-4 h-4" />
                                    <p>Total Amount</p>
                                </div>
                                <p className="text-lg font-bold text-gray-900">
                                    ₹{order.totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderPage;
