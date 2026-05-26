import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart();

    return (
        <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-accent-gold p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <nav className="hidden lg:flex items-center gap-8">
                        <Link to="/shop" className="text-accent-cream/80 hover:text-accent-gold text-sm font-bold tracking-widest uppercase transition-colors">Shop</Link>
                        <Link to="/shop" className="text-accent-cream/80 hover:text-accent-gold text-sm font-bold tracking-widest uppercase transition-colors">Collections</Link>
                    </nav>
                </div>

                <Link to="/" className="flex flex-col items-center group">
                    <h1 className="text-accent-gold text-2xl font-bold tracking-widest uppercase font-display group-hover:scale-105 transition-transform">Cocoa</h1>
                    <span className="text-[10px] tracking-[0.3em] text-accent-cream/60 uppercase">Boutique</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/admin" className="hidden sm:block text-accent-cream/40 hover:text-accent-gold text-[10px] tracking-widest uppercase transition-colors">Admin</Link>
                    <Link to="/cart" className="text-accent-gold p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                        <ShoppingBag size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-1 right-1 bg-accent-gold text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-background-dark/98 backdrop-blur-xl border-b border-white/5 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-accent-cream text-xl font-bold tracking-widest uppercase">Shop</Link>
                    <Link to="/collections" onClick={() => setIsMenuOpen(false)} className="text-accent-cream text-xl font-bold tracking-widest uppercase">Collections</Link>
                    <Link to="/track" onClick={() => setIsMenuOpen(false)} className="text-accent-cream text-xl font-bold tracking-widest uppercase">Track Order</Link>
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-accent-cream/40 text-sm font-bold tracking-widest uppercase pt-4 border-t border-white/5">Admin Access</Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
