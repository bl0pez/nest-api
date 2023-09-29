<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Iniciar proyecto

1. Clone el repositorio.
2. Ejecute `docker-compose up -d` para iniciar la base de datos.
3. Ejecute `npm install` para instalar las dependencias.
4. Renombre el archivo `.env.example` a `.env` y complete las variables de entorno.
5. Ejecute `npm run start:dev` para iniciar el proyecto.

# Run tests

1. Renombre el archivo `.env.test.example` a `.env.test` y complete las variables de entorno.
2. Ejecute `npm run test:e2e` para ejecutar los tests.

# Prisma Studio

- modo test: `npx dotenv -e .env.test -- prisma studio`
- modo dev: `npx dotenv -e .env -- prisma studio`

## Nestjs cli

- Generar modulo `nest g module <nombre>`
- Generar controlador `nest g controller <nombre>`
- Generar servicio `nest g service <nombre>`

- `--no-spec` para no generar archivos de test

## Prisma cli

- Generar modelo `npx prisma generate`
- Generar migracion `npx prisma migrate dev --name <nombre>`
- Generar modelo y migracion `npx prisma migrate dev --name <nombre> --create-only`
