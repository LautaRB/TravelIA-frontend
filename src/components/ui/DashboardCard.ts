import { formatDate, calculateDays } from "../../utils/formatters.ts";

export function createDashboardCard(viaje: any): HTMLElement {
    const dias = calculateDays(viaje.fecha_inicio, viaje.fecha_fin);
    
    const tempDiv = document.createElement('div');
    
    tempDiv.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group h-full">
          
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-ocean-400 to-ocean-600"></div>

          <div class="flex justify-between items-start mb-2 pl-2">
              <div>
                  <h4 class="font-bold text-ocean-900 dark:text-white text-lg leading-tight mb-1 truncate pr-2">${viaje.titulo}</h4>
                  <div class="flex items-center text-xs text-gray-500 dark:text-slate-400 gap-1">
                      <span class="font-medium text-ocean-600 dark:text-ocean-400">${viaje.destino}</span>
                      <span>•</span>
                      <span>${dias} días</span>
                  </div>
              </div>
              ${viaje.precio ? `<span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-lg">$${viaje.precio}</span>` : ''}
          </div>

          <div class="flex items-center gap-3 mt-4 pl-2">
              <div class="flex flex-col">
                  <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Fecha</span>
                  <span class="text-sm font-medium text-gray-700 dark:text-slate-300">
                      ${formatDate(viaje.fecha_inicio)}
                  </span>
              </div>
              
              <div class="h-8 w-px bg-gray-100 dark:bg-slate-700 mx-1"></div>

               <div class="flex items-center justify-center w-8 h-8 rounded-full bg-ocean-50 dark:bg-slate-700/50 text-ocean-500 dark:text-ocean-300">
                  <span class="text-sm">✈️</span> 
               </div>
          </div>
      </div>
    `;

    const cardElement = tempDiv.firstElementChild as HTMLElement;

    cardElement.addEventListener('click', () => {
         window.location.href = `/trips/detail/index.html?id=${viaje.id}`;
    });

    return cardElement;
}