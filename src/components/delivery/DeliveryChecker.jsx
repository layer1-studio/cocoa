import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { checkDeliveryEligibility } from '../../utils/deliveryEligibility';

const DeliveryChecker = () => {
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('idle'); // idle, checking, eligible, ineligible

    const checkDelivery = (e) => {
        e.preventDefault();
        if (!address.trim()) return;
        setStatus('checking');
        setTimeout(() => {
            const { eligible } = checkDeliveryEligibility(address);
            setStatus(eligible ? 'eligible' : 'ineligible');
        }, 1500);
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="bg-stone-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 text-accent-gold mb-2">
                        <MapPin size={20} className="animate-bounce" />
                        <span className="text-xs uppercase tracking-[0.3em] font-bold">Delivery Radius Check</span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-accent-cream">Can we deliver to you?</h3>
                    <p className="text-accent-cream/40 text-sm italic">Enter your general area or street name to verify eligibility within our 15km artisanal radius.</p>

                    <form onSubmit={checkDelivery} className="relative">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. Cinnamon Gardens, Colombo 7"
                            className="w-full bg-background-dark border border-white/10 rounded-2xl py-5 pl-12 pr-32 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <button
                            type="submit"
                            disabled={status === 'checking'}
                            className="absolute right-2 top-2 bottom-2 bg-accent-gold text-primary px-6 rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center min-w-[100px]"
                        >
                            {status === 'checking' ? <Loader2 className="animate-spin" size={18} /> : 'Check'}
                        </button>
                    </form>

                    <AnimatePresence mode="wait">
                        {status === 'eligible' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500"
                            >
                                <CheckCircle2 size={24} />
                                <div className="text-left">
                                    <p className="font-bold text-sm uppercase tracking-widest">Yes, you're in! 🎉</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Complimentary freshness guaranteed within our radius.</p>
                                </div>
                            </motion.div>
                        )}

                        {status === 'ineligible' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500"
                            >
                                <XCircle size={24} />
                                <div className="text-left">
                                    <p className="font-bold text-sm uppercase tracking-widest">Almost there...</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">We currently deliver only within 15km of Colombo. Contact us for bulk inquiries!</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl group-hover:bg-accent-gold/10 transition-colors" />
            </div>
        </div>
    );
};

export default DeliveryChecker;
