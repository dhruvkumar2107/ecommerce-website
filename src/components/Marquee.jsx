import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="bg-ivory text-charcoal py-6 overflow-hidden flex whitespace-nowrap border-y border-charcoal/5 relative z-20">
            <motion.div
                className="flex gap-16 font-heading text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-gray-400"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
                <span>Pure Ingredients</span>
                <span className="text-gold">•</span>
                <span>Handcrafted in Ayodhya</span>
                <span className="text-gold">•</span>
                <span>Divine Fragrance</span>
                <span className="text-gold">•</span>
                <span>Ethically Sourced</span>
                <span className="text-gold">•</span>
                <span>Luxury Aromatherapy</span>
                <span className="text-gold">•</span>
                <span>Pure Ingredients</span>
                <span className="text-gold">•</span>
                <span>Handcrafted in Ayodhya</span>
                <span className="text-gold">•</span>
                <span>Divine Fragrance</span>
                <span className="text-gold">•</span>
                <span>Ethically Sourced</span>
                <span className="text-gold">•</span>
                <span>Luxury Aromatherapy</span>
            </motion.div>
            <motion.div
                className="flex gap-16 font-heading text-xs md:text-sm tracking-[0.3em] uppercase font-bold ml-16 text-gray-400"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
                <span>Pure Ingredients</span>
                <span className="text-gold">•</span>
                <span>Handcrafted in Ayodhya</span>
                <span className="text-gold">•</span>
                <span>Divine Fragrance</span>
                <span className="text-gold">•</span>
                <span>Ethically Sourced</span>
                <span className="text-gold">•</span>
                <span>Luxury Aromatherapy</span>
                <span className="text-gold">•</span>
                <span>Pure Ingredients</span>
                <span className="text-gold">•</span>
                <span>Handcrafted in Ayodhya</span>
                <span className="text-gold">•</span>
                <span>Divine Fragrance</span>
                <span className="text-gold">•</span>
                <span>Ethically Sourced</span>
                <span className="text-gold">•</span>
                <span>Luxury Aromatherapy</span>
            </motion.div>
        </div>
    );
};

export default Marquee;
