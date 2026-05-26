import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, Calendar, QrCode, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    useEffect(() => {
        if (!state) navigate('/track', { replace: true });
    }, [state, navigate]);

    if (!state) return null;

    const { orderId, deliveryCode, deliveryDate, deliverySlot } = state;

    return (
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
            >
                <CheckCircle2 size={48} />
            </motion.div>

            <h1 className="text-5xl font-bold font-display text-accent-cream mb-6">Thank You For Your Order</h1>
            <p className="text-accent-cream/40 uppercase tracking-[0.3em] text-xs font-bold mb-12">Confirmation {orderId}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-stone-900 border border-white/5 rounded-3xl p-8 text-left space-y-4">
                    <h3 className="text-accent-gold font-bold uppercase tracking-widest text-[10px]">Delivery Schedule</h3>
                    <div className="flex items-center gap-4 text-accent-cream">
                        <Calendar size={20} className="text-accent-gold/40" />
                        <div>
                            <p className="font-bold">{deliveryDate}</p>
                            <p className="text-xs text-accent-cream/40 italic">{deliverySlot}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-stone-900 border border-accent-gold/20 rounded-3xl p-8 text-left space-y-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-gold/5 group-hover:bg-accent-gold/10 transition-colors" />
                    <h3 className="text-accent-gold font-bold uppercase tracking-widest text-[10px] relative z-10 flex items-center gap-2">
                        <QrCode size={12} /> Delivery Code
                    </h3>
                    <p className="text-3xl font-display font-bold text-accent-gold relative z-10 tracking-[0.2em]">{deliveryCode}</p>
                    <p className="text-[10px] text-accent-cream/40 uppercase tracking-widest relative z-10">Present this code to the delivery partner</p>
                </div>
            </div>

            <div className="space-y-6">
                <Link
                    to="/track"
                    className="inline-flex items-center gap-3 gold-gradient text-primary px-12 py-5 rounded-xl font-bold uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-95 transition-all"
                >
                    Track Shipment <Truck size={20} />
                </Link>
                <br />
                <Link to="/shop" className="inline-block text-accent-cream/40 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent-gold transition-colors">
                    Continue Exploring <ArrowRight size={12} className="inline ml-1" />
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
