<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Iniciar proyecto

1. Clone el repositorio.
2. Ejecute `docker-compose up -d` para iniciar la base de datos.
3. Ejecute `npm install` para instalar las dependencias.
4. Ejecute `npm run start:dev` para iniciar el proyecto.

## Nestjs cli

- Generar modulo `nest g module <nombre>`
- Generar controlador `nest g controller <nombre>`
- Generar servicio `nest g service <nombre>`

- `--no-spec` para no generar archivos de test

## Prisma cli

- Generar modelo `npx prisma generate`
- Generar migracion `npx prisma migrate dev --name <nombre>`
- Generar modelo y migracion `npx prisma migrate dev --name <nombre> --create-only`

## Stack

- NestJS
- Prisma
- Postgres
- Docker
- class-validator
- class-transformer
