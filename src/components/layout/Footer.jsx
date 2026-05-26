import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <h2 className="text-accent-gold text-2xl font-bold tracking-widest uppercase font-display">Cocoa</h2>
                            <span className="text-[10px] tracking-[0.3em] text-accent-cream/60 uppercase">Boutique</span>
                        </div>
                        <p className="text-accent-cream/60 text-sm leading-relaxed">
                            Crafting exquisite moments of indulgence since 1994. Our chocolates are handmade daily in small batches.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-accent-cream/60 hover:text-accent-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-accent-cream/60 hover:text-accent-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-accent-cream/60 hover:text-accent-gold transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-accent-gold font-bold tracking-widest uppercase text-sm">Collections</h4>
                        <ul className="space-y-4 text-sm text-accent-cream/70">
                            <li><Link to="/shop" className="hover:text-accent-gold transition-colors text-accent-cream/60">Seasonal Specials</Link></li>
                            <li><Link to="/shop" className="hover:text-accent-gold transition-colors text-accent-cream/60">Truffle Assortment</Link></li>
                            <li><Link to="/shop" className="hover:text-accent-gold transition-colors text-accent-cream/60">Vegan Selection</Link></li>
                            <li><Link to="/bulk" className="hover:text-accent-gold transition-colors text-accent-cream/60">Bulk & Event Orders</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-accent-gold font-bold tracking-widest uppercase text-sm">Customer Care</h4>
                        <ul className="space-y-4 text-sm text-accent-cream/70">
                            <li><Link to="/shipping" className="hover:text-accent-gold transition-colors text-accent-cream/60">Shipping Information</Link></li>
                            <li><Link to="/returns" className="hover:text-accent-gold transition-colors text-accent-cream/60">Returns & Exchanges</Link></li>
                            <li><Link to="/track" className="hover:text-accent-gold transition-colors text-accent-cream/60">Track Your Order</Link></li>
                            <li><Link to="/contact" className="hover:text-accent-gold transition-colors text-accent-cream/60">Contact Us</Link></li>
                            <li><Link to="/scan" className="hover:text-accent-gold/40 transition-colors text-accent-cream/20 italic">Partner Portal</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-accent-gold font-bold tracking-widest uppercase text-sm">The Chocolatier Club</h4>
                        <p className="text-accent-cream/60 text-sm">Join for exclusive early access to seasonal launches.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-background-dark/50 border border-white/10 text-accent-cream text-sm rounded-lg focus:ring-accent-gold focus:border-accent-gold w-full p-2.5 outline-none transition-all"
                            />
                            <button className="bg-accent-gold text-primary px-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:brightness-110">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-accent-cream/40 uppercase tracking-[0.2em]">© 2024 Cocoa Boutique. All Rights Reserved.</p>
                    <div className="flex gap-8 text-[10px] text-accent-cream/40 uppercase tracking-[0.2em]">
                        <Link to="/privacy" className="hover:text-accent-cream transition-colors uppercase">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-accent-cream transition-colors uppercase">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
