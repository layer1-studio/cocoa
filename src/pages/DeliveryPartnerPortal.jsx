import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShieldCheck, Truck, ArrowRight, XCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const DeliveryPartnerPortal = () => {
    const [pin, setPin] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate
    const { updateStatusByCode } = useOrders();

    const handleAuth = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            setIsAuthorized(true);
        } else {
            alert('Invalid PIN. Please contact the boutique manager.');
        }
    };

    const handleScan = (e) => {
        e.preventDefault();
        setStatus('loading');

        setTimeout(() => {
            const result = updateStatusByCode(code.toUpperCase(), 'Out for Delivery');
            if (result) {
                // Check if it was already delivered (OrderContext logic returns the order object)
                if (result.status === 'Delivered') {
                    setStatus('duplicate');
                } else {
                    setStatus('success');
                }

                setTimeout(() => {
                    setStatus('idle');
                    if (status !== 'duplicate') setCode('');
                }, 3000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        }, 1200);
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-stone-900 border border-white/5 rounded-3xl p-8 text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center text-accent-gold">
                            <ShieldCheck size={32} />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display">Partner Access</h2>
                        <p className="text-accent-cream/40 text-[10px] uppercase font-bold tracking-widest mt-2">Enter 4-Digit Security PIN</p>
                    </div>
                    <form onSubmit={handleAuth} className="space-y-6">
                        <input
                            type="password"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-3xl text-center tracking-[1em] outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                            placeholder="****"
                        />
                        <button type="submit" className="w-full py-4 bg-accent-gold text-primary font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all">Authorize Access</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-stone-900 border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -z-0" />

                <div className="relative z-10 text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-accent-gold/10 rounded-3xl flex items-center justify-center text-accent-gold border border-accent-gold/20 shadow-xl">
                            <QrCode size={40} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-display">Partner Portal</h2>
                        <p className="text-accent-cream/40 text-xs uppercase tracking-[0.2em] font-bold">Delivery Verification System</p>
                    </div>

                    <form onSubmit={handleScan} className="space-y-4">
                        <div className="space-y-3">
                            <label className="block text-[10px] uppercase tracking-widest text-accent-gold font-bold text-left ml-4">Enter Order Code</label>
                            <input
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="E.G. CX928P"
                                className="w-full bg-background-dark border border-white/10 rounded-2xl p-5 text-2xl font-display font-bold text-center tracking-[0.3em] uppercase outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all placeholder:text-white/5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 gold-gradient text-primary font-bold uppercase tracking-widest rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Verify & Update Status <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-4 text-emerald-500">
                                <ShieldCheck size={24} />
                                <div className="text-left">
                                    <p className="font-bold text-sm uppercase tracking-widest">Success</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Status: Out for Delivery</p>
                                </div>
                            </motion.div>
                        )}

                        {status === 'duplicate' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4 text-amber-500">
                                <XCircle size={24} />
                                <div className="text-left">
                                    <p className="font-bold text-sm uppercase tracking-widest">Already Delivered</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">This code has already been scanned.</p>
                                </div>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-4 text-rose-500">
                                <XCircle size={24} />
                                <div className="text-left">
                                    <p className="font-bold text-sm uppercase tracking-widest">Invalid Code</p>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Please verify the alphanumeric order ID.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="pt-8 border-t border-white/5">
                        <div className="flex items-center justify-center gap-4 text-accent-cream/30">
                            <Truck size={16} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Secure Delivery Partner Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPartnerPortal;
