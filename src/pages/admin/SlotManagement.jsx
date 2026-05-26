import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, Plus, X } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

const SLOT_CAPACITY = 10;

const SLOT_DEFINITIONS = [
    "Morning (9AM - 12PM)",
    "Afternoon (1PM - 4PM)",
    "Evening (5PM - 8PM)"
];

const SlotManagement = () => {
    const { orders, blockedDates, toggleDateBlock, isSlotAvailable } = useOrders();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [blockDateInput, setBlockDateInput] = useState('');
    const [showBlockInput, setShowBlockInput] = useState(false);

    const slots = SLOT_DEFINITIONS.map(time => {
        const current = orders.filter(o => o.deliveryDate === selectedDate && o.slot === time).length;
        return {
            time,
            capacity: SLOT_CAPACITY,
            current,
            status: current >= SLOT_CAPACITY || blockedDates.includes(selectedDate) ? 'Fully Booked' : 'Open'
        };
    });

    const handleBlockDate = () => {
        if (!blockDateInput) return;
        toggleDateBlock(blockDateInput);
        setBlockDateInput('');
        setShowBlockInput(false);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <header className="flex justify-between items-end flex-wrap gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-display text-accent-cream">Delivery Logistics</h1>
                    <p className="text-accent-cream/40 uppercase tracking-[0.2em] text-[10px] mt-2 font-bold">Capacity & Scheduling</p>
                </div>
                <div className="flex gap-4 flex-wrap items-end">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">View Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-stone-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                        />
                    </div>
                    {showBlockInput ? (
                        <div className="flex items-end gap-2">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-accent-gold font-bold">Block Date</label>
                                <input
                                    type="date"
                                    value={blockDateInput}
                                    onChange={(e) => setBlockDateInput(e.target.value)}
                                    className="bg-stone-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                                />
                            </div>
                            <button onClick={handleBlockDate} className="px-4 py-2 bg-accent-gold text-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                                {blockDateInput && blockedDates.includes(blockDateInput) ? 'Unblock' : 'Block'}
                            </button>
                            <button onClick={() => setShowBlockInput(false)} className="p-2 text-accent-cream/40 hover:text-accent-cream transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowBlockInput(true)}
                            className="px-6 py-3 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-accent-cream/40 hover:text-accent-gold transition-all flex items-center gap-2"
                        >
                            <AlertCircle size={16} /> Block Date
                        </button>
                    )}
                </div>
            </header>

            {blockedDates.includes(selectedDate) && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl px-6 py-4 text-rose-500 text-xs font-bold uppercase tracking-widest">
                    ⛔ {selectedDate} is currently blocked — no deliveries scheduled.
                </div>
            )}

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
                            <p className="text-accent-cream/40 text-xs uppercase tracking-widest font-bold">{selectedDate}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                                <span className="text-accent-cream/40">Booked</span>
                                <span>{slot.current} / {slot.capacity}</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${slot.current >= slot.capacity ? 'bg-amber-500' : 'bg-accent-gold'}`}
                                    style={{ width: `${Math.min((slot.current / slot.capacity) * 100, 100)}%` }}
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
                        <h2 className="text-2xl font-bold font-display">Blocked Dates</h2>
                        <p className="text-accent-cream/40 text-xs uppercase tracking-widest font-bold mt-1">No deliveries on these dates</p>
                    </div>
                </div>
                {blockedDates.length === 0 ? (
                    <p className="text-accent-cream/30 text-xs uppercase tracking-widest font-bold">No dates blocked.</p>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {blockedDates.map(date => (
                            <div key={date} className="bg-background-dark/50 border border-white/5 rounded-xl px-6 py-4 flex items-center gap-6">
                                <span className="font-bold text-accent-cream">{date}</span>
                                <button
                                    onClick={() => toggleDateBlock(date)}
                                    className="text-[10px] uppercase font-bold text-rose-500 hover:text-rose-400 transition-colors"
                                >
                                    Unblock
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default SlotManagement;
