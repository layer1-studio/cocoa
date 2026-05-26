import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, Plus, ToggleLeft as Toggle } from 'lucide-react';

const SlotManagement = () => {
    const slots = [
        { time: "Morning (9AM - 12PM)", capacity: 15, current: 8, status: "Open" },
        { time: "Afternoon (1PM - 4PM)", capacity: 10, current: 10, status: "Fully Booked" },
        { time: "Evening (5PM - 8PM)", capacity: 20, current: 12, status: "Open" }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-display text-accent-cream">Delivery Logistics</h1>
                    <p className="text-accent-cream/40 uppercase tracking-[0.2em] text-[10px] mt-2 font-bold">Capacity & Scheduling</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-accent-cream/40 hover:text-accent-gold transition-all flex items-center gap-2">
                        <AlertCircle size={16} /> Block Date
                    </button>
                    <button className="bg-accent-gold text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg flex items-center gap-2 hover:brightness-110 transition-all">
                        New Slot <Plus size={16} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {slots.map((slot, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-stone-900 border border-white/5 rounded-3xl p-8 space-y-6"
                    >
                        <div className="flex justify-between items-start">
                            <Clock className="text-accent-gold/40" size={24} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${slot.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                {slot.status}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-accent-cream">{slot.time}</h3>
                            <p className="text-accent-cream/40 text-xs uppercase tracking-widest font-bold">Daily Recurring</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                                <span className="text-accent-cream/40">Capacity</span>
                                <span>{slot.current} / {slot.capacity}</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${slot.current >= slot.capacity ? 'bg-amber-500' : 'bg-accent-gold'}`}
                                    style={{ width: `${(slot.current / slot.capacity) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest font-bold text-accent-cream/40 hover:bg-white/5 transition-all">
                            Manage Bookings
                        </button>
                    </motion.div>
                ))}
            </div>

            <section className="bg-stone-900 border border-white/5 rounded-3xl p-10 space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                    <Calendar className="text-accent-gold" size={32} />
                    <div>
                        <h2 className="text-2xl font-bold font-display">Holiday Closures</h2>
                        <p className="text-accent-cream/40 text-xs uppercase tracking-widest font-bold mt-1">Blocked preparation dates</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    {["Dec 25", "Dec 26", "Jan 01"].map(date => (
                        <div key={date} className="bg-background-dark/50 border border-white/5 rounded-xl px-6 py-4 flex items-center gap-6">
                            <span className="font-bold text-accent-cream">{date}</span>
                            <span className="text-[10px] uppercase font-bold text-rose-500">Blocked</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SlotManagement;
