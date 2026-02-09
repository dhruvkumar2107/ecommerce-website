import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: "Espresso Ground",
        variant: "Premium Coffee",
        price: "₹450",
        benefits: "Focus • Energy • Alertness",
        desc: "Stimulate your mind with the robust aroma of roasted coffee beans. Perfect for deep work and morning rituals.",
        badge: "Best for Productivity",
        image: "/images/product_coffee.jpg",
        deepContent: {
            origin: "Ethiopian Highlands (Sidamo)",
            mood: "Intellectual Awakening",
            chakra: "Root (Muladhara) - Grounding",
            story: "Sourced from the high-altitude plantations of Sidamo, these beans are sun-dried to preserve their volatile oils. The aroma is not just 'coffee'—it is the scent of earth, fire, and awakening. Used by monks to sustain focus during long meditations.",
            pyramid: { top: "Roasted Arabica", heart: "Dark Cocoa & Nutmeg", base: "Vetiver" }
        }
    },
    {
        id: 2,
        name: "Madagascan Calm",
        variant: "French Vanilla",
        price: "₹450",
        benefits: "Relaxation • Sleep • Comfort",
        desc: "A warm, soothing embrace of sweet vanilla. Melts away anxiety and prepares the soul for restful sleep.",
        badge: "Best for Relaxation",
        image: "/images/product_vanilla_group.jpg",
        deepContent: {
            origin: "Sava Region, Madagascar",
            mood: "Deep Comfort & Safety",
            chakra: "Sacral (Swadhisthana) - Pleasure",
            story: "True Vanilla is an orchid fruit, requiring painstaking hand-pollination. Our extract comes from the Sava region, known for the highest vanillin content. This fragrance triggers the brain's safety response, instantly lowering cortisol levels.",
            pyramid: { top: "Sweet Cream", heart: "Floral Orchid", base: "Warm Musk & Tonka" }
        }
    },
    {
        id: 3,
        name: "Citrus Clarity",
        variant: "Zest Lemon",
        price: "₹380",
        benefits: "Purification • Clarity • Uplift",
        desc: "Sharp and refreshing, lemon disperses negative energy and cuts through mental fog. Instantly revitalizing.",
        image: "/images/product_lemon.jpg",
        deepContent: {
            origin: "Amalfi Coast, Italy",
            mood: "Spiritual Cleansing",
            chakra: "Solar Plexus (Manipura) - Willpower",
            story: "Lemon has been used in purification rituals for millennia. Our oil is cold-pressed from the zest to capture the 'limonene' terpene, proven to elevate serotonin. It cuts through stagnant energy in a room like a knife of light.",
            pyramid: { top: "Sparkling Zest", heart: "Lemongrass & Verbena", base: "Clean Cedar" }
        }
    },
    {
        id: 4,
        name: "Creative Spark",
        variant: "Wild Orange",
        price: "₹380",
        benefits: "Joy • Creativity • Flow",
        desc: "Sweet and vibrant orange notes that awaken the sacral chakra, sparking creativity and unbridled joy.",
        badge: "Best for Artists",
        image: "/images/product_orange.jpg",
        deepContent: {
            origin: "Nagpur, India",
            mood: "Unbridled Joy",
            chakra: "Sacral (Swadhisthana) - Creativity",
            story: "The 'Golden Apple' of ancient myths. Wild Orange connects us to the inner child. It dissolves rigidity and perfectionism, allowing creative energy to flow freely. Ideal for studios, writing rooms, and new beginnings.",
            pyramid: { top: "Sweet Mandarin", heart: "Neroli Blossom", base: "Sacral Spice" }
        }
    }
];

const ProductSection = ({ addToCart }) => {
    const [activeProduct, setActiveProduct] = React.useState(null);

    // Extended Product Data with Notes
    const luxuryProducts = products.map(p => ({
        ...p,
        notes: p.deepContent ? p.deepContent.pyramid : (p.name.includes("Coffee") ? { top: "Roasted Bean", heart: "Dark Cocoa", base: "Vanilla" } :
            p.name.includes("Vanilla") ? { top: "Sweet Cream", heart: "Madagascan Pod", base: "Warm Musk" } :
                p.name.includes("Lemon") ? { top: "Zesty Peel", heart: "Lemongrass", base: "Clean Air" } :
                    { top: "Wild Orange", heart: "Neroli", base: "Sacral Spice" })
    }));

    return (
        <section className="py-32 bg-transparent overflow-hidden relative">
            <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6 text-ivory">
                <div>
                    <span className="font-heading text-xs font-bold tracking-[0.3em] opacity-60 text-gold uppercase mb-4 block">The Collection</span>
                    <h2 className="font-serif text-4xl md:text-5xl leading-tight">Curated for <br /><span className="italic opacity-70">Your Inner State</span></h2>
                </div>
                <div className="hidden md:block text-xs uppercase tracking-widest opacity-40">Drag to Explore →</div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-8 px-6 pb-20 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing" data-cursor="drag">
                {luxuryProducts.map((product) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        key={product.id}
                        className="min-w-[320px] md:min-w-[400px] snap-center group cursor-pointer relative"
                    >
                        {/* Image Area - Taller & Slimmer */}
                        <div className="relative h-[550px] overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg">
                            {/* Minimal Badge */}
                            <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 text-[9px] font-bold tracking-[0.2em] uppercase text-charcoal">
                                {product.badge || "Signature"}
                            </div>

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 grayscale-[10%] drop-shadow-xl"
                            />

                            {/* Hover Overlay - Minimal */}
                            <div className="absolute inset-0 bg-ivory/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-charcoal">
                                <p className="font-serif text-xl italic mb-4 leading-relaxed opacity-90">"{product.desc}"</p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-charcoal text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold hover:text-white transition-colors w-full"
                                    >
                                        Quick Add — {product.price}
                                    </button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="bg-transparent border border-charcoal/20 text-charcoal px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:border-gold hover:text-gold transition-colors w-full backdrop-blur-sm block text-center"
                                    >
                                        Discover Ritual
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Info Area - Clean & Structured */}
                        <div className="pt-8 pr-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60 mb-2">{product.variant}</h4>
                            <h3 className="font-serif text-3xl text-ivory mb-4">{product.name}</h3>

                            {/* Fragrance Notes Grid */}
                            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-4">
                                <div>
                                    <span className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1">Top</span>
                                    <span className="block text-xs font-medium text-ivory/80">{product.notes.top}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1">Heart</span>
                                    <span className="block text-xs font-medium text-ivory/80">{product.notes.heart}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] uppercase tracking-widest text-gray-500 mb-1">Base</span>
                                    <span className="block text-xs font-medium text-ivory/80">{product.notes.base}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Editorial Modal */}
            {activeProduct && activeProduct.deepContent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-ivory/95 backdrop-blur-lg" onClick={() => setActiveProduct(null)}></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-ivory text-charcoal w-full max-w-5xl h-[80vh] overflow-y-auto rounded-none shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 h-64 md:h-full relative">
                            <img src={activeProduct.image} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-charcoal/5"></div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                            <button onClick={() => setActiveProduct(null)} className="absolute top-8 right-8 text-xs uppercase tracking-widest hover:text-gold">Close</button>

                            <span className="font-heading text-xs uppercase tracking-[0.4em] text-gold mb-4 block">{activeProduct.deepContent.origin}</span>
                            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">{activeProduct.name}</h2>

                            <p className="font-body text-lg text-gray-600 leading-relaxed mb-12 border-l-2 border-gold pl-6">
                                {activeProduct.deepContent.story}
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h4 className="font-heading text-[10px] uppercase tracking-widest text-gray-400 mb-2">Mood</h4>
                                    <p className="font-serif text-xl italic">{activeProduct.deepContent.mood}</p>
                                </div>
                                <div>
                                    <h4 className="font-heading text-[10px] uppercase tracking-widest text-gray-400 mb-2">Chakra</h4>
                                    <p className="font-serif text-xl italic">{activeProduct.deepContent.chakra}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => { addToCart(activeProduct); setActiveProduct(null); }}
                                className="bg-charcoal text-white px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold transition-colors w-full"
                            >
                                Add to Ritual — {activeProduct.price}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default ProductSection;
