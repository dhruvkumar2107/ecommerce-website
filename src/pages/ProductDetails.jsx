import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const products = [
    {
        id: 1,
        name: "Espresso Ground",
        variant: "Premium Coffee",
        price: "₹450",
        benefits: "Focus • Energy • Alertness",
        desc: "Stimulate your mind with the robust aroma of roasted coffee beans. Perfect for deep work and morning rituals.",
        badge: "Best for Productivity",
        image: "/images/espresso.png",
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
        image: "/images/vanilla.png",
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
        image: "/images/lemon.png",
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
        image: "/images/orange.png",
        deepContent: {
            origin: "Nagpur, India",
            mood: "Unbridled Joy",
            chakra: "Sacral (Swadhisthana) - Creativity",
            story: "The 'Golden Apple' of ancient myths. Wild Orange connects us to the inner child. It dissolves rigidity and perfectionism, allowing creative energy to flow freely. Ideal for studios, writing rooms, and new beginnings.",
            pyramid: { top: "Sweet Mandarin", heart: "Neroli Blossom", base: "Sacral Spice" }
        }
    }
];

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div>Product not found</div>;

    const notes = product.deepContent ? product.deepContent.pyramid : {};

    return (
        <div className="bg-ivory min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 text-charcoal hover:text-gold mb-12 uppercase tracking-widest text-xs font-bold transition-colors">
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[600px] overflow-hidden bg-gray-100 rounded-sm shadow-xl"
                    >
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                            {product.variant}
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-charcoal"
                    >
                        <span className="font-heading text-xs uppercase tracking-[0.3em] text-gold mb-4 block">{product.deepContent.origin}</span>
                        <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-none">{product.name}</h1>
                        <p className="font-serif text-2xl italic text-gray-400 mb-8">{product.price}</p>

                        <p className="font-body text-lg text-gray-600 leading-relaxed mb-10 border-l-2 border-gold pl-6">
                            {product.deepContent.story}
                        </p>

                        <div className="flex flex-col gap-6 mb-12">
                            <div className="grid grid-cols-2 gap-8 p-6 bg-white border border-gray-100">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Mood</h4>
                                    <p className="font-serif text-lg">{product.deepContent.mood}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Chakra</h4>
                                    <p className="font-serif text-lg">{product.deepContent.chakra}</p>
                                </div>
                            </div>

                            {/* Pyramid */}
                            <div className="border-t border-gray-200 pt-6">
                                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Fragrance Pyramid</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div><span className="text-gray-400 block text-[9px]">TOP</span> {notes.top}</div>
                                    <div><span className="text-gray-400 block text-[9px]">HEART</span> {notes.heart}</div>
                                    <div><span className="text-gray-400 block text-[9px]">BASE</span> {notes.base}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-charcoal text-white py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gold transition-colors shadow-lg"
                            >
                                Add to Sanctuary
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-gray-200 opacity-60">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck size={20} className="text-gold" />
                                <span className="text-[10px] uppercase tracking-wider">100% Organic</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck size={20} className="text-gold" />
                                <span className="text-[10px] uppercase tracking-wider">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RotateCcw size={20} className="text-gold" />
                                <span className="text-[10px] uppercase tracking-wider">Easy Returns</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
