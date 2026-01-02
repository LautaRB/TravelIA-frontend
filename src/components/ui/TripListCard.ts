import { formatDate, calculateDays } from "../../utils/formatters";

export function createTripListCard(
    viaje: any, 
    onDelete: (id: number, element: HTMLElement) => void
): HTMLElement {
    const dias = calculateDays(viaje.fecha_inicio, viaje.fecha_fin);
    
    const tempDiv = document.createElement('div');
    
    tempDiv.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden group transition-all cursor-pointer">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-ocean-400 to-ocean-600"></div>

            <div class="absolute top-4 right-4 flex gap-2 z-10">
                
                <button class="edit-btn p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300 hover:bg-ocean-100 hover:text-ocean-600 transition-colors" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>

                <button class="delete-btn p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div class="pr-16"> 
                <h4 class="font-bold text-ocean-900 dark:text-white text-lg leading-tight mb-1 truncate">${viaje.titulo}</h4>
                <div class="flex items-center text-xs text-gray-500 dark:text-slate-400 gap-1 mb-3">
                    <span class="font-medium text-ocean-600 dark:text-ocean-400">${viaje.destino}</span>
                    <span>•</span>
                    <span>${dias} días</span>
                </div>
            </div>

            <div class="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 dark:border-slate-700">
                <div class="flex flex-col">
                    <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Fecha</span>
                    <span class="text-sm font-medium text-gray-700 dark:text-slate-300">
                        ${formatDate(viaje.fecha_inicio)}
                    </span>
                </div>
                ${viaje.precio ? `<span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-lg">$${viaje.precio}</span>` : ''}
            </div>
      </div>
    `;

    const cardElement = tempDiv.firstElementChild as HTMLElement;

    const deleteBtn = cardElement.querySelector('.delete-btn');
    deleteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        onDelete(viaje.id, cardElement);
    });

    const editBtn = cardElement.querySelector('.edit-btn');
    editBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `/trips/edit/index.html?id=${viaje.id}`;
    });

    cardElement.addEventListener('click', () => {
        window.location.href = `/trips/detail/index.html?id=${viaje.id}`;
    });

    return cardElement;
}