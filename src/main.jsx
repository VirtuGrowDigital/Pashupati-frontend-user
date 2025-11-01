import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CouponProvider } from './context/CouponContex.jsx'
import { ProductProvider } from './context/ProductContext.jsx.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <CouponProvider>
          <App />
        </CouponProvider>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
)
