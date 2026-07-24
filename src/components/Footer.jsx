import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-charcoal text-ivory pt-20 pb-10 border-t border-gold/10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="block w-48 mb-6">
                        <img
                            src="/images/ayodhya_logo.png"
                            alt="Ayodhya Agarbatti"
                            className="w-full h-auto filter invert hue-rotate-180 brightness-150 saturate-200 mix-blend-screen"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Crafting sacred fragrances that bridge the mortal and the divine. Hand-rolled in the holy city, utilizing ancient botanical wisdom.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all text-gray-400">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all text-gray-400">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all text-gray-400">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Shop</h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-300">
                        <li><Link to="/shop" className="hover:text-gold transition-colors">All Incense</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Gift Sets</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Accessories</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">Wholesale</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Company</h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-300">
                        <li><a href="/#heritage" className="hover:text-gold transition-colors">Our Story</a></li>
                        <li><Link to="/blog" className="hover:text-gold transition-colors">Journal</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Newsletter</h4>
                    <p className="text-gray-400 text-sm mb-6">Join our circle. Receive ritual guides and exclusive launches.</p>
                    <form className="flex border-b border-gold/30 pb-2">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-sm"
                        />
                        <button type="submit" className="text-xs uppercase tracking-widest text-gold hover:text-white transition-colors">Join</button>
                    </form>
                </div>

            </div>

            <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
                <p>&copy; 2024 Ayodhya Agarbatti. All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-400">Terms of Service</a>
                    <Link to="/admin" className="hover:text-gold transition-colors">Admin Access</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
