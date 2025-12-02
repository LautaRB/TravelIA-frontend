const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || "Error al iniciar sesión");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error de conexión");
  }
}

export async function firebaseLogin(idToken: string) {
  try {
    console.log("Enviando token a:", `${BASE_URL}/users/firebase-login/`); // Log para depurar
    
    const res = await fetch(`${BASE_URL}/users/firebase-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const text = await res.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        data = { error: text };
    }

    if (!res.ok) {
      console.error("Error del Backend:", data);
      throw new Error(data.error || "El backend rechazó el token");
    }

    return data;
  } catch (error: any) {
    console.error("Error en fetch:", error);
    throw new Error(error.message || "Error de conexión");
  }
}