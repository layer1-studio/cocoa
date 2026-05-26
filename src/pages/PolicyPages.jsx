import { motion } from 'framer-motion';

const PolicyPage = ({ title, content }) => (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold font-display text-accent-cream mb-6">{title}</h1>
            <div className="w-20 h-1 bg-accent-gold mb-12" />
            <div className="prose prose-invert prose-stone max-w-none space-y-8 text-accent-cream/70 leading-relaxed italic text-lg">
                {content.map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </motion.div>
    </div>
);

export const PrivacyPolicy = () => (
    <PolicyPage
        title="Privacy Policy"
        content={[
            "At Cocoa Boutique, we value the trust you place in us when sharing your personal information. This policy outlines how we collect, use, and protect your data.",
            "We collect information necessary for order fulfillment, including your name, delivery address, and contact details. Your payment information is processed securely through encrypted gateways and is never stored on our servers.",
            "Your data is used solely to enhance your boutique experience and ensure your artisanal chocolates arrive fresh and on time."
        ]}
    />
);

export const TermsOfService = () => (
    <PolicyPage
        title="Terms of Service"
        content={[
            "By accessing the Cocoa website, you agree to abide by our standards of boutique excellence. All chocolate designs and brand assets are intellectual property of Cocoa Boutique.",
            "Orders are subject to our workshop's capacity. We reserve the right to prioritize production based on seasonal demand.",
            "Cancellations must be made within 2 hours of order placement, before our chocolatiers begin the tempering process."
        ]}
    />
);

export const DeliveryPolicy = () => (
    <PolicyPage
        title="Delivery Policy"
        content={[
            "Handcrafted chocolate requires precise temperature control. We deliver using temper-guarded vehicles to ensure your collection arrives in pristine condition.",
            "Minimum Delivery Time: Due to the artisanal nature of our products, orders require a minimum of 48 hours for preparation and tempering.",
            "Delivery Area: At this time, we exclusively serve the Central Paris metropolitan area to guarantee freshness."
        ]}
    />
);
