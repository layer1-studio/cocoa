import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShoppingBag, Users, DollarSign, Search, ChevronDown, MoreVertical, ExternalLink, XCircle, MessageCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

const AdminDashboard = () => {
    const { orders, inquiries, updateOrderStatus, updateInquiryStatus, cancelOrder } = useOrders();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'inquiries'

    const statuses = ["Pending", "Preparing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];
    const inquiryStatuses = ["New", "In Progress", "Completed", "Closed"];

    const stats = [
        { label: "Total Revenue", val: "Rs. 4,285,000", icon: <DollarSign className="text-emerald-500" />, trend: "+12.4%" },
        { label: "Active Orders", val: orders.length.toString(), icon: <ShoppingBag className="text-amber-500" />, trend: "+5.2%" },
        { label: "Inquiries", val: inquiries.length.toString(), icon: <MessageCircle className="text-blue-500" />, trend: "+2.1%" },
        { label: "Avg. Order Value", val: "Rs. 18,500", icon: <BarChart3 className="text-purple-500" />, trend: "-1.2%" }
    ];

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInquiries = inquiries.filter(i =>
        i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12 bg-background-dark min-h-screen font-sans">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-display text-accent-cream">Boutique Control</h1>
                    <p className="text-accent-cream/40 uppercase tracking-[0.2em] text-[10px] mt-2 font-bold">Live Workshop Overview</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white/5 text-accent-cream px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/10 transition-all">
                        Assign Partner
                    </button>
                    <button className="bg-accent-gold text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-accent-gold/20 flex items-center gap-2 hover:brightness-110 transition-all">
                        Generate Report <ExternalLink size={14} />
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-stone-900 border border-white/5 p-6 rounded-2xl shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
                            <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} bg-white/5 px-2 py-1 rounded-full`}>{stat.trend}</span>
                        </div>
                        <p className="text-accent-cream/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                        <p className="text-3xl font-display font-bold mt-1 text-accent-cream">{stat.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/5 pb-2">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === 'orders' ? 'text-accent-gold' : 'text-accent-cream/30 hover:text-accent-cream'}`}
                >
                    Orders ({orders.length})
                    {activeTab === 'orders' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />}
                </button>
                <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === 'inquiries' ? 'text-accent-gold' : 'text-accent-cream/30 hover:text-accent-cream'}`}
                >
                    Bulk Inquiries ({inquiries.length})
                    {activeTab === 'inquiries' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />}
                </button>
            </div>

            {/* Table Section */}
            <section className="bg-stone-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative min-w-[320px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/20 group-focus-within:text-accent-gold transition-colors" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-background-dark/50 border border-white/5 rounded-xl pl-12 pr-6 py-3 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all text-accent-cream"
                            placeholder={activeTab === 'orders' ? "Search orders, customers..." : "Search corporate leads..."}
                            type="text"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {activeTab === 'orders' ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background-dark/30 text-[10px] uppercase tracking-[0.2em] text-accent-cream/30 font-bold">
                                    <th className="px-8 py-6">Order ID</th>
                                    <th className="px-8 py-6">Customer</th>
                                    <th className="px-8 py-6">Delivery Details</th>
                                    <th className="px-8 py-6 font-display">Amount</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-accent-cream">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6 font-bold text-accent-gold">{order.id}</td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold">{order.customer}</p>
                                            <p className="text-[10px] text-accent-cream/30 uppercase tracking-widest">Handmade Fresh</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs">{order.deliveryDate}</p>
                                            <p className="text-[10px] text-accent-gold/60 uppercase tracking-widest font-bold">{order.slot}</p>
                                        </td>
                                        <td className="px-8 py-6 font-display font-bold text-accent-gold">{order.amount}</td>
                                        <td className="px-8 py-6">
                                            <div className="relative inline-block group/status">
                                                <button className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                    order.status === 'Shipped' || order.status === 'Out for Delivery' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        order.status === 'Preparing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                            'bg-stone-500/10 text-stone-500 border-white/5'
                                                    }`}>
                                                    {order.status}
                                                    <ChevronDown size={12} />
                                                </button>
                                                <div className="absolute top-full left-0 mt-2 w-32 bg-stone-800 border border-white/10 rounded-xl shadow-2xl z-50 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all">
                                                    {statuses.map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => updateOrderStatus(order.id, s)}
                                                            className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold hover:text-primary transition-colors first:rounded-t-xl last:rounded-b-xl"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {order.status !== 'Cancelled' && (
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`Are you sure you want to CANCEL Order ${order.id}? This will trigger an automatic refund of ${order.amount}.`)) {
                                                                cancelOrder(order.id);
                                                            }
                                                        }}
                                                        className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all"
                                                        title="Cancel & Refund Order"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-accent-cream/30 hover:text-accent-gold">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-background-dark/30 text-[10px] uppercase tracking-[0.2em] text-accent-cream/30 font-bold">
                                    <th className="px-8 py-6">Inquiry ID</th>
                                    <th className="px-8 py-6">Customer</th>
                                    <th className="px-8 py-6">Event Type</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-accent-cream">
                                {filteredInquiries.map((inq) => (
                                    <tr key={inq.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6 font-bold text-accent-gold">{inq.id}</td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold">{inq.customer}</p>
                                            <p className="text-[10px] text-accent-cream/30 uppercase tracking-widest">{inq.phone}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs">{inq.event}</p>
                                            <p className="text-[10px] text-accent-cream/30 uppercase tracking-widest">{inq.timestamp}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="relative inline-block group/status">
                                                <button className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 font-bold`}>
                                                    {inq.status}
                                                    <ChevronDown size={12} />
                                                </button>
                                                <div className="absolute top-full left-0 mt-2 w-32 bg-stone-800 border border-white/10 rounded-xl shadow-2xl z-50 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all">
                                                    {inquiryStatuses.map(s => (
                                                        <button
                                                            key={s}
                                                            onClick={() => updateInquiryStatus(inq.id, s)}
                                                            className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold hover:text-primary transition-colors first:rounded-t-xl last:rounded-b-xl"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => window.open(`https://wa.me/${inq.phone}?text=Hello ${inq.customer}, this is Cocoa Boutique regarding your inquiry ${inq.id}`)}
                                                className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                                                title="Contact via WhatsApp"
                                            >
                                                <MessageCircle size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
