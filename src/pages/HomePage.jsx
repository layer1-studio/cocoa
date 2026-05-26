import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Award, ShieldCheck, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeliveryChecker from '../components/delivery/DeliveryChecker';

const HomePage = () => {
    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
                    style={{
                        backgroundImage: "linear-gradient(rgba(28, 23, 22, 0.4), rgba(28, 23, 22, 0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1w6OYpPXptwo2GYgg1lXcxmJOhTgphgLz0XkF3RtKG4F9_WQ7Qvtni3sVZdrxYNuUcil4orWFLvHQNTAIWxwoydXQuF3u_ul_6uP0jYo8kykXA6RFpzawJah1ZIxitKjt4wXTQK8v16S7Bh-4rxF2j8WjwOkOJBhyIllkNK9bg9xJzoGJiXBqktd64gtSTyw8062-Wk_HQPTXgmAnoLmGfEGROlcqICIpgkXuypaYLh_EIoYzZcRdNDm5i_L1n27ZbUcaTccWGA')"
                    }}
                />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-accent-cream text-5xl md:text-7xl font-bold leading-tight tracking-tight font-display mb-6"
                    >
                        Handcrafted Chocolates <br />Made Fresh For You
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-accent-cream/80 text-lg md:text-xl font-normal max-w-xl mx-auto italic mb-10"
                    >
                        Indulge in the finest artisanal truffles and pralines, delivered with care to your door.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Link
                            to="/shop"
                            className="gold-gradient text-primary px-12 py-4 rounded-lg text-lg font-bold tracking-wider hover:brightness-110 transition-all shadow-2xl inline-block"
                        >
                            SHOP NOW
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Delivery Checker Section */}
            <section className="py-24 -mt-20 relative z-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <DeliveryChecker />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent-cream/30 font-bold">
                        Check your address above to see if we deliver to your neighborhood instantly.
                    </p>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="max-w-7xl mx-auto py-24 px-4">
                <div className="flex flex-col items-center mb-16">
                    <span className="text-accent-gold tracking-[0.4em] uppercase text-sm mb-3">Curated Collections</span>
                    <h2 className="text-4xl font-bold font-display text-accent-cream">Featured Categories</h2>
                    <div className="w-16 h-0.5 bg-accent-gold mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "The Dark Collection", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgjZu3R-FH6nj_Wk7IIftpn7D4EkpX_bu1MaV55DZZrFSdMlGHpTOpC7oXtgWQEXgEYY5yqL7ity33C-07hkxVckmBMrYZTs0eal8GsCbOzo9YGBQHBl5gGHYCEZCTDCzI1lIyx5UuCK4f1OO_ayFMbLHNJ0Ia_dNtbkMYYe6ww7e5MbFilNnNXyBIYCP38-bYeDz-JT9KNrxolDVXMdNeqe8NyQxFCzjjyGA9R8Kd1frZfeyfkYZA1CzXT99imHlEbd4AYM83XA" },
                        { title: "Creamy Pralines", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRN0t9hn8CcfDzh79tYm7UjPRdhwTGlhzYN74J0MoDRvxfR2E-PQxab2C3f8uSk9EjSw2efozb7mLCGV4kpbi_68qzdGcY4d9sssYpYDGlxgjTquMYL4wCLwU7IqvNtRumJKfu1k_tzVek2jhSCd82RvHvspRhIm-OgOiIdQFxw0ZZH2hd8P0xaQRcquwwS7wv5PqA-9aLbkj1WHXXBsxWXlwLrMfibCv3pLAeQziSzSgMMpwTbbzTMPh3y_nQWeRH4GyzezbLtw" },
                        { title: "Artisan Truffles", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOhukP4IH54S0NSzzAkxQbRs4nMkJpqhSJUm5jIgImJ5D6KX99cdVTo1P8E2FxfAMM3emMW3MsQVLJ9Z_HxiFYSg8HdZ5Ar-jn2Typ4R7QO6-MMKayJcdlRVF35vGy09ik6pEhC1pVzZe58pNGRuJx4bedu93GRUvB4sLmf48qhypgcD3N5iftyWUWBp7THOg2_vdGo0gwkgs3q1rw0V1xod6A4BXEAX0RZ6nL4qjtVWDxjpPCcFHL4kPIIas4RWWRk5Q3dCC0OQ" }
                    ].map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            whileHover={{ y: -10 }}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-primary cursor-pointer shadow-xl"
                        >
                            <img
                                src={cat.img}
                                alt={cat.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-70"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent">
                                <h3 className="text-2xl font-bold text-accent-cream mb-3 font-display">{cat.title}</h3>
                                <p className="text-accent-gold text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                                    Explore <ArrowRight size={16} />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="bg-primary/30 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-accent-gold tracking-[0.4em] uppercase text-sm mb-3 block">Top Rated</span>
                            <h2 className="text-4xl font-bold font-display text-accent-cream">Best Sellers</h2>
                        </div>
                        <Link to="/shop" className="text-accent-cream border-b border-accent-gold pb-1 text-sm font-bold tracking-widest uppercase hover:text-accent-gold transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Sea Salt Caramel Heart", price: "Rs. 1,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNSAdKcmgHESH9HGBjort08eoEgJm_MQOQ4Cqid1G--efw-hX-TK1TGsFC68kkeQHwB955I28dhK5X0IdHuGQUfOPxQUNCyCxVu5ekcbCp-PldAVWbXCVR7jrikCtwoUV049Q2eQDNX62-o5XiEu4jfx7G1MkZ_iR9USjobd0H9M14B88PUWWUlITdM6kT-ig6Hlm8yJsK8gYHN8Pjlapw8JmkzqtWqJr6ZR9JGS9sV5EJJPLuu1yax3900O6T8T9LvtbIbDGp1w" },
                            { name: "70% Single Origin Bar", price: "Rs. 3,200", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0RHx0PlxhCeHumId9Gqcb86DnkTza7vv12_DuzfgZnxtD21vIXiN1fnVUQmw4QiN0ZEGO1vtZnmk9wk9IFMYVz-jy0HrfxUfaQlBkVOGnrvj4W4_y1Uc1ffv_yCrAHG6vIuDw8erXYjpLcq54S_d2I_d2DYNrU2SMa5FDG0UKCm5uCIw8eo-R5ffo91UGaOAIbUH5dgZME2dp-AUZlpPSmF_NnX2NY0t1B8YMuymzFVtZ1ZmgzVG62Twzs0COH5eNiDaYNcOKpw" },
                            { name: "Raspberry Rose Velvet", price: "Rs. 1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAOHca_j6VfsB9we4xfk4b2vcq3Yw9dA1eprHdlh0-BuVaOoQSaVsC4PEso9aJsLqFyFWL2ep4UoLu-u2YyhabnWvmX0gZ0ZzKo_votPU1OJlhs4381frmgaArPLnzG3dTy2Ew48K1V4TLj6WgMRfFaU9aFPpOWitSMGbM0uVaJ11H1mVP0EYo9fgs3lkISV8tqZMu6bmyb4WwaQ8kqFdx54Y4Zf-cyLwR4A3juaTqXMelbEy5428jNq_8kV-cG66xXtdl6x6lUg" },
                            { name: "24K Gold Ganache", price: "Rs. 2,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUUju9MsoScfMeYAt3BoSNPBS4GiQzg9Dr7dPjob5yKGXCQHRK4BmZCSV6r72L3FWxKDYqDFuifUNHny9ZDmdjhMeJn2CxR2XoYIaEj27wa6-p0pFucKXO8aV05tKYu55NO52Oe8rA7o4czhWKPgiaL1o-StGVyP4nOCqpkBFwcTTqvSiQXr4MISgCc04hklqnv9F76Sx_XGnTPdaUsOvTvXBUCLfgcWCNCu21iTt5SBwL73Cwaq8Q-sVlzwwykUws0ouJvdc9XA" }
                        ].map((prod, i) => (
                            <motion.div
                                key={prod.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group space-y-4"
                            >
                                <div className="relative overflow-hidden rounded-xl aspect-square bg-background-dark shadow-lg">
                                    <img
                                        src={prod.img}
                                        alt={prod.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <button className="absolute bottom-4 left-4 right-4 bg-accent-gold text-primary py-3 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                                        QUICK ADD
                                    </button>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-accent-cream font-bold group-hover:text-accent-gold transition-colors">{prod.name}</h4>
                                    <p className="text-accent-gold font-display mt-2 font-bold">{prod.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gift Box Promo */}
            <section className="bg-accent-cream py-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-16">
                    <div className="space-y-8">
                        <span className="text-primary/60 tracking-[0.4em] uppercase text-sm font-bold block">Personalized Luxury</span>
                        <h2 className="text-5xl md:text-6xl font-bold font-display text-primary leading-tight">Your Choice, <br />Our Craft.</h2>
                        <p className="text-primary/80 text-xl leading-relaxed font-display italic">
                            "Build your custom selection box with the flavors that speak to you. From velvet ganache to crunchy pralines, every box is a unique masterpiece."
                        </p>
                        <div className="pt-4">
                            <button className="bg-primary text-accent-cream px-12 py-4 rounded-lg text-lg font-bold tracking-widest hover:bg-primary/90 transition-all shadow-2xl">
                                BUILD YOUR BOX
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <motion.div
                            style={{ x: 50, y: -50 }}
                            animate={{ x: [50, 40, 50], y: [-50, -40, -50] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="absolute -right-10 -top-10 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl"
                        />
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR7sfGQpZYCfMoMd_1ekzp7tSDx_QbYt90DctJdp_Oir9on9-7lULLzFyTUEuFptpo5O8mTVTlYypuoHQvOo7DF1SUo_kV_R3Ng0jKJqJk6qO-fRTvvAo4fX1KBVyzRQda4tyna6rcx4qLKq7d3LnSlsypyj-GCAsMqKKPWXQWQARGV4amrsEdzFwo2o4sI_MpW9Qu-pT6SlJ6_iYUc4QQrdAv1CdFHkH3NgEIcHwTEDrRj7aZ111cSNRemACarHvSo5dMWOO_Ng"
                            alt="Gift Box Customization"
                            className="rounded-2xl shadow-2xl relative z-10 border border-primary/5"
                        />
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-32 max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold font-display text-accent-cream mb-16">The Cocoa Experience</h2>
                <div className="grid md:grid-cols-3 gap-16">
                    {[
                        { icon: <Award size={32} />, title: "Select Favorites", desc: "Browse our curated seasonal collection of artisanal chocolates and truffles." },
                        { icon: <Truck size={32} />, title: "Choose Your Box", desc: "Pick a signature boutique box size or a custom-designed luxury gift set." },
                        { icon: <ShieldCheck size={32} />, title: "We Deliver Fresh", desc: "Temper-guarded packaging ensures your chocolates arrive in perfect condition." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="flex flex-col items-center space-y-6 group"
                        >
                            <div className="w-20 h-20 rounded-full border border-accent-gold flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500 shadow-lg">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold font-display">{item.title}</h3>
                            <p className="text-accent-cream/70 text-base leading-relaxed max-w-xs">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-background-dark border-t border-white/5 relative">
                <div className="max-w-3xl mx-auto px-4 text-center space-y-10">
                    <Quote className="mx-auto text-accent-gold/40 h-16 w-16" />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl font-display italic leading-relaxed text-accent-cream"
                    >
                        "The depth of flavor in the single origin bars is unlike anything I've tasted before. Truly the gold standard of artisan chocolate."
                    </motion.p>
                    <div className="space-y-2">
                        <p className="font-bold text-accent-gold tracking-[0.3em] uppercase text-sm">Eleanor Vance</p>
                        <p className="text-accent-cream/40 text-xs">Connoisseur Magazine</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
