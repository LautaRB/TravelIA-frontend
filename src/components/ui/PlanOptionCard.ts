export function createPlanOptionCard(
    opcion: any, 
    index: number, 
    isSelected: boolean, 
    onSelect: (idx: number) => void
): HTMLElement {
    
    const card = document.createElement('div');
    
    const borderClass = isSelected 
        ? 'border-ocean-500 ring-4 ring-ocean-100 dark:ring-ocean-900 transform scale-[1.02]' 
        : 'border-gray-100 dark:border-slate-700 hover:border-ocean-300';

    card.className = `relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 bg-white dark:bg-slate-800 shadow-sm ${borderClass}`;
    
    card.innerHTML = `
        ${isSelected ? '<div class="absolute -top-3 -right-3 bg-ocean-500 text-white rounded-full p-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : ''}
        
        <h3 class="text-lg font-bold text-ocean-900 dark:text-white mb-1">${opcion.titulo}</h3>
        <p class="text-xs text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">${opcion.descripcion}</p>
        
        <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 space-y-2 mb-3">
            <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span class="text-lg">🛣️</span>
                <span class="font-medium">${opcion.ruta.nombre}</span>
                <span class="text-xs text-gray-400">(${opcion.ruta.distancia} ${opcion.ruta.unidad || 'km'})</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span class="text-lg">${opcion.medio.tipo === 'AEREO' ? '✈️' : '🚗'}</span>
                <span class="font-medium">${opcion.medio.nombre}</span>
            </div>
        </div>

        <div class="flex justify-between items-end border-t border-gray-100 dark:border-slate-700 pt-3">
            <span class="text-xs font-bold uppercase text-ocean-400 tracking-wider">Precio Est.</span>
            <span class="text-xl font-bold text-ocean-600 dark:text-ocean-400">$${opcion.medio.precio}</span>
        </div>
    `;

    card.onclick = () => onSelect(index);
    return card;
}