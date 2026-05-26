import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
    { id: 1, name: "Midnight Truffle Collection", price: 18500, category: "Truffles", img: "https://images.unsplash.com/photo-1549007994-cb92ca07e157?auto=format&fit=crop&q=80&w=800", desc: "A dark, intense collection of single-origin truffles.", status: "Active" },
    { id: 2, name: "Sea Salt Caramel Heart", price: 1250, category: "Pralines", img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800", desc: "Velvety caramel with a hint of artisan sea salt.", status: "Active" },
    { id: 3, name: "70% Single Origin Bar", price: 3500, category: "Dark", img: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800", desc: "Pure chocolate excellence from a single estate.", status: "Active" },
    { id: 4, name: "Vanilla Bean Praline", price: 4200, category: "Milk", img: "https://images.unsplash.com/photo-1544967082-d9d25d807fc9?auto=format&fit=crop&q=80&w=800", desc: "Smooth milk chocolate with Madagascar vanilla.", status: "Active" }
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, { ...newProduct, id: Date.now(), status: "Active" }]);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
