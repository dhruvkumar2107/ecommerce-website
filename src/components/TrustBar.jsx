import React from 'react';
import { Leaf, Award, Feather, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBar = () => {
    const features = [
        {
            icon: <Leaf strokeWidth={1.5} />,
            title: "100% Natural",
            desc: "Plant-based ingredients"
        },
        {
            icon: <Award strokeWidth={1.5} />,
            title: "Temple Grade",
            desc: "Hand-rolled clarity"
        },
        {
            icon: <Feather strokeWidth={1.5} />,
            title: "Ethically Sourced",
            desc: "Fair trade practices"
        },
        {
            icon: <Droplets strokeWidth={1.5} />,
            title: "Essential Oils",
            desc: "Therapeutic purity"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="bg-white text-charcoal py-20 border-t border-charcoal/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-12"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center group cursor-default"
                        >
                            <div className="mb-6 text-gold p-5 rounded-full border border-charcoal/5 bg-gray-50 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-500 shadow-sm group-hover:shadow-lg">
                                {React.cloneElement(feature.icon, { size: 28 })}
                            </div>
                            <h3 className="font-heading text-lg mb-2 text-ivory tracking-wide">{feature.title}</h3>
                            <p className="font-body text-xs text-gray-400 uppercase tracking-widest group-hover:text-gold/80 transition-colors">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustBar;
