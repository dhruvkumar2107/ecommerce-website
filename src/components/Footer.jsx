import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Youtube, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus({ loading: true, success: false, error: '' });
        try {
            await addDoc(collection(db, "subscribers"), {
                email: email.trim(),
                subscribedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                createdAt: serverTimestamp()
            });
            setStatus({ loading: false, success: true, error: '' });
            setEmail('');
        } catch (err) {
            console.error("Error subscribing email to database:", err);
            setStatus({ loading: false, success: false, error: 'Failed to subscribe. Please try again.' });
        }
    };
    return (
        <footer className="bg-charcoal text-ivory pt-20 pb-10 border-t border-gold/10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="block w-48 mb-6">
                        <img
                            src="/images/ayodhya_logo.png"
                            alt="Ayodhya Agarbatti"
                            className="w-full h-auto"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Crafting 100% natural, charcoal-free sacred fragrances. Hand-rolled in the holy city of Ayodhya.
                    </p>
                    <div className="flex space-x-3">
                        <a
                            href="https://www.instagram.com/ayodhyaagarbatti/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ayodhya Agarbatti Instagram (@ayodhyaagarbatti)"
                            title="Instagram (@ayodhyaagarbatti)"
                            className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all text-gray-300"
                        >
                            <Instagram size={17} />
                        </a>
                        <a
                            href="https://www.facebook.com/ayodhyaagarbatti"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ayodhya Agarbatti Facebook"
                            title="Facebook (Ayodhya Agarbatti)"
                            className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all text-gray-300"
                        >
                            <Facebook size={17} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ayodhya-agarbatti-122b22418/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ayodhya Agarbatti LinkedIn"
                            title="LinkedIn (Ayodhya Agarbatti)"
                            className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all text-gray-300"
                        >
                            <Linkedin size={17} />
                        </a>
                        <a
                            href="https://www.youtube.com/@ayodhyaagarbatti"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Ayodhya Agarbatti YouTube (@ayodhyaagarbatti)"
                            title="YouTube (@ayodhyaagarbatti)"
                            className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all text-gray-300"
                        >
                            <Youtube size={17} />
                        </a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Collection</h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-300">
                        <li><Link to="/shop" className="hover:text-gold transition-colors">All Incense (33 Sticks)</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Espresso Ground (Coffee)</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Madagascan Calm (Vanilla)</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Citrus Clarity (Lemon)</Link></li>
                        <li><Link to="/shop" className="hover:text-gold transition-colors">Creative Spark (Orange)</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Company</h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-300">
                        <li><Link to="/#heritage" className="hover:text-gold transition-colors">Our Story</Link></li>
                        <li><Link to="/blog" className="hover:text-gold transition-colors">Journal</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="col-span-1">
                    <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Newsletter</h4>
                    <p className="text-gray-400 text-sm mb-6">Join our circle. Receive ritual guides and exclusive launches.</p>
                    {status.success ? (
                        <div className="flex items-center gap-2 text-gold text-xs font-semibold py-2">
                            <Check size={16} /> Subscribed to database successfully!
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex border-b border-gold/30 pb-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                aria-label="Email Address for newsletter"
                                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="text-xs uppercase tracking-widest text-gold hover:text-white transition-colors disabled:opacity-50"
                            >
                                {status.loading ? 'Saving...' : 'Join'}
                            </button>
                        </form>
                    )}
                    {status.error && <p className="text-red-400 text-xs mt-2">{status.error}</p>}
                </div>

            </div>

            <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <p>&copy; {new Date().getFullYear()} Ayodhya Agarbatti. All rights reserved.</p>
                <div className="flex space-x-6">
                    <Link to="/admin" className="hover:text-gold transition-colors">Admin Access</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
