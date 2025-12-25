const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

const getBackendErrorMessage = (data: any): string => {
  console.log("Error crudo recibido:", JSON.stringify(data));

  if (!data) return "Ocurrió un error desconocido.";

  if (data.message) return data.message;

  if (data.detail) return data.detail;

  if (data.error && typeof data.error === 'string') return data.error;

  if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
    return data.non_field_errors[0];
  }

  if (data.details) {
    if (typeof data.details === 'string') {
        if (data.details.includes('ErrorDetail')) {
            const match = data.details.match(/string='(.*?)'/);
            if (match && match[1]) return match[1];
        }
        return data.details;
    }
    if (typeof data.details === 'object') {
       return getBackendErrorMessage(data.details);
    }
  }

  const keys = Object.keys(data).filter(k => 
    !['success', 'code', 'status', 'error', 'details'].includes(k)
  );

  if (keys.length > 0) {
    const firstKey = keys[0];
    const errorValue = data[firstKey];
    
    if (Array.isArray(errorValue) && errorValue.length > 0) {
      return errorValue[0];
    }
    if (typeof errorValue === 'string') return errorValue;
  }

  return JSON.stringify(data);
};

export async function register(username: string, email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const textData = await res.text();
    let data;
    try {
        data = JSON.parse(textData);
    } catch {
        console.error("Error NO-JSON:", textData);
        throw new Error("Error interno del servidor (500). Revisa los logs de Render.");
    }

    if (!res.ok) {
      throw new Error(getBackendErrorMessage(data));
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const textData = await res.text();
    let data;
    try { data = JSON.parse(textData); } catch { throw new Error("Error del servidor (500)"); }

    if (!res.ok) {
      throw new Error(getBackendErrorMessage(data));
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function firebaseLogin(idToken: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/firebase-login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    const textData = await res.text();
    let data;
    try { data = JSON.parse(textData); } catch { data = { error: textData }; }

    if (!res.ok) {
      throw new Error(getBackendErrorMessage(data));
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function logout(authToken: string, refreshToken: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ refresh: refreshToken })
    });
    if (!res.ok) console.warn("Logout warning:", await res.text());
    return true;
  } catch (error) {
    console.error("Error logout:", error);
    return false;
  }
}

export async function getProfile(authToken: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/me/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });

    const textData = await res.text();
    let data;
    try { data = JSON.parse(textData); } catch { throw new Error("Error de servidor"); }

    if (!res.ok) {
      throw new Error(getBackendErrorMessage(data));
    }

    return data.details; 
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    throw new Error(error.message || "No se pudo cargar el perfil");
  }
}

export async function updateProfile(authToken: string, updateData: any) {
  try {
    const isFormData = updateData instanceof FormData;
    
    const headers: any = {
      "Authorization": `Bearer ${authToken}`
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BASE_URL}/users/me/profile/`, {
      method: "PATCH",
      headers: headers,
      body: isFormData ? updateData : JSON.stringify(updateData),
    });

    const textData = await res.text();
    let data;
    try { data = JSON.parse(textData); } catch { throw new Error("Error del servidor"); }

    if (!res.ok) {
      throw new Error(getBackendErrorMessage(data));
    }

    return data;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(error.message || "No se pudo actualizar el perfil");
  }
}