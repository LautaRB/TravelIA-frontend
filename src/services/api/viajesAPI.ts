const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || "https://travelia-backend.onrender.com/api";

export const viajesAPI = {
  getById: async (tripId: string, token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/${tripId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error cargando el viaje");
    return res.json();
  },

  planificarConIA: async (payload: any, token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/planificar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      let errorMsg = "Fallo en la validación del viaje.";
      if (errorData.errores) {
        errorMsg = Object.values(errorData.errores).flat().join("\\n");
      }
      throw new Error(errorMsg);
    }
    return res.json();
  },

  actualizarViaje: async (tripId: string, payload: any, token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/${tripId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || "No se pudo actualizar el viaje.");
    }
    return res.json();
  },

  getAll: async (token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (res.status === 401) throw new Error("Unauthorized");
    if (!res.ok) throw new Error("Error cargando los viajes");
    
    return res.json();
  },

  delete: async (tripId: number | string, token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/${tripId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) throw new Error("No se pudo eliminar el viaje");
    return true; 
  },

  crearViaje: async (payload: any, token: string) => {
    const res = await fetch(`${BASE_URL}/viajes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al guardar el viaje");
    return data;
  }
};