import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Contact Info */}
                <div>
                    <span className="font-cursive text-3xl text-gold mb-4 block">Get in Touch</span>
                    <h1 className="font-heading text-5xl text-charcoal mb-8">We'd Love to Hear from You</h1>
                    <p className="font-body text-gray-500 mb-12 text-lg">
                        Whether you have a question about our fragrances, need assistance with an order, or are interested in wholesale opportunities, our team is here to help.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-charcoal">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl mb-1 text-charcoal">Visit Us</h3>
                                <p className="text-gray-500">123 Temple Road, Ayodhya<br />Uttar Pradesh, India</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-charcoal">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl mb-1 text-charcoal">Email Us</h3>
                                <p className="text-gray-500">namaste@ayodhyaagarbatti.com<br />support@ayodhyaagarbatti.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-charcoal">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl mb-1 text-charcoal">Call Us</h3>
                                <p className="text-gray-500">+91 98765 43210<br />Mon-Sat, 9am - 6pm IST</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 p-10 rounded-sm border border-gray-100">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-gold transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-gold transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-gold transition-colors" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                            <select className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-gold transition-colors">
                                <option>General Inquiry</option>
                                <option>Order Support</option>
                                <option>Wholesale</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea rows="5" className="w-full bg-white border border-gray-200 p-3 focus:outline-none focus:border-gold transition-colors"></textarea>
                        </div>

                        <button type="submit" className="btn-primary w-full py-4">Send Message</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;
