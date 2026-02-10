import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onCartClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = scrolled
        ? "bg-charcoal shadow-lg py-3 border-b border-gold/10"
        : "bg-transparent py-4";

    // Light text for dark theme
    const textClass = "text-ivory";

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${navClass}`}>
            {/* Noise overlay for glass effect */}
            {scrolled && <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>}

            <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
                {/* Logo - Vivid Orange & Transparent via Screen Blend */}
                <Link to="/" className="block w-24 md:w-36">
                    <img
                        src="/images/ayodhya_logo.png"
                        alt="Ayodhya Agarbatti"
                        className="w-full h-auto filter invert hue-rotate-180 brightness-110 contrast-200 saturate-200 mix-blend-screen block"
                    />
                </Link>
                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center space-x-12 ${textClass}`}>
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Shop', path: '/shop' },
                        { name: 'Rituals', path: '/#ritual' },
                        { name: 'Journal', path: '/blog' },
                        { name: 'Contact', path: '/contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.name === 'Rituals' ? '' : item.path}
                            onClick={(e) => {
                                if (item.name === 'Rituals') {
                                    e.preventDefault();
                                    document.getElementById('ritual')?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="text-xs font-bold uppercase tracking-[0.2em] hover:text-gold transition-all relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2 ease-out"></span>
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className={`flex items-center space-x-6 ${textClass}`}>
                    <Search className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
                    <User className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
                    <div className="relative cursor-pointer" onClick={onCartClick}>
                        <ShoppingBag className="w-5 h-5 hover:text-gold transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    {/* Mobile Menu Button - Gold on Hover */}
                    <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6 hover:text-gold transition-colors" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Royal Maroon Theme */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 bg-charcoal z-50 flex flex-col items-center justify-center p-8 space-y-8 text-ivory"
                    >
                        <button className="absolute top-8 right-8" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-8 h-8 text-ivory hover:text-gold" />
                        </button>

                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Shop', path: '/shop' },
                            { name: 'Rituals', path: '/#ritual' },
                            { name: 'Journal', path: '/blog' },
                            { name: 'Contact', path: '/contact' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.name === 'Rituals' ? '' : item.path}
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    if (item.name === 'Rituals') {
                                        e.preventDefault();
                                        document.getElementById('ritual')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="font-serif text-3xl hover:text-gold transition-colors tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
