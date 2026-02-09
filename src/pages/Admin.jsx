import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Download, KeyRound, Lock, RefreshCw } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage for auth state
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }

        // Load orders from Firebase
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple password check - In production, this should be server-side
        if (password === 'admin123' || password === 'ayodhya') {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setError('');
        } else {
            setError('Invalid credentials. Access denied.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    const downloadCSV = () => {
        if (orders.length === 0) {
            alert("No orders to export.");
            return;
        }

        // CSV Header
        const headers = ["Order ID", "Date", "Customer Name", "Phone", "Email", "Address", "Items", "Total Amount", "Status"];

        // CSV Rows
        const rows = orders.map(order => [
            order.id,
            order.date.replace(/,/g, ''), // Remove commas to avoid CSV break
            order.customer.name,
            order.customer.phone,
            order.customer.email,
            `"${order.customer.address}"`, // Quote address to handle commas
            `"${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}"`,
            order.total,
            order.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(e => e.join(','))
        ].join('\n');

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `agarbatti_orders_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={24} className="text-gray-500" />
                    </div>

                    <h2 className="font-heading text-2xl text-charcoal mb-2">Restricted Access</h2>
                    <p className="text-gray-500 text-sm mb-8">Please verify your identity to access the dashboard.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                placeholder="Enter Access Key"
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                        <button type="submit" className="w-full bg-charcoal text-white py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-charcoal transition-all">
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="font-heading text-3xl text-charcoal">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your incoming orders and deliveries.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleLogout}
                            className="bg-white border border-gray-200 text-red-500 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-colors shadow-sm"
                        >
                            Logout
                        </button>
                        <button
                            onClick={downloadCSV}
                            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Download size={16} /> Export CSV
                        </button>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <span className="font-bold text-gold text-lg">{orders.length}</span> <span className="text-gray-500 text-sm">Total Orders</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {orders.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                            No orders placed yet.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        {/* Order ID & Status */}
                                        <div className="min-w-[150px]">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                                            <h3 className="font-mono font-bold text-charcoal mt-1">{order.id}</h3>
                                            <div className="mt-2 inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                                <CheckCircle size={12} /> {order.status}
                                            </div>
                                        </div>

                                        {/* Customer Info */}
                                        <div className="min-w-[200px]">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</span>
                                            <h4 className="font-bold text-charcoal mt-1">{order.customer.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{order.customer.email}</p>
                                            <p className="text-xs text-gray-500">{order.customer.phone}</p>
                                            <p className="text-xs text-gray-400 mt-2 max-w-[200px]">{order.customer.address}</p>
                                        </div>

                                        {/* Items */}
                                        <div className="flex-1">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items Purchased</span>
                                            <div className="mt-2 space-y-1">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between text-sm">
                                                        <span className="text-gray-700">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                                                        <span className="font-medium">₹{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                                <span className="font-bold text-sm">Total Paid</span>
                                                <span className="font-bold text-gold text-lg">₹{order.total}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col justify-center min-w-[150px]">
                                            <button className="bg-charcoal text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center gap-2">
                                                <Package size={16} /> Ship Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
