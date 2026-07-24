import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

// ... existing imports ...

const Checkout = ({ cartItems, onClearCart }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [isProcessing, setIsProcessing] = useState(false);

    // ... existing state ...

    // ... existing helper functions ...

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            if (paymentMethod === 'cod') {
                // COD Logic
                const newOrder = {
                    customer: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        address: `${formData.addres}, ${formData.city} - ${formData.pincode}`,
                        phone: formData.phone,
                        email: formData.email,
                        paymentMethod: 'Cash on Delivery'
                    },
                    items: cartItems,
                    total: total,
                    date: new Date().toISOString(),
                    status: "Pending (COD)",
                    createdAt: new Date()
                };
                await saveAndRedirect(newOrder);
            } else {
                // Razorpay Logic
                const options = {
                    key: "rzp_test_RqBKFFolwTFZtE",
                    amount: total * 100,
                    currency: "INR",
                    name: "Ayodhya Agarbatti",
                    description: "Sacred Fragrances",
                    image: "/images/logo.png",
                    handler: async function (response) {
                        try {
                            const newOrder = {
                                paymentId: response.razorpay_payment_id,
                                customer: {
                                    name: `${formData.firstName} ${formData.lastName}`,
                                    address: `${formData.addres}, ${formData.city} - ${formData.pincode}`,
                                    phone: formData.phone,
                                    email: formData.email,
                                    paymentMethod: 'Razorpay Online'
                                },
                                items: cartItems,
                                total: total,
                                date: new Date().toISOString(),
                                status: "Paid",
                                createdAt: new Date()
                            };
                            await saveAndRedirect(newOrder);
                        } catch (error) {
                            console.error("Error saving razorpay order:", error);
                            alert("Payment successful but failed to save order. Please contact support.");
                            setIsProcessing(false);
                        }
                    },
                    prefill: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        contact: formData.phone
                    },
                    theme: {
                        color: "#D4AF37"
                    },
                    modal: {
                        ondismiss: function () {
                            setIsProcessing(false);
                        }
                    }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
        } catch (error) {
            console.error("Order processing failed:", error);
            setIsProcessing(false);
            alert("Something went wrong. Please try again.");
        }
    };

    const saveAndRedirect = async (orderData) => {
        try {
            // Save to Firebase
            const docRef = await addDoc(collection(db, "orders"), orderData);
            console.log("Order written with ID: ", docRef.id);

            // Add the generated ID to the order object for the success page
            const finalOrder = { ...orderData, id: docRef.id };

            // Clear Cart
            onClearCart();

            // Redirect
            navigate("/success", { state: { order: finalOrder } });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Failed to place order. Check your internet connection or Firebase config.");
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 text-center bg-gray-50 flex flex-col items-center justify-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-heading mb-4 text-charcoal">Your bag is empty.</h2>
                <button onClick={() => navigate('/shop')} className="btn-primary bg-charcoal text-white hover:bg-gold hover:text-charcoal">Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory/50 pt-28 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                <Steps currentStep={step} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Flow Content */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="address"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <h2 className="font-heading text-xl mb-6 flex items-center gap-2">
                                        <MapPin className="text-gold" size={20} /> Shipping Address
                                    </h2>
                                    <form id="address-form" onSubmit={nextStep} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="First Name" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Street Address</label>
                                            <input required type="text" name="addres" value={formData.addres} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="House No, Street Name" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                                                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="City" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Pincode</label>
                                                <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="ZIP Code" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="+91 98765 43210" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="email@address.com" />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-charcoal text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all mt-4">
                                            Continue to Review
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="font-heading text-xl flex items-center gap-2">
                                                <ShoppingBag className="text-gold" size={20} /> Order Review
                                            </h2>
                                            <button onClick={() => setStep(1)} className="text-xs text-gold underline">Edit Address</button>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                                                <p className="font-bold text-charcoal mb-1">Shipping to:</p>
                                                <p>{formData.firstName} {formData.lastName}</p>
                                                <p>{formData.addres}</p>
                                                <p>{formData.city}, {formData.pincode}</p>
                                                <p className="mt-2">{formData.phone}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                                    <img src={item.image} className="w-20 h-20 object-cover rounded-md" alt="" />
                                                    <div className="flex-1">
                                                        <div className="flex justify-between mb-1">
                                                            <h4 className="font-heading text-sm text-charcoal">{item.name}</h4>
                                                            <span className="font-bold text-sm">₹{parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-2">{item.price} x {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(3)} className="w-full bg-charcoal text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all">
                                        Continue to Payment
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <h2 className="font-heading text-xl mb-6 flex items-center gap-2">
                                        <Lock className="text-gold" size={20} /> Payment Method
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        <div
                                            onClick={() => setPaymentMethod('razorpay')}
                                            className={`p-6 border rounded-xl cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'razorpay' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <CreditCard className={paymentMethod === 'razorpay' ? 'text-charcoal' : 'text-gray-400'} />
                                                <div>
                                                    <p className="font-bold text-gray-900">Razorpay Secure</p>
                                                    <p className="text-xs text-gray-500">UPI, Credit/Debit Card, Netbanking</p>
                                                </div>
                                            </div>
                                            {paymentMethod === 'razorpay' && <CheckCircle className="text-gold" />}
                                        </div>

                                        <div
                                            onClick={() => setPaymentMethod('cod')}
                                            className={`p-6 border rounded-xl cursor-pointer flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <Banknote className={paymentMethod === 'cod' ? 'text-charcoal' : 'text-gray-400'} />
                                                <div>
                                                    <p className="font-bold text-gray-900">Cash on Delivery</p>
                                                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                                                </div>
                                            </div>
                                            {paymentMethod === 'cod' && <CheckCircle className="text-gold" />}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        className="w-full bg-gold text-charcoal py-5 rounded-lg font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Lock size={16} /> Pay ₹{total} & Place Order
                                    </button>
                                    <div className="text-center mt-4 text-[10px] uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2">
                                        <ShieldCheck size={14} /> SSL Secured • 256-Bit Encrypted
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:sticky lg:top-32">
                            <h3 className="font-heading text-lg mb-6 text-charcoal">Price Details</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                                <span className="font-bold text-lg text-charcoal">Total Amount</span>
                                <span className="font-bold text-xl text-gold">₹{total}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                                <Truck size={20} className="text-charcoal shrink-0 mt-1" />
                                <div>
                                    <p className="text-xs font-bold text-gray-900 uppercase">Estimated Delivery</p>
                                    <p className="text-xs text-gray-500 mt-1">3-5 Business Days provided by our premium logistics partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
