// Google Flights
export function buildFlightsUrl(origen: string, destino: string): string {
    const origenClean = encodeURIComponent(origen);
    const destinoClean = encodeURIComponent(destino);
    
    return `https://www.google.com/travel/flights?q=Vuelos+desde+${origenClean}+a+${destinoClean}`;
}

// Booking.com con las fechas exactas
export function buildAccommodationUrl(destino: string, checkin: string, checkout: string): string {
    const destinoClean = encodeURIComponent(destino);
    
    if (checkin && checkout && checkin !== '-' && checkout !== '-') {
        return `https://www.booking.com/searchresults.es-ar.html?ss=${destinoClean}&checkin=${checkin}&checkout=${checkout}`;
    }
    return `https://www.booking.com/searchresults.es-ar.html?ss=${destinoClean}`;
}