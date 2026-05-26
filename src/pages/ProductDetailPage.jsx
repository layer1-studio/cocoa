import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Calendar, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { isSlotAvailable } = useOrders();

    const product = products.find(p => p.id === parseInt(id)) || products[0];

    const [quantity, setQuantity] = useState(1);
    const [personalMessage, setPersonalMessage] = useState('');

    const getMinDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toISOString().split('T')[0];
    };

    const [deliveryDate, setDeliveryDate] = useState(getMinDate());
    const [deliverySlot, setDeliverySlot] = useState('Morning (9AM - 12PM)');

    const timeSlots = [
        "Morning (9AM - 12PM)",
        "Afternoon (1PM - 4PM)",
        "Evening (5PM - 8PM)"
    ];

    const handleAddToCart = () => {
        if (!isSlotAvailable(deliveryDate, deliverySlot)) {
            alert("Sorry, this delivery slot has just been fully booked. Please select another time.");
            return;
        }

        addToCart(product, {
            quantity,
            personalMessage,
            deliveryDate,
            deliverySlot
        });
        alert(`${product.name} added to collection!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center text-xs uppercase tracking-[0.2em] text-accent-cream/40 mb-12">
                <Link to="/shop" className="hover:text-accent-gold transition-colors">Shop</Link>
                <ChevronRight size={12} className="mx-3" />
                <span className="text-accent-gold font-bold">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border border-white/5"
                >
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Product Details & Selection */}
                <div className="flex flex-col space-y-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-accent-cream mb-4">{product.name}</h1>
                        <p className="text-2xl font-display text-accent-gold font-bold">Rs. {product.price.toLocaleString()}</p>
                    </div>

                    <p className="text-accent-cream/70 text-lg leading-relaxed italic">
                        "{product.desc}"
                    </p>

                    <div className="space-y-8">
                        {/* Quantity */}
                        <div className="flex items-center gap-6">
                            <span className="text-xs uppercase tracking-widest text-accent-cream/40 font-bold">Quantity</span>
                            <div className="flex items-center bg-stone-900 rounded-xl p-1 border border-white/5">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors text-accent-gold"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors text-accent-gold"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Personalized Message */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-accent-gold">
                                <MessageSquare size={16} />
                                <span className="text-xs uppercase tracking-widest font-bold">Personalized Message</span>
                            </div>
                            <textarea
                                value={personalMessage}
                                onChange={(e) => setPersonalMessage(e.target.value)}
                                placeholder="Write a message to be included in the box..."
                                className="w-full bg-stone-900 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Delivery Schedule */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-accent-gold">
                                    <Calendar size={16} />
                                    <span className="text-xs uppercase tracking-widest font-bold">Delivery Date</span>
                                </div>
                                <input
                                    type="date"
                                    min={getMinDate()}
                                    value={deliveryDate}
                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                    className="w-full bg-stone-900 border border-white/5 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all color-scheme-dark"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-accent-gold">
                                    <Clock size={16} />
                                    <span className="text-xs uppercase tracking-widest font-bold">Time Slot</span>
                                </div>
                                <select
                                    value={deliverySlot}
                                    onChange={(e) => setDeliverySlot(e.target.value)}
                                    className="w-full bg-stone-900 border border-white/5 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all appearance-none"
                                >
                                    {timeSlots.map(slot => {
                                        const available = isSlotAvailable(deliveryDate, slot);
                                        return (
                                            <option key={slot} value={slot} disabled={!available}>
                                                {slot} {!available && "(Full)"}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-5 gold-gradient text-primary font-bold text-sm uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                        >
                            <ShoppingBag size={20} />
                            Add to Collection
                        </button>
                        <p className="text-center text-[10px] text-accent-cream/30 mt-4 uppercase tracking-widest">
                            Secure Checkout Preferred Payment Methods: Visa & Mastercard
                        </p>
                    </div>

                    <div className="bg-stone-900/40 rounded-2xl p-6 border border-white/5 space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-gold">Ingredients & Craft</h4>
                        <p className="text-xs text-accent-cream/50 leading-relaxed italic">{product.ingredients}</p>
                    </div>
                </div>
            </div>

            {/* Recommended Section (Simple) */}
            <section className="mt-32 pt-20 border-t border-white/5">
                <h2 className="text-3xl font-bold font-display text-accent-cream mb-12">Perfect Pairings</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[1, 2].map(i => (
                        <div key={i} className="group space-y-4">
                            <div className="aspect-square bg-stone-900 rounded-2xl overflow-hidden border border-white/5">
                                <div className="w-full h-full bg-stone-800 animate-pulse" />
                            </div>
                            <div className="h-4 w-3/4 bg-stone-800 animate-pulse rounded" />
                            <div className="h-4 w-1/4 bg-stone-800 animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
