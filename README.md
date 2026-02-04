# Task Manager App (Angular + PrimeNG)
Aplicación web para la gestión de tareas personales, desarrollada con un frontend moderno en **Angular 17**, resaltando los siguientes aspectos:
- Uso de componentes de PrimeNG.
- Uso de componentes standalone
- Uso de rutas protegidas y rutas libres
- Manejo eficiente de peticiones http, considerando lo memory leaks.
- Cargar componentes en diálogos, creados de forma dinámica.
- Uso de Reactive Forms
- Busqueda de tareas

## Funcionalidades principales
- Registro e inicio de sesión de usuarios (solamente correo electrónico válido)
- Creación de tareas asociadas a un usuario
- Listado de tareas agrupadas por pendientes y completadas
- Marcar tareas como completadas
- Edición y eliminación lógica de tareas
- Interfaz moderna y responsive con Angular + PrimeNG

## Instalación local y ejecución
# 1. Clonar repositorio
git clone https://github.com/FCamposP/ATOM-Frontend.git

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp src/environments/environment.ts.example src/environments/environment.ts
# Editar con tu API URL 
# Puedes obtener un proyecto de ejemplo de apis en el repositorio: https://github.com/FCamposP/ATOM-Backend.git

# 4. Ejecutar en desarrollo
ng serve --o

# 5. Automáticamente se abrirá una pestaña del navegador con la ruta:
# http://localhost:4200


## Instalación CI/CD
# En la ruta .github/workflows/deploy-hosting.yml puedes encontrar un ejemplo para implementarlo un despliegue automático en firebase hosting

