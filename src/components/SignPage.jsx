

import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { sendOtp, verifyOtp } from "../api/Authapi";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";

const SignPage = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [message, setMessage] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(null);

    const navigate = useNavigate();

    // ✅ Check localStorage on page load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.verified) {
            setVerifiedUser(storedUser);
        }
    }, []);

    // 📨 handle email change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContinue = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await sendOtp(formData.email);
            setMessage(`OTP sent to ${formData.email}`);
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        } else if (!value && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const enteredOtp = otp.join("");

        try {
            const res = await verifyOtp(formData.email, enteredOtp);
            setMessage(res.data.message);

            if (res.data.message === "OTP verified successfully") {
                const verifiedUser = { email: formData.email, verified: true };
                localStorage.setItem("user", JSON.stringify(verifiedUser));
                setVerifiedUser(verifiedUser);
                window.location.reload();
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Logout handler
    const handleLogout = () => {
        localStorage.removeItem("user");
        setVerifiedUser(null);
        setFormData({ email: "" });
        setOtp(["", "", "", ""]);
        setStep(1);
    };

    if (verifiedUser) {
        return <ProfilePage user={verifiedUser} onLogout={handleLogout} />;
    }

    return (
        <div className="h-screen bg-amber-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Logo" className="w-20 h-20 mb-3" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {step === 1 ? "Sign In" : "Enter OTP"}
                    </h1>
                    <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
                        {step === 1
                            ? "Enter your email and we’ll send you a verification code"
                            : `We’ve sent an OTP to ${formData.email}`}
                    </p>
                </div>

                {message && (
                    <p className="text-center text-red-500 mb-4">{message}</p>
                )}

                {step === 1 && (
                    <form onSubmit={handleContinue} className="flex flex-col gap-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border px-4 py-2 rounded-lg"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-amber-600 text-white rounded-lg py-2 hover:bg-amber-700"
                        >
                            {loading ? "Sending..." : "Continue"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-blue-700 underline text-center mt-2"
                        >
                            Go to Home
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                        <div className="flex justify-center gap-3">
                            {otp.map((d, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={d}
                                    onChange={(e) => handleOtpChange(e.target.value, i)}
                                    className="w-12 h-12 text-center border rounded-lg"
                                    required
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-amber-600 text-white rounded-lg py-2 hover:bg-amber-700"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <p
                            onClick={() => {
                                setStep(1);
                                setOtp(["", "", "", ""]);
                                setFormData({ email: "" });
                                setMessage("");
                            }}
                            className="text-blue-600 hover:underline text-center cursor-pointer"
                        >
                            Sign in with a different email
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-blue-700 underline text-center mt-2"
                        >
                            Go to Home
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignPage;
