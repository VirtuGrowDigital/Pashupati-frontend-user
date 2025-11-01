import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axiosConfig from '../api/axiosConfig';

const AccountDetail = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || { email: "user@example.com" };
    const [showForm, setShowForm] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        address: "",
        apartment: "",
        localAddress: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    // Fetch all addresses for the user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosConfig.get(`/detail/${storedUser.email}`);
                if (res.data?.addresses?.length > 0) {
                    setAddresses(res.data.addresses);
                    setFormData(res.data.addresses[0]);
                    setCurrentAddressIndex(0);
                }
            } catch (err) {
                console.log("No existing addresses found, please add one");
            }
        };
        fetchUser();
    }, [storedUser.email]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert phone to number
        setFormData({
            ...formData,
            [name]: name === "phone" ? Number(value) : value
        });
    };

    // Validate required fields
    const validateForm = () => {
        const requiredFields = ["name", "address", "localAddress", "city", "state", "pincode", "phone"];
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === "") {
                alert(`Please fill ${field}`);
                return false;
            }
        }
        return true;
    };

    // Save or update current address
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            let res;
            if (currentAddressIndex < addresses.length) {
                // Update existing address
                res = await axiosConfig.put(
                    `/detail/updateAddress/${storedUser.email}/${currentAddressIndex}`,
                    formData
                );
            } else {
                // Add new address
                res = await axiosConfig.post(
                    `/detail/addAddress/${storedUser.email}`,
                    formData
                );
            }

            alert("Profile saved successfully!");
            setAddresses(res.data.user.addresses);
            setShowForm(false);
            setCurrentAddressIndex(res.data.user.addresses.length - 1);
            setFormData(res.data.user.addresses[res.data.user.addresses.length - 1]);
        } catch (error) {
            console.error("Error saving profile:", error.response?.data || error.message);
            alert("Error saving profile");
        }
    };

    // Switch to a different address
    const handleSelectAddress = (index) => {
        setCurrentAddressIndex(index);
        setFormData(addresses[index]);
    };

    // Open new address form
    const handleAddNew = () => {
        setCurrentAddressIndex(addresses.length);
        setFormData({
            name: "",
            lastName: "",
            address: "",
            apartment: "",
            localAddress: "",
            city: "",
            state: "",
            pincode: "",
            phone: ""
        });
        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10 pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
                {/* Profile Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
                </div>

                {/* Profile Details */}
                <div className="space-y-6">
                    {/* Name */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-700">Name</h2>
                        <motion.button
                            className="text-amber-600 hover:text-amber-800"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowForm(true)}
                        >
                            <FaPen size={18} />
                        </motion.button>
                    </div>
                    <p className="text-sm text-gray-500">{formData.name || "Not Provided"}</p>

                    {/* Email */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-700">Email</h2>
                    </div>
                    <p className="text-sm text-gray-500">{storedUser.email}</p>

                    {/* Addresses */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-700">Addresses</h2>
                        <button
                            className="text-amber-600 hover:text-amber-800"
                            onClick={handleAddNew}
                        >
                            Add New
                        </button>
                    </div>

                    {/* Address Selector */}
                    <div className="flex flex-col space-y-2">
                        {addresses.length > 0 ? (
                            addresses.map((addr, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 border rounded-lg cursor-pointer ${currentAddressIndex === idx ? "border-amber-600 bg-amber-50" : "border-gray-300"}`}
                                    onClick={() => handleSelectAddress(idx)}
                                >
                                    <p>{addr.address}, {addr.city}</p>
                                    <p>{addr.state} - {addr.pincode}</p>
                                    <p>Phone: {addr.phone}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No addresses added</p>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Modal Overlay ===== */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-lg relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                                {currentAddressIndex < addresses.length ? "Edit Address" : "Add Address"}
                            </h2>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex space-x-4">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name || ""}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName || ""}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address || ""}
                                        onChange={handleChange}
                                        placeholder="Full address"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Local Address / Landmark</label>
                                    <input
                                        type="text"
                                        name="localAddress"
                                        value={formData.localAddress || ""}
                                        onChange={handleChange}
                                        placeholder="Near XYZ"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city || ""}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state || ""}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode || ""}
                                            onChange={handleChange}
                                            placeholder="PIN Code"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={formData.phone || ""}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-all"
                                    >
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccountDetail;
