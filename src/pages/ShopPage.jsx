import { useState } from 'react';
import { Search, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ShopPage = () => {
    const { products } = useProducts();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Dark', 'Pralines', 'Gift Boxes', 'Seasonal'];

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Search & Breadcrumb */}
            <div className="mb-12">
                <nav className="flex text-xs uppercase tracking-widest text-stone-500 mb-6">
                    <Link to="/" className="hover:text-accent-gold transition-colors">Boutique</Link>
                    <span className="mx-3">/</span>
                    <span className="text-accent-gold font-bold">All Collections</span>
                </nav>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-accent-cream mb-4 font-display">Our Masterpieces</h2>
                        <p className="text-accent-cream/60 max-w-2xl italic font-display text-lg">
                            Handcrafted with rare single-origin cocoa and the finest seasonal ingredients.
                        </p>
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-gold/50 group-hover:text-accent-gold transition-colors" size={20} />
                        <input
                            className="w-full bg-stone-900/50 border border-white/5 rounded-full py-4 pl-12 pr-6 focus:ring-1 focus:ring-accent-gold outline-none text-sm transition-all"
                            placeholder="Search collections..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between border-y border-white/5 py-8">
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide whitespace-nowrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                                ? 'bg-accent-gold text-primary shadow-lg shadow-accent-gold/20'
                                : 'bg-stone-900/50 text-accent-cream/60 hover:text-accent-gold hover:bg-stone-900'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-6 md:pt-0 border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Sort By:</span>
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <span className="text-sm font-bold text-accent-gold">Featured</span>
                            <ArrowUpDown size={14} className="text-accent-gold" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((prod) => (
                        <motion.div
                            key={prod.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="group flex flex-col"
                        >
                            <Link to={`/product/${prod.id}`} className="flex flex-col flex-grow">
                                <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-900 mb-6 shadow-2xl">
                                    <img
                                        src={prod.img}
                                        alt={prod.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-bold text-accent-cream group-hover:text-accent-gold transition-colors font-display mb-2">{prod.name}</h3>
                                    <p className="text-accent-gold font-display font-bold text-lg mb-4">Rs. {prod.price.toLocaleString()}</p>
                                    <p className="text-sm text-accent-cream/50 mb-6 line-clamp-2 italic px-4">{prod.desc}</p>
                                    <button className="w-full py-4 bg-primary border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-accent-gold hover:text-primary transition-all shadow-xl group-hover:shadow-accent-gold/10">
                                        <ShoppingBag size={18} />
                                        View Details
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-32 gap-6">
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 text-accent-cream/20 cursor-not-allowed">
                    Prev
                </button>
                <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full bg-accent-gold text-primary font-bold text-sm shadow-xl shadow-accent-gold/20">1</button>
                    <button className="w-12 h-12 rounded-full border border-white/5 text-accent-cream/40 font-bold text-sm hover:border-accent-gold hover:text-accent-gold transition-all">2</button>
                </div>
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 text-accent-gold hover:border-accent-gold transition-all">
                    Next
                </button>
            </div>
        </div>
    );
};

export default ShopPage;
