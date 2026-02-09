import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductSection from './components/ProductSection';
import LenisScroll from './components/LenisScroll';
import CustomCursor from './components/CustomCursor';
import PaymentSuccess from './components/PaymentSuccess';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

const TopBar = () => (
    <div className="bg-charcoal text-ivory text-[10px] font-bold tracking-[0.2em] text-center py-2 uppercase border-b border-white/10">
        Complimentary shipping on orders over ₹999
    </div>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Initialize from LocalStorage
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });

    // Fake loading delay for premium feel
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCartItems([]);

    return (
        <Router>
            <LenisScroll>
                <div className="min-h-screen bg-ivory flex flex-col relative cursor-none">
                    <AnimatePresence>
                        {isLoading && <Preloader key="preloader" />}
                    </AnimatePresence>

                    <CustomCursor />
                    <div className="noise-overlay"></div>
                    <TopBar />
                    <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={toggleCart} />

                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home addToCart={addToCart} />} />
                            <Route path="/shop" element={<ProductSection addToCart={addToCart} />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={clearCart} />} />
                            <Route path="/success" element={<PaymentSuccess />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>

                    <Footer />

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
                </div>
            </LenisScroll>
        </Router>
    );
}

export default App;
