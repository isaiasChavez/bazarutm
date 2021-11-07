# Corvofarma Backend
Corvofarma es un proyecto de universidad en el cual tratamos de vender recetas digitales relacionadas a la salud y el objetivo es practicar las habilidades de desarrollo con Nodejs
#### Tecnologías utilizadas
##### [Nodejs](https://nodejs.org/es/)
##### [Typeorm](https://typeorm.io/)
##### [Typeorm](https://www.typescriptlang.org/) 
##### PostgreSQL
##### Express Js

## Instalación
### Yarn 
Para instalarlo necesitan tener [Nodejs](https://nodejs.org/es/) instalado en su máquina  
Una vez instalado correr el comando, junto con nodejs se incluye un gestor de paquetes llamado **NPM**  
Para el caso de este proyecto usaremos una versión mejorada llamada **Yarn** que instalaremos de la siguiente forma por linea de comandos
```bash
npm install --global yarn  
```
### Instalación de paquetes
Nodejs Funciona con paquetes que cumplen funcionalidades específicas pero estos no son descargados con el repositorio ya que tienen un peso bastante elevado por lo que deben ser instalados una vez que se haya descargado el código fuente principal del repositorio  
para instalarlo corremos el siguiente comando **dentro de la raiz del repositorio**
```bash
yarn  
```
Una barra de progreso debe aparecer y deben dejar que termine.  
cuando esta termine una carpeta nueva debe aparecer en la raiz del proyecto llamada **node_modules**  
No es necesario realizar ninguna actividad dentro de esa carpeta

## Compilación
Dentro del proyecto se darán cuenta que los archivos no son nombrados con la extensión **.js** en su lugar están nombrados con **.ts**, estos son archivos de Typescript y tienen una sintaxis un poco distinta de javascript puro, no hay que preocuparse por esto ya que no requieren conocer la sintaxis de Ts, pueden escribir js puro sin los agregados de un archivo ts, pero lo que si hay que hacer es **compilar el código** antes de montar el servidor
para esto solo deben correr el siguiente comando dentro de la raiz del repositorio
```bash
yarn start:dev
```
Lo que hará este comando es compilar el proyecto e inicializar el servidor  
Deberán ver un mensaje en la consola y esta debe detenerse, no podrán escribir en esa consola mientras esté corriendo el servidor.

```
DataBase is connected
================================
Server is listening on 3000
```
Listo, ya tienen el proyecto corriendo