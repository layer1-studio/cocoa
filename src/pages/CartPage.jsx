import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, Calendar, Clock, ArrowRight, MapPin } from 'lucide-react';
import DeliveryChecker from '../components/delivery/DeliveryChecker';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, deliveryFee, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-8">
                <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center mx-auto text-accent-cream/20">
                    <ShoppingBag size={48} />
                </div>
                <h2 className="text-4xl font-bold font-display">Your Collection is Empty</h2>
                <p className="text-accent-cream/40 italic">Indulge in our artisanal selections to begin your journey.</p>
                <Link to="/shop" className="inline-block gold-gradient text-primary px-12 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all">
                    Explore Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-white/5 pb-12">
                <div>
                    <h1 className="text-4xl font-bold font-display text-accent-cream mb-4">Your Collection</h1>
                    <p className="text-accent-cream/40 italic flex items-center gap-2">
                        <MapPin size={14} className="text-accent-gold" /> Verify your artisanal truffles and scheduled delivery window.
                    </p>
                </div>
                <div className="w-full md:w-auto">
                    <DeliveryChecker />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.cartId}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-stone-900/50 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-8 items-center"
                            >
                                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                                </div>

                                <div className="flex-grow space-y-2 text-center md:text-left">
                                    <h3 className="text-xl font-bold font-display text-accent-cream">{item.name}</h3>
                                    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start text-[10px] uppercase tracking-widest font-bold text-accent-gold">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {item.deliveryDate}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {item.deliverySlot}</span>
                                    </div>
                                    {item.personalMessage && (
                                        <p className="text-xs text-accent-cream/40 italic mt-2 line-clamp-1 border-l border-accent-gold/20 pl-4">"{item.personalMessage}"</p>
                                    )}
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-4 min-w-[120px]">
                                    <p className="text-xl font-bold text-accent-cream">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex items-center bg-background-dark/50 rounded-lg p-1 border border-white/5">
                                            <button
                                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-md text-accent-gold transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-3 font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-md text-accent-gold transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-8">
                    <div className="bg-stone-900 border border-white/5 rounded-3xl p-8 space-y-6 sticky top-32">
                        <div className="border-b border-white/5 pb-6">
                            <h3 className="text-xl font-bold font-display text-accent-cream mb-2">Collection Summary</h3>
                            <p className="text-[10px] text-accent-cream/40 uppercase tracking-widest font-bold">Bespoke Gifting Verification</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-accent-cream/6 Sri Lankan Rupees icon60">Subtotal</span>
                                <span className="text-accent-cream font-bold">Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-accent-cream/60">Boutique Delivery</span>
                                <span className="text-accent-cream font-bold">Rs. {deliveryFee.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between text-2xl font-display font-bold">
                                <span>Grand Total</span>
                                <span className="text-accent-gold">Rs. {total.toLocaleString()}</span>
                            </div>
                        </div>

                        {cart.some(item => item.personalMessage) && (
                            <div className="bg-accent-gold/5 rounded-2xl p-6 border border-accent-gold/10 space-y-3">
                                <p className="text-[10px] uppercase tracking-widest text-accent-gold font-bold flex items-center gap-2">
                                    <MessageSquare size={12} /> Personalized Message Preview
                                </p>
                                <div className="space-y-4 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin">
                                    {cart.filter(i => i.personalMessage).map(item => (
                                        <div key={item.cartId} className="border-l-2 border-accent-gold/30 pl-4 py-1">
                                            <p className="text-[8px] uppercase tracking-widest font-bold text-accent-cream/40 mb-1">{item.name}</p>
                                            <p className="text-xs italic text-accent-cream/70 leading-relaxed">"{item.personalMessage}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link
                            to="/checkout"
                            className="w-full gold-gradient text-primary py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3"
                        >
                            Proceed to Checkout <ArrowRight size={18} />
                        </Link>

                        <div className="text-[10px] text-accent-cream/30 uppercase tracking-[0.2em] text-center">
                            Hand-delivered within our 15km Colombo radius zone.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
