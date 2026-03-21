import { buildFlightsUrl, buildAccommodationUrl } from "../../utils/linkBuilder.ts";

export function createPlanOptionCard(
    opcion: any, 
    index: number, 
    isSelected: boolean, 
    formValues: any,
    onSelect: (idx: number) => void
): HTMLElement {
    
    const card = document.createElement('div');
    
    const borderClass = isSelected 
        ? 'border-ocean-500 ring-4 ring-ocean-100 dark:ring-ocean-900 transform scale-[1.02]' 
        : 'border-gray-100 dark:border-slate-700 hover:border-ocean-300';

    card.className = `relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 bg-white dark:bg-slate-800 shadow-sm flex flex-col h-full ${borderClass}`;
    
    const precioTotal = opcion.precio_estimado || opcion.costo_estimado || opcion.presupuesto_total || (opcion.medio && opcion.medio.precio_total) || (opcion.medio && opcion.medio.precio) || 'A calcular';

    const linkVuelos = buildFlightsUrl(formValues.origen, formValues.destino);
    const linkAlojamiento = buildAccommodationUrl(formValues.destino, formValues.fecha_inicio, formValues.fecha_fin);

    card.innerHTML = `
        ${isSelected ? '<div class="absolute -top-3 -right-3 bg-ocean-500 text-white rounded-full p-1 z-10"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : ''}
        
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-ocean-900 dark:text-white mb-1">${opcion.titulo}</h3>
            <p class="text-xs text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">${opcion.descripcion}</p>
            
            <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                    <span class="text-lg">🛣️</span>
                    <span class="font-medium">${opcion.ruta.nombre}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                    <span class="text-lg">${opcion.medio.tipo === 'AEREO' ? '✈️' : '🚗'}</span>
                    <span class="font-medium">${opcion.medio.nombre}</span>
                </div>
            </div>
        </div>

        <div class="flex gap-2 mb-4">
            <a href="${linkVuelos}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 py-2 rounded-lg text-xs font-bold transition-colors">
                ✈️ Vuelos
            </a>
            <a href="${linkAlojamiento}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="flex-1 text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 py-2 rounded-lg text-xs font-bold transition-colors">
                🏨 Hoteles
            </a>
        </div>

        <div class="flex justify-between items-end border-t border-gray-100 dark:border-slate-700 pt-3 mt-auto">
            <span class="text-xs font-bold uppercase text-ocean-400 tracking-wider">Precio Est.</span>
            <span class="text-xl font-bold text-ocean-600 dark:text-ocean-400">$${precioTotal}</span>
        </div>
    `;

    card.onclick = () => onSelect(index);
    return card;
}