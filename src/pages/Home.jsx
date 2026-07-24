import React from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import Marquee from '../components/Marquee';
import TrustBar from '../components/TrustBar';
import ScrollReveal from '../components/ScrollReveal';
import FragrancePhilosophy from '../components/FragrancePhilosophy';
import RitualGuide from '../components/RitualGuide';
import { Truck, Phone, ShieldCheck, RotateCcw } from 'lucide-react';

const RitualSection = () => (
    <div className="relative w-full h-[80vh] bg-fixed bg-center bg-cover flex items-center justify-center isolate"
        style={{ backgroundImage: "url('/images/ritual_bg.png')" }}>
        <div className="absolute inset-0 bg-ivory/80 z-[-1]"></div>
        <div className="text-center text-charcoal px-6 max-w-3xl">
            <ScrollReveal>
                <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-gold mb-6 block">The Ritual</span>
                <h2 className="font-serif text-5xl md:text-7xl font-light mb-8 leading-tight">
                    Connecting Soul <br /> <span className="italic">to Divinity</span>
                </h2>
                <p className="font-body text-lg md:text-xl text-charcoal/80 font-light leading-relaxed">
                    "Incense is not just fragrance; it is a bridge between the mortal and the divine.
                    Every stick we hand-roll in Ayodhya carries a prayer, a wish, and a moment of peace."
                </p>
            </ScrollReveal>
        </div>
    </div>
);

const Home = ({ addToCart }) => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <TrustBar />
            <Marquee />

            <section id="heritage" className="py-24 bg-ivory text-center px-6 border-b border-gray-100">
                <ScrollReveal width="100%">
                    <h2 className="font-heading text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Heritage</h2>
                    <p className="font-serif text-2xl md:text-3xl text-charcoal max-w-3xl mx-auto leading-relaxed italic">
                        "Rooted in the holy city of Ayodhya, crafting fragrances that bridge the mortal and the divine."
                    </p>
                </ScrollReveal>
            </section>

            <RitualSection />

            <div id="ritual">
                <RitualGuide />
            </div>

            <div id="philosophy">
                <FragrancePhilosophy />
            </div>

            <div id="shop">
                <ProductSection addToCart={addToCart} />
            </div>
        </div>
    );
};

export default Home;
