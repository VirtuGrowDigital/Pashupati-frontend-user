import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import OrderPage from "./OrderPage";
import AccountDetail from "./AccountDetail";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activePage, setActivePage] = useState("profile");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.verified) {
            navigate("/sign");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
        navigate("/Signin");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed left-0 right-0 top-0 z-50 flex justify-between items-center px-4 py-3 sm:px-6 md:px-10 lg:px-20 bg-white shadow-md max-w-full mx-auto">

                <div className="flex items-center gap-4 sm:gap-6">

                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            to="/"
                            className="text-sm sm:text-base md:text-lg text-gray-800 hover:text-amber-600 transition"
                        >
                            Shop
                        </Link>

                        <button
                            onClick={() => setActivePage("orders")}
                            className={`text-sm sm:text-base md:text-lg transition-all ${activePage === "orders"
                                ? "text-amber-600 font-semibold border-b-2 border-amber-600"
                                : "text-gray-800 hover:text-amber-600"
                                }`}
                        >
                            Orders
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <button
                        className="flex items-center gap-2 text-gray-700 font-medium"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <CgProfile size={26} />
                        {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 sm:w-52 bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden">

                            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border-b border-gray-100">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                                    <CgProfile className="text-2xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {user?.email}
                                    </p>
                                    <p className="text-xs text-gray-500">Verified user</p>
                                </div>
                            </div>

                            <div className="flex flex-col py-2">
                                <button
                                    className="px-4 py-2 text-left text-gray-700 hover:bg-amber-100 transition-all"
                                    onClick={() => setActivePage("profile")}
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-left text-gray-700 hover:bg-red-100 transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <main
                className="px-4 sm:px-6 md:px-10 lg:px-20 mt-2"
                onClick={() => setDropdownOpen(false)}
            >
                {activePage === "orders" && <OrderPage />}
                {activePage === "profile" && <AccountDetail />}
            </main>
        </div>
    );
};

export default ProfilePage;
