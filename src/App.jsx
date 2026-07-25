import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// Analytics & Fine-grained Event Logging
import { logPageView, logCartAction } from './utils/analyticsLogger';
import { trackPageView, trackAddToCart } from './utils/googleAnalytics';

// Components
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductSection from './components/ProductSection';
import LenisScroll from './components/LenisScroll';
import CustomCursor from './components/CustomCursor';
import PaymentSuccess from './components/PaymentSuccess';
import Preloader from './components/Preloader';
import SearchModal from './components/SearchModal';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import ReturnPolicy from './pages/ReturnPolicy';
import NotFound from './pages/NotFound';

const TopBar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('ayodhya_lang', lng);
    };

    return (
        <div className="bg-charcoal text-ivory text-[10px] font-bold tracking-[0.2em] text-center py-2 uppercase border-b border-white/10 flex items-center justify-between px-4 md:px-8">
            <div className="flex-1 text-center md:text-left flex items-center justify-center md:justify-start gap-4">
                <span>{t('topBar')}</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline text-gold">{t('freeShipping')}</span>
            </div>

            {/* i18n Language Selector */}
            <div className="flex items-center gap-1.5 shrink-0 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 text-[9px]">
                <Globe size={11} className="text-gold" />
                <button
                    onClick={() => changeLanguage('en')}
                    className={`px-1.5 py-0.5 rounded transition-colors ${i18n.language === 'en' ? 'bg-gold text-charcoal font-black' : 'text-white/70 hover:text-white'}`}
                >
                    EN
                </button>
                <span className="text-white/30">|</span>
                <button
                    onClick={() => changeLanguage('hi')}
                    className={`px-1.5 py-0.5 rounded transition-colors ${i18n.language === 'hi' ? 'bg-gold text-charcoal font-black' : 'text-white/70 hover:text-white'}`}
                >
                    हिंदी
                </button>
            </div>
        </div>
    );
};

// Automatic Route Navigation Activity & GA4 Tracker
const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        logPageView(location.pathname, document.title);
        trackPageView(location.pathname, document.title);
    }, [location]);

    return null;
};

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Initialize Cart from LocalStorage
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const calculateCartTotal = (items) => {
        return items.reduce((acc, item) => {
            const priceNum = parseInt(String(item.price || '0').replace(/[^0-9]/g, '')) || 0;
            return acc + priceNum * (item.quantity || 1);
        }, 0);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            let nextItems;
            if (existing) {
                nextItems = prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
                );
            } else {
                nextItems = [...prev, { ...product, quantity: product.quantity || 1 }];
            }

            // Log detailed minute cart addition event to database & GA4
            const cartTotal = calculateCartTotal(nextItems);
            const totalCount = nextItems.reduce((acc, i) => acc + i.quantity, 0);
            logCartAction('ADD_TO_CART', product, cartTotal, totalCount);
            trackAddToCart(product, product.quantity || 1);

            return nextItems;
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => {
            const removedItem = prev.find(item => item.id === id);
            const nextItems = prev.filter(item => item.id !== id);

            // Log detailed cart removal event to database
            const cartTotal = calculateCartTotal(nextItems);
            const totalCount = nextItems.reduce((acc, i) => acc + i.quantity, 0);
            logCartAction('REMOVE_FROM_CART', removedItem, cartTotal, totalCount);

            return nextItems;
        });
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => {
            const updatedItem = prev.find(item => item.id === id);
            const nextItems = prev.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            // Log detailed cart quantity update to database
            const cartTotal = calculateCartTotal(nextItems);
            const totalCount = nextItems.reduce((acc, i) => acc + i.quantity, 0);
            logCartAction('UPDATE_QUANTITY', updatedItem, cartTotal, totalCount);

            return nextItems;
        });
    };

    const clearCart = () => {
        logCartAction('CLEAR_CART', null, 0, 0);
        setCartItems([]);
    };

    return (
        <LenisScroll>
            <PageTracker />
            <div className="min-h-screen bg-ivory flex flex-col relative cursor-none">
                <AnimatePresence>
                    {isLoading && <Preloader key="preloader" />}
                </AnimatePresence>

                <CustomCursor />
                <div className="noise-overlay"></div>
                <TopBar />
                <Navbar
                    cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onCartClick={toggleCart}
                    onSearchClick={() => setIsSearchOpen(true)}
                />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home addToCart={addToCart} />} />
                        <Route path="/shop" element={<ProductSection addToCart={addToCart} isStandaloneShop={true} />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={clearCart} />} />
                        <Route path="/success" element={<PaymentSuccess />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/return-policy" element={<ReturnPolicy />} />
                        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />

                {/* Cart Drawer */}
                <AnimatePresence>
                    {isCartOpen && (
                        <Cart
                            isOpen={isCartOpen}
                            onClose={() => setIsCartOpen(false)}
                            items={cartItems}
                            onRemove={removeFromCart}
                            onUpdateQuantity={updateQuantity}
                        />
                    )}
                </AnimatePresence>

                {/* Search Modal */}
                <SearchModal
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    addToCart={addToCart}
                />
            </div>
        </LenisScroll>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
