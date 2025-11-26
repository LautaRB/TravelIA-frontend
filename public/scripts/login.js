import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { login, firebaseLogin } from "/scripts/authAPI.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtmT9xPjwStMiL5f6-T-HTfCIKIW65Nl0",
  authDomain: "travelia-81216.firebaseapp.com",
  projectId: "travelia-81216",
  appId: "1:360414482088:web:d8741625365a300241fc9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const data = await login(username, password);

        document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict`;

        window.location.href = "/dashboard/dashboard/index.html";
      } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
      }
    });
  }

  const googleBtn = document.getElementById("googleLoginBtn");

  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const data = await firebaseLogin(idToken);

        document.cookie = `authToken=${data.access}; path=/; secure; samesite=strict`;

        window.location.href = "/dashboard/dashboard/index.html";
      } catch (e) {
        console.error(e);
        alert("Error en login con Google");
      }
    });
  }
});
