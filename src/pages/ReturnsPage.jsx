import { motion } from 'framer-motion';

const ReturnsPage = () => {
    const sections = [
        {
            title: "Our Quality Guarantee",
            content: "Handcrafted chocolate is a delicate art. We guarantee that every piece leaves our atelier in perfect temper and condition. If your order arrives damaged or compromised by temperature during transport, we will replace it immediately."
        },
        {
            title: "Perishable Goods Policy",
            content: "Due to the artisanal and perishable nature of our products, we cannot accept returns for change of mind or subjective taste preferences. All sales are final once the tempered seal has been broken."
        },
        {
            title: "Bespoke & Bulk Orders",
            content: "Custom gift boxes and personalized message items are crafted specifically for your event. These are non-refundable once production has commenced."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-5xl font-bold font-display text-accent-cream mb-6">Returns & Exchanges</h1>
                <div className="w-20 h-1 bg-accent-gold mb-12" />
                <div className="space-y-16">
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-4">
                            <h2 className="text-2xl font-bold font-display text-accent-gold">{section.title}</h2>
                            <p className="text-accent-cream/70 leading-relaxed italic text-lg">{section.content}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ReturnsPage;
