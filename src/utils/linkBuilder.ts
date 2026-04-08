// Google Flights
export function buildFlightsUrl(origen: string, destino: string, fecha: string): string {
    const cityOrigin = origen.split(',')[0].trim();
    const cityDest = destino.split(',')[0].trim();
    
    const q = encodeURIComponent(`vuelos de ${cityOrigin} a ${cityDest} el ${fecha}`);
    return `https://www.google.com/travel/flights?q=${q}`;
}

// Rome2Rio
export function buildBusUrl(origen: string, destino: string, fecha: string): string {
    const cityOrigin = encodeURIComponent(origen.split(',')[0].trim());
    const cityDest = encodeURIComponent(destino.split(',')[0].trim());
    return `https://www.rome2rio.com/es/s/${cityOrigin}/${cityDest}`;
}

// Ferries (DirectFerries)
export function buildFerryUrl(origen: string, destino: string): string {
    const origenClean = encodeURIComponent(origen);
    const destinoClean = encodeURIComponent(destino);
    return `https://www.rome2rio.com/es/map/${origenClean}/${destinoClean}`;
}

// Booking
export function buildAccommodationUrl(
    destino: string, 
    checkin: string, 
    checkout: string, 
    presupuesto: string = 'Medio'
): string {
    const destClean = encodeURIComponent(destino.split(',')[0].trim());
    
    let baseUrl = `https://www.booking.com/searchresults.es-ar.html?ss=${destClean}&group_adults=2&no_rooms=1`;
    
    if (checkin && checkout && checkin !== '-' && checkout !== '-') {
        baseUrl += `&checkin=${checkin}&checkout=${checkout}`;
    }

    if (presupuesto === 'Alto') {
        baseUrl += '&nflt=class%3D4%3Bclass%3D5&order=popularity';
    } else if (presupuesto === 'Bajo') {
        baseUrl += '&order=price';
    } else {
        baseUrl += '&order=popularity';
    }

    return baseUrl
}