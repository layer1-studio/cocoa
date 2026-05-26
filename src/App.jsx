import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import BulkOrdersPage from './pages/BulkOrdersPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ReturnsPage from './pages/ReturnsPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProductManagement from './pages/admin/ProductManagement';
import SlotManagement from './pages/admin/SlotManagement';
import DeliveryPartnerPortal from './pages/DeliveryPartnerPortal';
import { PrivacyPolicy, TermsOfService, DeliveryPolicy } from './pages/PolicyPages';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-primary dark:text-accent-cream">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/collections" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/track" element={<OrderTrackingPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/bulk" element={<BulkOrdersPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/shipping" element={<DeliveryPolicy />} />
                        <Route path="/scan" element={<DeliveryPartnerPortal />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
