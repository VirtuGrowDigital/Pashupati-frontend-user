import React, { createContext, useContext, useState } from "react";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
    const coupons = [
        { code: "PASHUPATI20", description: "Get 20% OFF on Checkout", discountRate: 0.2 },
        { code: "NEWUSER10", description: "Flat 10% OFF for new users", discountRate: 0.1 },
        { code: "FREESHIP", description: "Get Free Shipping (₹50 OFF)", discountRate: 0, flatDiscount: 50 },
    ];

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const applyCoupon = (inputCode) => {
        const code = inputCode.trim().toUpperCase();
        const validCoupon = coupons.find((c) => c.code === code);

        if (validCoupon) {
            setAppliedCoupon(validCoupon);
            return { success: true, coupon: validCoupon };
        }
        return { success: false };
    };

    const removeCoupon = () => setAppliedCoupon(null);

    const calculateDiscount = (totalAmount) => {
        if (!appliedCoupon) return { discount: 0, finalPrice: totalAmount };

        const { discountRate = 0, flatDiscount = 0 } = appliedCoupon;
        const discount = discountRate > 0
            ? totalAmount * discountRate
            : flatDiscount;

        const finalPrice = Math.max(totalAmount - discount, 0);
        return { discount, finalPrice };
    };

    return (
        <CouponContext.Provider
            value={{
                coupons,
                appliedCoupon,
                applyCoupon,
                removeCoupon,
                calculateDiscount,
            }}
        >
            {children}
        </CouponContext.Provider>
    );
};

export const useCoupon = () => useContext(CouponContext);
