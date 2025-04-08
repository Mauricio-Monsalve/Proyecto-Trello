# Proyecto clon de Trello

Este es un proyecto de `HTML`, `SASS` y `JavaScript`, en el que se busca maquetar y darle funcionalidad a una aplicativo de tareas, centrado en en el `CSS` avanzado con animaciones, y modularizado con el preprocesador `SASS`, y lógica de programacion avanzada con **ES Modules**, y **POO**.


## Tecnologias usadas

- `HTML5` para la estructura de la aplicacion.
- `SASS` para el estilo y la estructura de la aplicacion.
- `JavaScript` para la logica de la aplicacion.
- `ES Modules` para la modularizacion de la aplicacion.
- `POO` para la programacion orientada a objetos.

## Enlaces a recursos

Algunas de las imagenes y recursos fueron tomados de:
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Wikipedia](https://es.wikipedia.org/wiki/Archivo:Trello-logo-blue.svg)
- [npm](https://www.npmjs.com/package/sass)

## Comandos utilizados para SASS

Para modularizar el `CSS`, se utilizo el preprocesador `SASS`, y se utilizaron los siguientes comandos en la terminal:

1. Descargamos [`Node`](https://nodejs.org/es) para poder descargar paquetes como `SASS`

2. Verificamos que `Node` y `npm` se instalaron correctamente:
    ```
        node -v
        npm -v
    ```

3. Instalamos el preprocesador `SASS` en nuestro proyecto:
    ```
        npm install sass --save-dev
    ```

4. Creamos el archivo `.scss` con el que trabajaremos:
    ```
        touch styles.scss
    ```

5. Ejecutamos `SASS` para que convierta nuestro `.scss` en un `.css` regular:
    ```
        npx sass styles.scss style.css
    ```

6. Si deseamos que siempre esté actualizando el `.css` cuando hagamos algun cambio, agregamos la flag `--watch`:
    ```
        npx sass --watch styles.scss style.css
    ```

## Resumen

Las tecnologias empleadas en el proyecto fueron:

| Tecnología | Función |
|-|-|
|`HTML`|Estructura del proyecto|
|`CSS`|Estilos del proyecto|
|`SASS`|Preprocesador para modularizar el `CSS`|
|`Bootstrap Icons`|Iconos para el proyecto|
|`JavaScript`|Lógica del proyecto|
|`ES modules`|Para modularizar la lógica en archivos independientes|
|`POO`|Trabajar con clases para los __usuarios__ y las __notas__|
|`npm`|Gestor de paquetes para instalar `SASS`|
|`Node`|Entorno de ejecución para `npm`|
|`Git`|Control de versiones para el proyecto|
|`GitHub`|Repositorio remoto para el proyecto|