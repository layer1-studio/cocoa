// TODO: Replace this function body with a real Google Maps Distance Matrix API call.
// Boutique coordinates: 6.9271° N, 79.8612° E (Colombo 07).
// Use the Distance Matrix API to verify the address is within 15km of that origin,
// then set eligible = (distanceMeters <= 15000).
export function checkDeliveryEligibility(address) {
    const eligible = address.toLowerCase().includes('colombo');
    return {
        eligible,
        message: eligible
            ? 'Valid delivery area detected.'
            : 'We currently deliver only within 15km of Colombo. Contact us for bulk inquiries!'
    };
}
