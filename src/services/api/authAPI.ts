const BASE_URL = "https://travelia-backend.onrender.com/api/users";

export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error de conexión");
  }
}
