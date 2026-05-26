import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([
        { id: "#CC-82941", customer: "Rachel Cooray", date: "Oct 24, 2023", amount: "Rs. 18,500", status: "Preparing", deliveryDate: "2023-10-26", slot: "Evening (5PM - 8PM)", message: "For someone special.", deliveryCode: "CX928P" },
        { id: "#CH-9284", customer: "Sebastian Roche", date: "Oct 24, 2023", amount: "Rs. 24,500", status: "Pending", deliveryDate: "2023-10-27", slot: "Afternoon (1PM - 4PM)", message: "", deliveryCode: "KL812Q" },
    ]);

    const [inquiries, setInquiries] = useState([
        { id: "#INQ-482", customer: "Aitken Spence", phone: "+94771234567", event: "Corporate Gifting", status: "New", timestamp: "10/12/2023" },
        { id: "#INQ-483", customer: "Ananta Sri Lanka", phone: "+94779876543", event: "Office Launch", status: "In Progress", timestamp: "10/14/2023" }
    ]);

    const SLOT_CAPACITY = 10; // Max orders per slot per day
    const OWNER_CONTACT = import.meta.env.VITE_OWNER_PHONE || "+94771770570";

    // PRODUCTION NOTE: Never call WhatsApp API directly from frontend (it leaks keys).
    // Use a backend proxy (Node.js/Express) as detailed in the implementation plan.
    const triggerProductionWhatsApp = async (recipient, type, data) => {
        const apiKey = import.meta.env.VITE_WHATSAPP_API_KEY;
        if (!apiKey) return; // Still in simulation mode

        try {
            console.log(`[PRODUCTION TRACE] Triggering Real WhatsApp to ${recipient}...`);
            // Example Twilio/Meta fetch call would go here
        } catch (err) {
            console.error("WhatsApp Production Error:", err);
        }
    };

    const addInquiry = (inquiryData) => {
        const id = `#INQ-${Math.floor(Math.random() * 900) + 100}`;
        const newInquiry = { ...inquiryData, id, status: 'New', timestamp: new Date().toLocaleDateString() };
        setInquiries(prev => [newInquiry, ...prev]);
        sendNotification('New Bulk Inquiry Received', 'Owner', newInquiry);
    };

    const updateInquiryStatus = (id, status) => {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
        const inq = inquiries.find(i => i.id === id);
        if (inq) sendNotification('Inquiry Status Updated', inq.customer, { id, status });
    };

    const sendNotification = (type, recipient = "Owner", data) => {
        const phone = recipient === "Owner" ? OWNER_CONTACT : data?.phone || "Customer";
        const message = `[BOUTIQUE ALERT] TO: ${recipient} (${phone}) | MSG: ${type}`;
        console.log(`%c${message}`, "color: #D4AF37; font-weight: bold; font-size: 12px;");
        console.log(`[DATA]:`, data);

        // Trigger production logic if key exists
        triggerProductionWhatsApp(phone, type, data);

        // Visual simulation for the Owner/User during testing
        if (recipient === "Owner") {
            const toast = document.createElement("div");
            toast.className = "fixed top-8 right-8 bg-stone-900 border border-accent-gold p-6 rounded-2xl shadow-2xl z-[9999] animate-fade-in-up max-w-sm";
            toast.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest text-accent-gold font-bold">WhatsApp Alert (Owner)</p>
                        <p class="text-xs text-accent-cream mt-1 font-bold italic">"${type}"</p>
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 6000);
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updated = { ...order, status: newStatus };
                sendNotification(`Status Updated to ${newStatus}`, updated.customer, updated);
                return updated;
            }
            return order;
        }));
    };

    const cancelOrder = (orderId, reason = "Customer Request") => {
        let success = false;
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                // Business Rule: Only allow cancellation if Pending or Preparing
                const cancellableStatuses = ['Pending', 'Preparing'];
                if (!cancellableStatuses.includes(order.status)) {
                    console.error(`[CANCELLATION DENIED] Order ${orderId} is already ${order.status}`);
                    return order;
                }

                success = true;
                const updated = { ...order, status: 'Cancelled', cancellationReason: reason };

                // Simulate PayHere Refund API Call
                console.log(`[PAYHERE API] POST /merchant/v1/refund`);
                console.log(`[PAYHERE API] Merchant ID: PAYHERE_MOCK_12345`);
                console.log(`[PAYHERE API] Order ID: ${order.id}`);
                console.log(`[PAYHERE API] Refund Amount: ${order.amount}`);
                console.log(`[PAYHERE API] RESPONSE: 200 OK | Refund ID: RFND_${Math.random().toString(36).substring(7).toUpperCase()}`);

                sendNotification('Order Cancelled & Refunded', updated.customer, updated);
                sendNotification('Internal Alert: Order Cancelled', 'Owner', { orderId, amount: order.amount });
                return updated;
            }
            return order;
        }));
        return success;
    };

    const updateStatusByCode = (code, newStatus) => {
        let orderFound = null;
        setOrders(prev => prev.map(order => {
            if (order.deliveryCode === code) {
                // Sequential Transition Rule:
                // 1. Preparing -> Out for Delivery
                // 2. Out for Delivery -> Delivered
                let nextStatus = newStatus;
                if (order.status === 'Preparing') nextStatus = 'Out for Delivery';
                else if (order.status === 'Out for Delivery') nextStatus = 'Delivered';
                else if (order.status === 'Delivered') return order; // Already done

                orderFound = { ...order, status: nextStatus };
                sendNotification(`Status Update: ${nextStatus}`, orderFound.customer, orderFound);
                return orderFound;
            }
            return order;
        }));
        return orderFound;
    };

    const [blockedDates, setBlockedDates] = useState([]);

    const toggleDateBlock = (date) => {
        setBlockedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
    };

    const isSlotAvailable = (date, slot) => {
        if (blockedDates.includes(date)) return false;
        const count = orders.filter(o => o.deliveryDate === date && o.slot === slot).length;
        return count < SLOT_CAPACITY;
    };

    const addOrder = (newOrder) => {
        if (!isSlotAvailable(newOrder.deliveryDate, newOrder.slot)) {
            throw new Error("This delivery slot is fully booked or blocked. Please select another time.");
        }

        const orderId = `#CC-${Math.floor(Math.random() * 90000) + 10000}`;
        const deliveryCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const finalOrder = { ...newOrder, id: orderId, date: new Date().toLocaleDateString(), deliveryCode };

        setOrders(prev => [finalOrder, ...prev]);
        sendNotification('New Order Received', 'Owner', finalOrder);
        sendNotification('Order Confirmation', finalOrder.customer, finalOrder);
        return { orderId, deliveryCode };
    };

    return (
        <OrderContext.Provider value={{ orders, inquiries, blockedDates, addInquiry, updateInquiryStatus, toggleDateBlock, updateOrderStatus, updateStatusByCode, addOrder, cancelOrder, isSlotAvailable }}>
            {children}
        </OrderContext.Provider>
    );
};
