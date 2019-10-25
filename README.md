# Entrega 4 - Proyecto Programación Web

<link server>

[NodeJS](https://nodejs.org/en/) - [NPM](https://www.npmjs.com/get-npm) o [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)

### Deployment

```ssh
$ git clone repo
$ nano repo/server/.env
``` 

Llave de acceso a la base de datos MongoDB - Mlab. Debe estar en archivo **.env** preferible dentro del directorio **/server**
> MLAB=mongodb://grupo5:grupo5@ds121406.mlab.com:21406/entrega4

```ssh
$ cd repo/
$ npm start
``` 

Error: posiblemente falta el archivo .env con la llave de acceso a Mlab. <br/>

### MongoDB

Para conectarse a la base de datos:

```ssh
$ mongo ds121406.mlab.com:21406/entrega4 -u grupo5 -p grupo5
$ show dbs
``` 




<hr/>



### Deployment - Server


```ssh
$ cd server/
$ npm start
``` 


<hr/>


### Deployment - Client


```ssh
$ cd client/
$ npm start
``` 


<hr/>


### Deployment - Dev mode


```ssh
$ cd server/
$ npm dev
``` 


<hr/>


### File directory

```ssh
.
├── package.json  # -> Management and dependencies, application deployment
├── .gitignore    # -> Specifies intentionally untracked files to ignore
├── Procfile      # -> Heroku commands that are executed by the app on startup
│
├── server
│   ├── server.js     # -> Backend entry point
│   ├── test.js
│   ├── package.json
│   ├── .gitignore
│   ├── .env
│   ├── models        # -> MongoDB Models
│   |   └── user.js
│   |   └── ...
│   └── routes        # -> Express URL Routing
│       ├── users.js
│       ├── user.test.rest
│       └── ...
|
└── client
    ├── package.json
    ├── .gitignore
    ├── src
    │   ├── index.js            # -> React DOM Render entry point
    │   ├── index.css
    │   ├── serviceWorker.js    # -> React web performance advantages
    │   └── App                 # -> React Components
    │       ├── _Index
    │       |   └── App.js
    │       |   └── App.test.js
    │       |   └── App.css
    │       |   └── Home.js
    │       ├── User
    │       |   └── User.js
    │       |   └── User.css
    │       └── ...
    └── public
        └── index.html          # -> Frontend entry point
    
``` 
