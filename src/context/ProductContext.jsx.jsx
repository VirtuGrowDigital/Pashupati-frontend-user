import React, { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../api/axiosConfig";

import product1Img1 from "../assets/image 13.png";
import product1Img2 from "../assets/image 14.png";
import product2Img1 from "../assets/image 14.png";
import product2Img2 from "../assets/image 13.png";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [bulkproducts] = useState([
        {
            id: 3,
            name: "Wood Pressed Mustard Oil (5L*10pack)",
            images: [product1Img1, product1Img2],
            reviews: 5,
            description: [
                "Wood-Pressed & Nutrient-Rich.",
                "Rich in MUFA, PUFA, Omega 3 & 6.",
                "Acts as Natural Sunscreen & Anti-Aging Aid.",
            ],
            price: 15000,
            originalPrice: 17400,
        },
        {
            id: 4,
            name: "Wood-Pressed Mustard Oil (1L*50)",
            images: [product2Img1, product2Img2],
            reviews: 5,
            description: [
                "Wood-Pressed & Nutrient-Rich.",
                "Rich in MUFA, PUFA, Omega 3 & 6.",
                "Acts as Natural Sunscreen & Anti-Aging Aid.",
            ],
            price: 15000,
            originalPrice: 17400,
        },
    ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axiosConfig.get("/products");
                const backendData = res.data.data || [];

                // Normalize data shape
                const normalized = backendData.map((p, index) => ({
                    id: p._id || index + 1,
                    name: p.name,
                    images: Array.isArray(p.images) && p.images.length ? p.images : [product1Img1],
                    description: Array.isArray(p.description)
                        ? p.description
                        : [p.description || "No description available."],
                    price: p.price || 0,
                    originalPrice: p.originalPrice || p.price * 1.2 || 0,
                    reviews: p.reviews || 5,
                }));

                setProducts(normalized);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductById = (id) => {
        return (
            products.find((p) => p.id === id || p._id === id) ||
            bulkproducts.find((b) => b.id === id)
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                bulkproducts,
                allProducts: [...products, ...bulkproducts],
                getProductById,
                loading,
                error,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
