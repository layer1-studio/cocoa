import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Truck, CheckCircle2, Box, Package, QrCode, XCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const OrderTrackingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeOrder, setActiveOrder] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { orders, cancelOrder } = useOrders();

    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;
        const found = orders.find(o => o.id === q || o.id.includes(q));
        if (found) {
            setActiveOrder(found);
            setNotFound(false);
        } else {
            setActiveOrder(null);
            setNotFound(true);
        }
    };

    const steps = activeOrder ? [
        { id: 1, label: "Order Received", status: "complete", icon: <CheckCircle2 size={24} /> },
        { id: 2, label: "Preparing", status: activeOrder.status === 'Preparing' || activeOrder.status === 'Pending' ? 'current' : 'complete', icon: <Box size={24} /> },
        { id: 3, label: "Out for Delivery", status: activeOrder.status === 'Out for Delivery' ? 'current' : activeOrder.status === 'Delivered' ? 'complete' : 'upcoming', icon: <Truck size={24} /> },
        { id: 4, label: "Delivered", status: activeOrder.status === 'Delivered' ? 'current' : 'upcoming', icon: <Package size={24} /> }
    ] : [];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-display mb-6">Track Your Order</h2>
                <p className="text-accent-cream/60 italic mb-8">Enter your order ID (#CC-XXXXX) to see the current status.</p>
                <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/20 group-focus-within:text-accent-gold transition-colors" size={20} />
                    <input
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setNotFound(false); }}
                        placeholder="Search by Order ID..."
                        className="w-full bg-stone-900 border border-white/5 rounded-full py-4 pl-12 pr-24 outline-none focus:ring-1 focus:ring-accent-gold transition-all font-bold"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-accent-gold text-primary px-6 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110">Track</button>
                </form>
            </div>

            {!activeOrder && !notFound && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-accent-cream/30">
                    <Search size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm uppercase tracking-widest font-bold">Enter an order ID above to track your delivery</p>
                </motion.div>
            )}

            {notFound && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                    <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                        <XCircle size={36} className="text-rose-500" />
                    </div>
                    <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-2">Order Not Found</p>
                    <p className="text-accent-cream/40 text-xs uppercase tracking-widest">No order matching "{searchQuery}" could be found. Please check the ID and try again.</p>
                </motion.div>
            )}

            {activeOrder && (
                <div className="bg-stone-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl space-y-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-white/5 pb-10">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-1">Order ID</p>
                                <p className="text-2xl font-bold text-accent-cream">{activeOrder.id}</p>
                            </div>
                            <div className="h-12 w-px bg-white/5 hidden md:block" />
                            <div className="bg-accent-gold/5 border border-accent-gold/20 rounded-xl px-4 py-2">
                                <p className="text-[8px] uppercase tracking-widest text-accent-gold font-bold mb-1 flex items-center gap-1">
                                    <QrCode size={10} /> Delivery Code
                                </p>
                                <p className="font-display font-bold text-accent-gold tracking-[0.1em]">{activeOrder.deliveryCode}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold mb-1">Expected Delivery</p>
                            <p className="text-lg font-bold text-accent-cream">{activeOrder.deliveryDate}</p>
                        </div>
                    </div>

                    {activeOrder.status === 'Cancelled' ? (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-10 text-center space-y-4">
                            <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-rose-500/20">
                                <XCircle size={40} />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-rose-500">Order Cancelled</h3>
                            <p className="text-accent-cream/60 italic max-w-md mx-auto">
                                Your order has been cancelled. An automatic refund of <strong>{activeOrder.amount}</strong> has been processed through your original payment method.
                            </p>
                            <p className="text-[10px] text-rose-500/60 font-bold uppercase tracking-[0.2em]">Transaction: Refunded (Automatic)</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative pb-10">
                            <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-0.5 bg-white/5" />
                            {steps.map((step, i) => (
                                <div key={i} className="flex flex-col items-center text-center space-y-4 relative z-10">
                                    <div
                                        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${step.status === 'complete' ? 'bg-accent-gold border-accent-gold text-primary shadow-lg shadow-accent-gold/20' :
                                            step.status === 'current' ? 'bg-primary border-accent-gold text-accent-gold shadow-lg shadow-accent-gold/10 scale-110' :
                                                'bg-background-dark border-white/10 text-accent-cream/20'
                                            }`}
                                    >
                                        {step.icon}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold uppercase tracking-widest ${step.status === 'upcoming' ? 'text-accent-cream/20' : 'text-accent-cream'}`}>{step.label}</p>
                                        {step.status === 'current' && <p className="text-[10px] text-accent-gold mt-1 animate-pulse font-bold tracking-widest">IN PROGRESS</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-accent-gold/5 rounded-2xl p-8 border border-accent-gold/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-accent-gold font-bold text-xs uppercase tracking-widest">
                                <Truck size={18} /> Delivery Verification Required
                            </div>
                            {['Pending', 'Preparing'].includes(activeOrder.status) && (
                                <button
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to cancel this order? A full refund will be processed automatically.")) {
                                            cancelOrder(activeOrder.id);
                                            setActiveOrder(prev => ({ ...prev, status: 'Cancelled' }));
                                        }
                                    }}
                                    className="text-[10px] font-bold text-rose-500 hover:text-rose-400 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                                >
                                    <XCircle size={14} /> Cancel Order
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-accent-cream/60 leading-relaxed italic">
                            "Your artisanal selection is assigned a unique <strong>Delivery Code</strong>. This code must be presented to our delivery partner for scanning upon arrival."
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-12 text-center pb-20">
                <p className="text-xs text-accent-cream/40 uppercase tracking-widest mb-4">Are you a delivery partner?</p>
                <Link to="/scan" className="text-sm font-bold text-accent-gold hover:text-accent-cream underline transition-colors">Access Scanning Portal</Link>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
