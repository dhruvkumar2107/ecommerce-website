import React from 'react';
import { motion } from 'framer-motion';

const RitualGuide = () => {
    return (
        <section className="py-32 bg-ivory text-charcoal relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/5"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                    <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold mb-6 block">The Experience</span>
                    <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
                        Elevate the <br /><span className="italic">Everyday</span>
                    </h2>
                    <p className="font-body text-charcoal/80 text-lg leading-relaxed mb-12">
                        In a world of noise, the lighting of incense is a radical act of slowing down. It is a signal to the brain that the hustle has ceased, and the sanctuary is open.
                    </p>

                    <div className="space-y-8 border-l border-charcoal/10 pl-8">
                        <div>
                            <h4 className="font-heading text-xs uppercase tracking-widest text-charcoal mb-2">01. Intention</h4>
                            <p className="text-charcoal/60 text-sm">Hold the stick for a moment before lighting. Set a silent intention for your space.</p>
                        </div>
                        <div>
                            <h4 className="font-heading text-xs uppercase tracking-widest text-charcoal mb-2">02. Ignition</h4>
                            <p className="text-charcoal/60 text-sm">Light the tip. Allow the flame to dance for 5 seconds before gently blowing it out.</p>
                        </div>
                        <div>
                            <h4 className="font-heading text-xs uppercase tracking-widest text-charcoal mb-2">03. Transformation</h4>
                            <p className="text-charcoal/60 text-sm">Place in a holder specifically designed for ash collection. Breathe deep as the smoke rises.</p>
                        </div>
                    </div>
                </div>

                {/* Visual/Video Placeholder */}
                <div className="w-full md:w-1/2 h-[600px] relative">
                    <div className="absolute inset-0 border border-charcoal/10 p-4">
                        <div className="w-full h-full bg-gray-100 overflow-hidden relative">
                            <img
                                src="/images/ritual_moment.png"
                                alt="Ritual Moment"
                                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute bottom-8 left-8">
                                <p className="font-cursive text-3xl text-gold">pause.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RitualGuide;
