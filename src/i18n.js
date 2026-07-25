import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            topBar: "✨ Hand-Rolled in Ayodhya • 100% Charcoal-Free",
            freeShipping: "Complimentary Shipping on Orders Over ₹999",
            navHome: "Home",
            navShop: "Shop",
            navRituals: "Rituals",
            navJournal: "Journal",
            navContact: "Contact",
            navAdmin: "Admin",
            heroTitle1: "Sacred",
            heroTitle2: "Aroma",
            heroSubtitle: "Experience the divine fragrance of Ayodhya. Where prayer meets purity.",
            shopCollection: "Shop Collection",
            ourRituals: "Our Rituals",
            royalCollection: "The Royal Collection",
            sacredFragrances: "Sacred Fragrances",
            handRolled: "Hand-Rolled in Ayodhya",
            allIncense: "All Incense",
            addToBag: "Add to Bag",
            quickView: "Quick View",
            yourBag: "Your Bag",
            totalEstimate: "Total Estimate",
            proceedToCheckout: "Proceed to Checkout",
            shippingAddress: "Shipping Address",
            reviewOrder: "Review Order",
            selectPayment: "Select Payment Method",
            placeOrder: "Place Order",
            payWithRazorpay: "Pay Online with Razorpay",
            cashOnDelivery: "Cash on Delivery (COD)"
        }
    },
    hi: {
        translation: {
            topBar: "✨ पवित्र अयोध्या में हस्त-निर्मित • 100% कोयला-मुक्त",
            freeShipping: "₹999 से अधिक के ऑर्डर पर मुफ्त शिपिंग",
            navHome: "होम",
            navShop: "दुकान",
            navRituals: "अनुष्ठान",
            navJournal: "पत्रिका",
            navContact: "संपर्क करें",
            navAdmin: "एडमिन",
            heroTitle1: "पवित्र",
            heroTitle2: "सुगंध",
            heroSubtitle: "अयोध्या की दिव्य सुगंध का अनुभव करें। जहां प्रार्थना और शुद्धता का मिलन होता है।",
            shopCollection: "संग्रह देखें",
            ourRituals: "हमारे अनुष्ठान",
            royalCollection: "शाही संग्रह",
            sacredFragrances: "पवित्र अगरबत्तियां",
            handRolled: "अयोध्या में हस्त-निर्मित",
            allIncense: "सभी अगरबत्ती",
            addToBag: "झोले में जोड़ें",
            quickView: "त्वरित अवलोकन",
            yourBag: "आपका झोला",
            totalEstimate: "कुल अनुमानित मूल्य",
            proceedToCheckout: "चेकआउट के लिए आगे बढ़ें",
            shippingAddress: "डिलीवरी का पता",
            reviewOrder: "ऑर्डर की समीक्षा करें",
            selectPayment: "भुगतान का तरीका चुनें",
            placeOrder: "ऑर्डर दें",
            payWithRazorpay: "ऑनलाइन रेज़रपे द्वारा भुगतान करें",
            cashOnDelivery: "कैश ऑन डिलीवरी (COD)"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('ayodhya_lang') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
