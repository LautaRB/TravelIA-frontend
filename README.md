# 🌍 Travelia Frontend (App)

![Astro](https://img.shields.io/badge/Astro-4.0%2B-orange)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)

Frontend y aplicación móvil del proyecto **Travelia**, una plataforma inteligente para planificar viajes.

Esta aplicación está construida con **Astro** para un rendimiento web óptimo, estilizada con **TailwindCSS** y empaquetada como una aplicación nativa de **Android** utilizando **Capacitor**. Se conecta con el Backend de Travelia para ofrecer itinerarios generados por IA, gestión de usuarios y planificación de rutas.

---

## 📂 Estructura del proyecto

Basada en la arquitectura de componentes de Astro y servicios para la lógica de negocio.

```bash
TRAVELIA-FRONTEND/
├── android/           # Proyecto nativo de Android generado por Capacitor
├── public/            # Archivos estáticos públicos (Favicon, manifest, robots)
├── src/
│   ├── assets/        # Recursos estáticos importados (Imágenes, iconos, fuentes)
│   ├── components/    # Componentes UI reutilizables (Botones, Cards, Inputs)
│   ├── config/        # Constantes y configuraciones globales del cliente
│   ├── hooks/         # Custom Hooks para manejo de estado y lógica de vista
│   ├── layouts/       # Plantillas de diseño (Layout Principal, Layout Auth)
│   ├── pages/         # Rutas de la aplicación (File-based routing de Astro)
│   ├── services/      # Capa de comunicación con la API (Fetch al Backend)
│   ├── styles/        # Estilos globales y directivas de Tailwind
│   ├── utils/         # Funciones auxiliares, formateadores y helpers
│   └── middleware.ts  # Middleware de Astro (Protección de rutas/Auth)
├── astro.config.mjs   # Configuración del framework Astro
├── capacitor.config.ts # Configuración del puente nativo Capacitor
├── tailwind.config.cjs # Configuración de temas y plugins de Tailwind
└── package.json       # Dependencias y scripts
```

## ⚙️ Instalación y configuración
Prerrequisitos:
- Node.js (v18 o superior)
- Android Studio (Para compilar la app móvil)

1. Clonar el repositorio
```bash
git clone [https://github.com/LautaRB/Travelia-Frontend.git](https://github.com/LautaRB/Travelia-Frontend.git)
cd travelia-frontend
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno. Crea un archivo .env en la raíz del proyecto para conectar con tu backend:
```bash
# URL de tu API (Local)
PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
# URL de tu API (Producción ej: Render):
PUBLIC_API_URL=[https://travelia-backend.onrender.com](https://travelia-backend.onrender.com)
```

4. Ejecutar en modo desarrollo (Web)
```bash
npm run dev
```
La aplicación web correrá en: http://localhost:4321

## 📱 Compilación para Android (Capacitor)
Para probar la aplicación en un emulador o dispositivo físico Android:

1. Generar el build estático de Astro
```bash
npm run build
```

2. Sincronizar los cambios con la carpeta nativa android/
```bash
npx cap sync
```

3. Abrir el proyecto en Android Studio
```bash
npx cap run android
```
Desde Android Studio, podrás ejecutar la app pulsando el botón de "Run" (▶️).

## 🔑 Funcionalidades Principales
- Planificador IA UI: Interfaz intuitiva para ingresar preferencias de viaje y visualizar el itinerario generado por Gemini.
- Mapas Interactivos: Visualización de rutas y tramos sugeridos.
- Autenticación: Formularios de Login, Registro e integración visual con Google Sign-In.
- Perfil de Usuario: Gestión de avatar, preferencias de moneda y unidades (conectado al backend).
- Responsive & Mobile-First: Diseño adaptado perfectamente a pantallas móviles gracias a Tailwind.
- Nativo: Acceso a funcionalidades del dispositivo mediante Capacitor.

## 📜 Licencia
Este proyecto está bajo la licencia MIT.

