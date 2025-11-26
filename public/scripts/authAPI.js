const BASE_URL = "https://travelia-backend.onrender.com/api";

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/users/login/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return await response.json();
}

export async function firebaseLogin(idToken) {
  const response = await fetch(`${BASE_URL}/users/firebase-login/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: idToken })
  });

  if (!response.ok) {
    throw new Error("Error en login con Google");
  }

  return await response.json();
}
