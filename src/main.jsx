import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProductProvider>
            <OrderProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </OrderProvider>
        </ProductProvider>
    </React.StrictMode>,
)
