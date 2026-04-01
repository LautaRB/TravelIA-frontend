export interface Lugar {
  display_name: string;
}

export const locationAPI = {
  buscarLugares: async (query: string): Promise<Lugar[]> => {
    if (query.length < 3) return [];

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&featuretype=city`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la API de mapas");
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error buscando lugares:", error);
      return [];
    }
  }
};