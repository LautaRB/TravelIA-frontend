import { LocalNotifications } from '@capacitor/local-notifications';

export const NotificationService = {
    
    async requestPermissions() {
        try {
            const status = await LocalNotifications.checkPermissions();
            if (status.display !== 'granted') {
                await LocalNotifications.requestPermissions();
            }
        } catch (e) {
            console.error("No se pudieron pedir permisos de notificación (posiblemente se encuentra en un navegador web)", e);
        }
    },

    async scheduleForTrips(viajes: any[]) {
        try {
            const pending = await LocalNotifications.getPending();
            if (pending.notifications.length > 0) {
                await LocalNotifications.cancel(pending);
            }

            const notificationsToSchedule: any[] = [];
            const now = new Date();

            viajes.forEach(viaje => {
                const startId = viaje.id * 100 + 1;
                const endId = viaje.id * 100 + 2;

                const fechaInicio = new Date(viaje.fecha_inicio + 'T09:00:00'); // 9 AM
                
                if (fechaInicio > now) {
                    notificationsToSchedule.push({
                        id: startId,
                        title: `¡Buen viaje a ${viaje.destino}! ✈️`,
                        body: `Hoy comienza tu aventura en ${viaje.destino}. ¡Disfrutalo!`,
                        schedule: { at: fechaInicio },
                        sound: null,
                        attachments: null,
                        actionTypeId: "",
                        extra: null
                    });
                }

                const fechaFin = new Date(viaje.fecha_fin + 'T18:00:00'); // 6 PM
                
                if (fechaFin > now) {
                    notificationsToSchedule.push({
                        id: endId,
                        title: `¡Bienvenido a casa! 🏠`,
                        body: `Esperamos que hayas disfrutado tu viaje a ${viaje.destino}.`,
                        schedule: { at: fechaFin },
                        sound: null,
                        attachments: null,
                        actionTypeId: "",
                        extra: null
                    });
                }
            });

            if (notificationsToSchedule.length > 0) {
                await LocalNotifications.schedule({ notifications: notificationsToSchedule });
                console.log(`Se programaron ${notificationsToSchedule.length} notificaciones.`);
            }

        } catch (error) {
            console.error("Error programando notificaciones:", error);
        }
    }
};