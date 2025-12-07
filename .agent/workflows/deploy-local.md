---
description: Desplegar el proyecto localmente para vista previa
---

# Despliegue Local del Portfolio Film

Este workflow te guiará para ejecutar el proyecto completo (frontend + backend) en tu máquina local.

## Requisitos Previos

- Node.js y npm/yarn instalados
- Python 3.8+ instalado
- MongoDB instalado y ejecutándose (si el backend lo requiere)

## Pasos para Desplegar

### 1. Instalar dependencias del Backend

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar variables de entorno del Backend

Crea un archivo `.env` en la carpeta `backend` con las variables necesarias (MongoDB URI, JWT secrets, etc.)

### 3. Iniciar el servidor Backend

// turbo

```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: `http://localhost:8000`

### 4. Instalar dependencias del Frontend

Abre una nueva terminal y ejecuta:

```bash
cd frontend
yarn install
```

O si usas npm:

```bash
cd frontend
npm install
```

### 5. Configurar variables de entorno del Frontend

Crea un archivo `.env` en la carpeta `frontend` con la URL del backend:

```
REACT_APP_API_URL=http://localhost:8000
```

### 6. Iniciar el servidor de desarrollo del Frontend

// turbo

```bash
cd frontend
yarn start
```

O si usas npm:

```bash
cd frontend
npm start
```

El frontend se abrirá automáticamente en: `http://localhost:3000`

## Verificación

- Backend API: `http://localhost:8000/docs` (Swagger UI de FastAPI)
- Frontend: `http://localhost:3000`

## Notas

- Asegúrate de que ambos servidores estén corriendo simultáneamente en terminales separadas
- Si cambias código del frontend, se recargará automáticamente
- Si cambias código del backend, uvicorn con `--reload` lo recargará automáticamente
- Verifica que no haya conflictos de puertos (8000 y 3000)
