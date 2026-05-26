import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Navigation, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const GoogleMapsSelector = ({ onSelect, currentAddress = '' }) => {
    const [query, setQuery] = useState(currentAddress);
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    // Mock places data (Colombo specific)
    const mockPlaces = [
        { name: "Cinnamon Gardens, Colombo 07", lat: 6.9128, lng: 79.8644 },
        { name: "Rajagiriya, Sri Jayawardenepura Kotte", lat: 6.9100, lng: 79.8972 },
        { name: "Nugegoda, Colombo District", lat: 6.8744, lng: 79.8884 },
        { name: "Bambalapitiya, Colombo 04", lat: 6.8974, lng: 79.8558 },
        { name: "Kollupitiya, Colombo 03", lat: 6.9142, lng: 79.8514 },
        { name: "Borella, Colombo 08", lat: 6.9172, lng: 79.8764 },
        { name: "Mount Lavinia, Dehiwala", lat: 6.8355, lng: 79.8664 }
    ];

    useEffect(() => {
        if (query.length > 2 && !selectedPlace) {
            setIsSearching(true);
            const timer = setTimeout(() => {
                const filtered = mockPlaces.filter(p =>
                    p.name.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filtered);
                setIsSearching(false);
            }, 600);
            return () => clearTimeout(timer);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSelect = (place) => {
        setQuery(place.name);
        setSelectedPlace(place);
        setSuggestions([]);
        onSelect(place.name);
    };

    return (
        <div className="relative w-full">
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-cream/30 group-focus-within:text-accent-gold transition-colors">
                    <MapPin size={18} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedPlace(null);
                    }}
                    placeholder="Search your address (e.g. Cinnamon Gardens)"
                    className="w-full bg-stone-900 border border-white/5 rounded-xl p-4 pl-12 text-sm outline-none focus:ring-1 focus:ring-accent-gold transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isSearching && <Loader2 className="animate-spin text-accent-gold" size={14} />}
                    <button
                        onClick={() => {
                            if ("geolocation" in navigator) {
                                setIsSearching(true);
                                navigator.geolocation.getCurrentPosition((position) => {
                                    // Normally we would reverse-geocode here. 
                                    // Mocking for now with our closest verified area.
                                    setTimeout(() => {
                                        handleSelect(mockPlaces[0]); // Default to Cinnamon Gardens for mock
                                        setIsSearching(false);
                                    }, 1000);
                                }, (error) => {
                                    setIsSearching(false);
                                    alert("Please enable location services to use this feature.");
                                });
                            }
                        }}
                        className="p-1 hover:bg-white/5 rounded-md transition-colors text-accent-gold group/loc"
                        title="Detect My Location"
                    >
                        <Navigation size={14} className="group-hover/loc:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 overflow-y-auto max-h-48"
                    >
                        {suggestions.map((place, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(place)}
                                className="w-full p-4 flex items-center gap-3 hover:bg-white/5 text-left text-sm border-b border-white/5 last:border-0 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0">
                                    <MapPin size={14} />
                                </div>
                                <div>
                                    <p className="font-bold text-accent-cream">{place.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-accent-cream/40 font-bold">Verified Address</p>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Google Watermark Mock */}
            <div className="flex justify-end mt-1 px-2">
                <p className="text-[8px] uppercase tracking-widest text-accent-cream/20 font-bold">Powered by Google</p>
            </div>
        </div>
    );
};

export default GoogleMapsSelector;
