import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Lock, User, Phone, Mail, Calendar, ArrowRight, ShieldCheck, XCircle, Loader2 } from 'lucide-react';
import GoogleMapsSelector from '../components/delivery/GoogleMapsSelector';
import { checkDeliveryEligibility } from '../utils/deliveryEligibility';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isEligible, setIsEligible] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const { cart, subtotal, deliveryFee, total, clearCart, selectedDeliveryDate, selectedDeliverySlot } = useCart();
    const { addOrder } = useOrders();
    const navigate = useNavigate();

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentError(null);
        setTimeout(() => { handlePlaceOrder(); }, 1500);
    };

    const handlePlaceOrder = () => {
        const orderData = {
            customer: name || "Guest User",
            amount: `Rs. ${total.toLocaleString()}`,
            status: "Pending",
            deliveryDate: selectedDeliveryDate,
            slot: selectedDeliverySlot,
            message: cart[0]?.personalMessage || ""
        };

        try {
            const orderInfo = addOrder(orderData);
            clearCart();
            setIsProcessing(false);
            navigate('/order-confirmation', {
                state: {
                    orderId: orderInfo.orderId,
                    deliveryCode: orderInfo.deliveryCode,
                    deliveryDate: selectedDeliveryDate,
                    deliverySlot: selectedDeliverySlot
                }
            });
        } catch (error) {
            setPaymentError(error.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
                {[1, 2].map(i => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= i ? 'bg-accent-gold border-accent-gold text-primary shadow-lg shadow-accent-gold/20' : 'bg-background-dark border-white/10 text-accent-cream/40'}`}
                    >
                        {i}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3 space-y-8">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-3xl font-bold font-display">Delivery Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input icon={<User size={18} />} placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
                                <Input icon={<Phone size={18} />} placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <Input icon={<Mail size={18} />} placeholder="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-widest text-accent-gold font-bold ml-2">Ship to Precise Location</label>
                                <GoogleMapsSelector
                                    currentAddress={address}
                                    onSelect={(val) => {
                                        setAddress(val);
                                        const { eligible } = checkDeliveryEligibility(val);
                                        setIsEligible(eligible);
                                    }}
                                />
                                {isEligible === true && (
                                    <p className="text-emerald-500 text-[10px] uppercase tracking-widest font-bold ml-2">✅ Valid delivery area detected.</p>
                                )}
                                {isEligible === false && (
                                    <p className="text-amber-500 text-[10px] uppercase tracking-widest font-bold ml-2">⚠️ Outside delivery radius. Contact us for bulk orders.</p>
                                )}
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!isEligible}
                                className="w-full py-4 bg-accent-gold text-primary font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
                            >
                                Proceed to Payment
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <h2 className="text-3xl font-bold font-display">Secure Payment</h2>
                            <form onSubmit={handlePayment} className="space-y-6">
                                <div className="bg-stone-900 border border-white/5 rounded-2xl p-8 space-y-6">
                                    <div className="flex gap-4 mb-4">
                                        <div className="px-4 py-2 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold tracking-widest">VISA</div>
                                        <div className="px-4 py-2 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold tracking-widest">MASTERCARD</div>
                                    </div>
                                    <Input icon={<CreditCard size={18} />} placeholder="Card Number" required />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="MM/YY" required />
                                        <Input placeholder="CVC" icon={<Lock size={18} />} required maxLength={3} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {paymentError && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-500">
                                            <XCircle size={18} />
                                            <p className="text-xs font-bold uppercase tracking-widest">{paymentError}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full py-5 gold-gradient text-primary font-bold uppercase tracking-widest rounded-xl shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3"
                                >
                                    {isProcessing ? (
                                        <><Loader2 className="animate-spin" size={20} /> Securing Transaction...</>
                                    ) : (
                                        <>Confirm & Pay — Rs. {total.toLocaleString()}</>
                                    )}
                                </button>
                                <button type="button" onClick={() => setStep(1)} className="w-full text-accent-cream/40 text-xs uppercase tracking-widest hover:text-accent-gold transition-colors">Back to Delivery</button>
                            </form>
                        </motion.div>
                    )}
                </div>

                <div className="lg:col-span-2">
                    <div className="sticky top-32 bg-stone-900 border border-white/5 rounded-3xl p-8 space-y-6">
                        <h3 className="text-xl font-bold font-display">Order Summary</h3>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.cartId} className="flex justify-between text-sm">
                                    <span className="text-accent-cream/60">{item.name} ({item.quantity})</span>
                                    <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between text-sm">
                                <span className="text-accent-cream/60">Delivery Fee</span>
                                <span className="font-bold">Rs. {deliveryFee.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-display font-bold">
                                <span>Total</span>
                                <span className="text-accent-gold">Rs. {total.toLocaleString()}</span>
                            </div>
                        </div>
                        {cart.length > 0 && (
                            <div className="bg-accent-gold/5 rounded-xl p-4 border border-accent-gold/10">
                                <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-widest mb-1">
                                    <Calendar size={14} />
                                    <span>Scheduled Delivery</span>
                                </div>
                                <p className="text-[10px] text-accent-cream/60 uppercase tracking-widest">{selectedDeliveryDate} — {selectedDeliverySlot}</p>
                            </div>
                        )}
                        {cart[0]?.personalMessage && (
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold mb-2">Gift Message Preview</p>
                                <p className="text-xs italic text-accent-cream/60 line-clamp-2">"{cart[0].personalMessage}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = ({ icon, ...props }) => (
    <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/30 group-focus-within:text-accent-gold transition-colors">{icon}</div>}
        <input
            {...props}
            className={`w-full bg-stone-900 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all ${icon ? 'pl-12' : ''}`}
        />
    </div>
);

export default CheckoutPage;
