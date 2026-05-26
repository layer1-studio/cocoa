import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Users, MessageSquare, Mail, Phone, User, MessageCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const BulkOrdersPage = () => {
    const { addInquiry } = useOrders();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', type: 'Corporate Gifting', qty: '', date: '', notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addInquiry({
            customer: formData.name,
            phone: formData.phone,
            email: formData.email,
            type: formData.type,
            qty: formData.qty,
            date: formData.date,
            notes: formData.notes
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-8">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-8 border border-accent-gold/30">
                    <MessageCircle size={40} />
                </motion.div>
                <h2 className="text-5xl font-bold font-display text-accent-cream">Inquiry Routed to Concierge</h2>
                <p className="text-accent-cream/60 max-w-md mx-auto italic text-lg line-height-relaxed">
                    "A WhatsApp notification has been sent to our boutique manager. Expect a curated proposal for your event within 12-24 hours."
                </p>
                <div className="pt-12">
                    <button onClick={() => setSubmitted(false)} className="text-accent-gold border-b border-accent-gold pb-1 font-bold uppercase tracking-widest text-xs hover:text-accent-cream transition-colors">Start Another Inquiry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
                <div className="space-y-4">
                    <span className="text-accent-gold tracking-[0.4em] uppercase text-sm font-bold">Boutique Services</span>
                    <h1 className="text-5xl md:text-6xl font-bold font-display text-accent-cream leading-tight">Corporate Gifting <br />& Grand Events</h1>
                    <div className="w-20 h-0.5 bg-accent-gold"></div>
                </div>

                <p className="text-accent-cream/70 text-lg leading-relaxed italic max-w-lg">
                    "From elegant corporate tokens to bespoke wedding favors, our master chocolatiers craft moments that leave a lasting impression."
                </p>

                <div className="space-y-6 pt-10">
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-gold border border-white/5">
                            <Users size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-accent-cream uppercase tracking-widest text-xs">Volume Excellence</h4>
                            <p className="text-xs text-accent-cream/40">Custom packaging for 50 to 5000+ pieces.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-gold border border-white/5">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-accent-cream uppercase tracking-widest text-xs">Priority Scheduling</h4>
                            <p className="text-xs text-accent-cream/40">Dedicated production slots for your event dates.</p>
                        </div>
                    </div>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="bg-stone-900/50 border border-white/5 rounded-3xl p-10 shadow-2xl space-y-6 backdrop-blur-sm"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input icon={<User size={18} />} placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <Input icon={<Phone size={18} />} placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <Input icon={<Mail size={18} />} placeholder="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Event Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all appearance-none text-accent-cream"
                        >
                            <option>Corporate Gifting</option>
                            <option>Wedding Favors</option>
                            <option>Private Celebration</option>
                            <option>Other Event</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Quantity Required</label>
                        <Input icon={<Users size={18} />} placeholder="e.g. 250 pieces" required value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Preferred Delivery Date</label>
                    <Input icon={<Calendar size={18} />} type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold ml-1">Special Requests</label>
                    <div className="relative">
                        <MessageSquare size={18} className="absolute left-4 top-4 text-accent-cream/20" />
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Tell us about your brand customization or dietary needs..."
                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 pl-12 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all min-h-[120px] resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-5 gold-gradient text-primary font-bold uppercase tracking-[0.2em] rounded-xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                >
                    <Send size={20} />
                    Submit Boutique Inquiry
                </button>
            </motion.form>
        </div>
    );
};

const Input = ({ icon, ...props }) => (
    <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/30 group-focus-within:text-accent-gold transition-colors">{icon}</div>}
        <input
            {...props}
            className={`w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all ${icon ? 'pl-12' : ''}`}
        />
    </div>
);

export default BulkOrdersPage;
