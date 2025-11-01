import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import AddToCart from "./AddTOcart";
import { useNavigate } from "react-router-dom";
import AddressModal from "./AddressModal";
import { useProducts } from "../context/ProductContext.jsx";

const ProductSection = () => {
  const { products } = useProducts();
  const { addToCart, cartItems, increment, decrement, isCartOpen, setIsCartOpen } = useCart();

  const [currentImages, setCurrentImages] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Initialize image indices
  useEffect(() => {
    const initImages = products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {});
    setCurrentImages(initImages);
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const updated = {};
        products.forEach((product) => {
          updated[product.id] = (prev[product.id] + 1) % product.images.length;
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  const closeCart = () => setIsCartOpen(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowAddressModal(true);
  };

  const handleBulk = () => {
    navigate("bulk");
  };
  // console.log("Products from context:", products)
  return (
    <section id="products" className="bg-[#5E7141] py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Product
          </h2>
          <button className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#5E7141] transition">
            <a
              href="https://www.instagram.com/pashupati_food_agro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Instagram
            </a>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {products.map((product) => {
            const cartItem = cartItems.find((item) => item.productId === product.id);

            return (
              <div
                key={product.id}
                className="bg-white shadow-xl hover:shadow-2xl transition duration-300 p-6 md:p-8 rounded-lg"
              >
                {/* Image Carousel */}
                <div className="relative w-full h-64 md:h-72 overflow-hidden mb-6">
                  <img
                    src={product.images[currentImages[product.id]]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setCurrentImages((prev) => ({ ...prev, [product.id]: index }))
                        }
                        className={`w-3 h-3 rounded-full ${currentImages[product.id] === index
                          ? "bg-white"
                          : "bg-gray-400/50"
                          }`}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center text-sm text-yellow-500 mb-4">
                    <span className="mr-2 text-green-600 font-medium">Review</span>
                    {"★".repeat(product.reviews)}
                  </div>

                  <p className="font-semibold text-gray-700 mb-2">Description:</p>
                  <ul className="list-disc list-inside text-gray-600 mb-4 text-sm space-y-1">
                    {product.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-green-600 text-lg font-medium">
                      ₹{product.price}
                    </span>
                    <span className="text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  {/* Add to Cart / Buy Now */}
                  <div className="flex justify-around items-center flex-wrap gap-3 sm:gap-4 mt-6">
                    {cartItem?.quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(product.id)}
                          className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded-lg hover:bg-gray-300 active:scale-95 transition-all"
                        >
                          -
                        </button>
                        <span className="text-gray-900 font-medium">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increment(product.id)}
                          className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded-lg hover:bg-gray-300 active:scale-95 transition-all"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-amber-50 text-amber-700 font-medium px-4 py-2 sm:px-6 md:px-8 rounded-lg border border-gray-400 shadow-sm hover:bg-amber-100 hover:shadow-md active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
                      >
                        Add to Cart
                      </button>
                    )}

                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-amber-600 text-white font-medium px-4 py-2 sm:px-6 md:px-8 rounded-lg shadow-md hover:bg-amber-700 active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Cart Drawer */}
                  {isCartOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeCart}
                      ></div>
                      <div className="relative z-10 flex">
                        <AddToCart close={closeCart} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bulk Order Button */}
        <div id="bulk-order" className="flex justify-center">
          <button
            onClick={handleBulk}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition animate-pulse"
          >
            Book Bulk Order
          </button>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && selectedProduct && (
        <AddressModal
          closeModal={() => setShowAddressModal(false)}
          totalAmount={selectedProduct.price}
          cartItems={[
            {
              productId: selectedProduct.id,
              name: selectedProduct.name,
              price: selectedProduct.price,
              quantity: 1,
            },
          ]}
        />
      )}
    </section>
  );
};

export default ProductSection;
