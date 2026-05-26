import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Tag, X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const ProductManagement = () => {
    const { products, addProduct, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Truffles',
        desc: '',
        img: 'https://images.unsplash.com/photo-1549007994-cb92ca07e157?auto=format&fit=crop&q=80&w=800'
    });

    const categories = ['Truffles', 'Dark', 'Milk', 'Pralines', 'Gift Boxes', 'Seasonal'];

    const handleAdd = (e) => {
        e.preventDefault();
        addProduct({
            ...newProduct,
            price: parseFloat(newProduct.price)
        });
        setIsAdding(false);
        setNewProduct({ name: '', price: '', category: 'Truffles', desc: '', img: 'https://images.unsplash.com/photo-1549007994-cb92ca07e157?auto=format&fit=crop&q=80&w=800' });
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-display text-accent-cream">Product Inventory</h1>
                    <p className="text-accent-cream/40 uppercase tracking-[0.2em] text-[10px] mt-2 font-bold">Catalog Excellence</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-accent-gold text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg flex items-center gap-2 hover:brightness-110 transition-all"
                >
                    Add Selection <Plus size={16} />
                </button>
            </header>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-stone-900 border border-white/10 p-8 rounded-3xl w-full max-w-xl space-y-6 shadow-2xl relative"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold font-display">New Boutique Selection</h2>
                                <button onClick={() => setIsAdding(false)} className="text-accent-cream/40 hover:text-accent-gold transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Selection Name</label>
                                    <input
                                        required
                                        placeholder="e.g. Ivory Ganache Heart"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Price (LKR)</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="1500"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Category</label>
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold text-accent-cream appearance-none cursor-pointer"
                                        >
                                            {categories.filter(c => c !== 'All').map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Description</label>
                                    <textarea
                                        required
                                        placeholder="Describe the flavor notes and ingredients..."
                                        value={newProduct.desc}
                                        onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                                        className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold min-h-[100px] resize-none transition-all"
                                    />
                                </div>
                                <button type="submit" className="w-full py-4 gold-gradient text-primary font-bold uppercase tracking-widest rounded-xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all">Create Product</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-stone-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="relative min-w-[320px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/20" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl pl-12 pr-6 py-3 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                            placeholder="Search catalog by name..."
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-background-dark/30 text-[10px] uppercase tracking-[0.2em] text-accent-cream/30 font-bold">
                                <th className="px-8 py-6">Image</th>
                                <th className="px-8 py-6">Selection Name</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Pricing</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((p) => (
                                <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="w-12 h-12 bg-background-dark/80 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                                            <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-accent-cream">{p.name}</div>
                                        <div className="text-[10px] text-accent-cream/20 italic truncate max-w-[200px]">{p.desc}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-accent-cream/40">
                                            <Tag size={12} className="text-accent-gold/40" /> {p.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-display font-bold text-accent-gold">Rs. {p.price.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-right flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-accent-cream/30 hover:text-accent-gold transition-all" title="Edit Selection"><Edit2 size={18} /></button>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-accent-cream/30 hover:text-rose-500 transition-all"
                                            title="Delete Selection"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
