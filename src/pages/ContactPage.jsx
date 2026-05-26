import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold font-display text-accent-cream mb-6">Contact the Atelier</h1>
                <p className="text-accent-cream/40 uppercase tracking-[0.2em] text-xs font-bold">Inquiries & Private Consultations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-display text-accent-gold">Visit Us</h2>
                        <div className="flex items-start gap-4 text-accent-cream/70 leading-relaxed italic">
                            <MapPin className="text-accent-gold flex-shrink-0" size={20} />
                            <p>12 Place de la Madeleine, 75008 Paris, France</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-display text-accent-gold">Reach Out</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-accent-cream/70 leading-relaxed italic">
                                <Phone className="text-accent-gold flex-shrink-0" size={20} />
                                <p>+33 (0)1 42 65 24 47</p>
                            </div>
                            <div className="flex items-center gap-4 text-accent-cream/70 leading-relaxed italic">
                                <Mail className="text-accent-gold flex-shrink-0" size={20} />
                                <p>atelier@cocoaboutique.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-display text-accent-gold">Opening Hours</h2>
                        <div className="text-accent-cream/70 space-y-2 text-sm uppercase tracking-widest font-bold">
                            <p className="flex justify-between"><span>Mon - Sat</span> <span>10:00 - 19:30</span></p>
                            <p className="flex justify-between"><span>Sunday</span> <span>11:00 - 18:00</span></p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-stone-900 border border-white/5 rounded-3xl p-8 shadow-2xl"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Name</label>
                                <input className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Email</label>
                                <input className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Subject</label>
                            <select className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all appearance-none">
                                <option>Order Inquiry</option>
                                <option>Private Tasting</option>
                                <option>Corporate Gifts</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Message</label>
                            <textarea className="w-full bg-background-dark/50 border border-white/5 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all min-h-[150px] resize-none"></textarea>
                        </div>
                        <button className="w-full py-5 gold-gradient text-primary font-bold uppercase tracking-widest rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
