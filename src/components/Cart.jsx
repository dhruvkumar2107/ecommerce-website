import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
    // Parse price string (e.g. "₹450") to integer (450)
    const total = items.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (price * item.quantity);
    }, 0);

    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-charcoal/20 z-50 backdrop-blur-sm"
            />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-ivory z-50 border-l border-charcoal/5 p-6 flex flex-col shadow-2xl"
            >
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-charcoal/5">
                    <div className="flex items-center gap-3">
                        <h2 className="font-heading text-2xl text-charcoal">Your Bag</h2>
                        <span className="bg-charcoal/5 text-charcoal text-[10px] px-2 py-1 rounded-full font-bold">{items.length} items</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gold transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
                            <div className="w-16 h-1 bg-charcoal/10 rounded-full"></div>
                            <p className="font-display text-charcoal/60">Your soul is waiting for a scent...</p>
                            <button onClick={onClose} className="text-gold text-sm hover:underline font-bold uppercase tracking-wide">Continue Shopping</button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-charcoal/5">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-heading text-charcoal text-lg">{item.name}</h4>
                                        <button
                                            onClick={() => onRemove(item.id)}
                                            className="text-gray-400 hover:text-terracotta transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">{item.price}</p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center border border-charcoal/10 rounded-md bg-white">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                className="px-3 py-1 text-gray-400 hover:text-charcoal hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-charcoal font-mono text-sm border-x border-charcoal/10 min-w-[30px] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                className="px-3 py-1 text-gray-400 hover:text-charcoal hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-charcoal/5 pt-6 mt-auto bg-ivory">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-display text-gray-500 uppercase tracking-widest text-xs">Total Estimate</span>
                        <span className="font-heading text-2xl text-charcoal">₹{total}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        className="w-full btn-premium bg-charcoal text-white hover:bg-gold hover:text-white transition-colors py-4 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default Cart;
