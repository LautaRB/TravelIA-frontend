export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/login/`, {
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

export async function firebaseLogin(idToken: string) {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/firebase-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al iniciar sesión con Google");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error de conexión");
  }
}

