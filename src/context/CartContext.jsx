import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(getMinDate);
    const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('Morning (9AM - 12PM)');

    const addToCart = (product, settings) => {
        setCart(prev => [...prev, { ...product, ...settings, cartId: Date.now() }]);
    };

    const updateQuantity = (cartId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prev => prev.map(item =>
            item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const clearCart = () => setCart([]);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 1500 : 0;
    const total = subtotal + deliveryFee;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            subtotal,
            deliveryFee,
            total,
            selectedDeliveryDate,
            setSelectedDeliveryDate,
            selectedDeliverySlot,
            setSelectedDeliverySlot
        }}>
            {children}
        </CartContext.Provider>
    );
};
