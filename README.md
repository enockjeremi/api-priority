# API U-Priority

Sideproject creado con la intención de mejorar mis conocimientos en desarrollo web, principalmente en NextJS (Frontend) y NestJS (Backend)

Este repositorio es el backend de la aplicación, está desarrollada con NestJS, TypeORM y Postgres.


## Instalacion
Para correr completamente el proyecto es necesario que tengas instalador Docker en tu sistema, pues se trabaja con una imagen postgres.

Teniendo instalado Docker, clona este repositorio y levanta tu servidor. Dentro del repositorio, está el archivo Docker con las variables que si lo deseas debes modificar. Si modificas este archivo, debes hacer lo mismo con él .env de ejemplo que está en el repositorio.

Por defecto la sincronización de TypeORM con la DB está en "true", si solo estás probando el proyecto, está bien dejarlo así. Si tienes la intención de algo más, es recomendable que coloques esta opción en "false" y ejecutes migraciones.

``` 
npm run start:dev
```

## Recursos utilizados

Para este proyecto lo mas destacable que use fue lo siguiente:

- Jwt (para la generación de tokens)
- Passport (Solo utilicé el passport-local, ya que no deseaba complicarme usando otro tipo de autentificación.)
- Swagger (Lo recalco porque aunque su uso en este proyecto fue algo básico, creo que debería estar en todas las APIs)

## Autor

- [@enockjeremi](https://www.github.com/enockjeremi)
