// Vuelos (Google Flights genérico)
export function buildFlightsUrl(origen: string, destino: string): string {
    const origenClean = encodeURIComponent(origen);
    const destinoClean = encodeURIComponent(destino);
    return `https://www.google.com/search?q=vuelos+de+${origenClean}+a+${destinoClean}&tbm=flm`;
}

// Micros / Trenes (Busbud)
export function buildBusUrl(origen: string, destino: string): string {
    const origenClean = encodeURIComponent(origen);
    const destinoClean = encodeURIComponent(destino);
    return `https://www.busbud.com/es/search?origin=${origenClean}&destination=${destinoClean}`;
}

// Ferries (DirectFerries)
export function buildFerryUrl(origen: string, destino: string): string {
    const origenClean = encodeURIComponent(origen);
    const destinoClean = encodeURIComponent(destino);
    return `https://www.rome2rio.com/es/map/${origenClean}/${destinoClean}`;
}

// Booking.com con las fechas exactas
export function buildAccommodationUrl(destino: string, checkin: string, checkout: string): string {
    const destinoClean = encodeURIComponent(destino);
    
    if (checkin && checkout && checkin !== '-' && checkout !== '-') {
        return `https://www.booking.com/searchresults.es-ar.html?ss=${destinoClean}&checkin=${checkin}&checkout=${checkout}`;
    }
    return `https://www.booking.com/searchresults.es-ar.html?ss=${destinoClean}`;
}