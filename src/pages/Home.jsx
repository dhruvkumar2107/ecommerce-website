import React from 'react';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import Marquee from '../components/Marquee';
import TrustBar from '../components/TrustBar';
import ScrollReveal from '../components/ScrollReveal';
import FragrancePhilosophy from '../components/FragrancePhilosophy';
import RitualGuide from '../components/RitualGuide';
import { Truck, Phone, ShieldCheck, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RitualSection = () => {
    const { t } = useTranslation();
    return (
    <div className="relative w-full h-[80vh] bg-fixed bg-center bg-cover flex items-center justify-center isolate"
        style={{ backgroundImage: "url('/images/ritual_bg.png')" }}>
        <div className="absolute inset-0 bg-ivory/80 z-[-1]"></div>
        <div className="text-center text-charcoal px-6 max-w-3xl">
            <ScrollReveal>
                <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-gold mb-6 block">{t('theRitual')}</span>
                <h2 className="font-serif text-5xl md:text-7xl font-light mb-8 leading-tight">
                    {t('ritualHeading1')} <br /> <span className="italic">{t('ritualHeading2')}</span>
                </h2>
                <p className="font-body text-lg md:text-xl text-charcoal/80 font-light leading-relaxed">
                    {t('ritualQuote')}
                </p>
            </ScrollReveal>
        </div>
    </div>
);
};

const Home = ({ addToCart }) => {
    const { t } = useTranslation();
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <TrustBar />
            <Marquee />

            <section id="heritage" className="py-24 bg-ivory text-center px-6 border-b border-gray-100">
                <ScrollReveal width="100%">
                    <h2 className="font-heading text-xs uppercase tracking-[0.3em] text-gold mb-4">{t('ourHeritage')}</h2>
                    <p className="font-serif text-2xl md:text-3xl text-charcoal max-w-3xl mx-auto leading-relaxed italic">
                        {t('heritageQuote')}
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
