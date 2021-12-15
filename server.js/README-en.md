<a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/README.md">Portuguese Version</a>

<h3 align="center">🚧 ⚠️ In Progress... ⚠️ 🚧</h3>


 
 
<h2 align="center">Reprographic System - Back-end</h2>

<div align="center">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=&logo=node-dot-js&logoColor=white" />
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=&logo=javascript&logoColor=black" />
 <img src="https://img.shields.io/badge/Express.js-000000?style=&logo=express&logoColor=white" />
<img src="https://img.shields.io/github/license/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/repo-size/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/last-commit/luccazx12/reprography-nodejs">
 </div>


## Introduction
Welcome, this project is our Final Course Paper <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso">(TCC)</a> of the technical course of Development of systems of the SENAI Suiço-Brasileira Paulo Ernesto Tolle School.

#### [Front-end Github Project](https://github.com/ViictorSR388/reprografia_front-end)

 ## Index
- [About the project](#AboutTheProject)
- [Resources used in this project](#ResourcesUsedInThisProject)
   - [Project dependencies](#ProjectDependencies)
- [How to start the application](#HowToStartTheApplication)
   - [Pre-requisites](#preRequisites)
   - [Configuring](#Configuring)
   - [Starting the server](#StartingTheServer)
- [Documentation](#Docs)
- [Tests](#Tests)
- [How to contribute to with the project](#HowtoContributeToWithTheProject)
- [Developers](#Developers)
- [License](#License)


## <a name="AboutTheProject"></a> About the project
This application was requested by the coordinator of the Senai Suiço-Brasileira school, in order to control the prints made by the different sectors of the school (teachers, employees, etc.), thus being able to better manage costs and waste.

## <a name="ResourcesUsedInThisProject"></a> 📌 Resources used in this project:


<table align="center">
 <th><h3>Runtime environment</h3></th>
 <th><h3>Language</h3></th>
  <th><h3>  ORM  </h3></th>
 <th><h3>Data base</h3></th>
 <th><h3>Framework</h3></th>
 <th><h3>Documentation</h3></th>
  <tr>
    <td valign="top" align="center">
      <a href="https://nodejs.org/en/" ><img height="80" width="80" src="https://cdn-icons-png.flaticon.com/512/919/919825.png" style="max-width:100%;"></img></a>
    </td>

   <td valign="top" align="center">
      <a href="https://www.javascript.com"><img height="80" width="80" src="https://www.seekpng.com/png/full/80-803501_javascript-logo-logo-de-java-script-png.png" style="max-width:100%;"></img></a>
      </td>
      
   <td valign="top" align="center">
      <a href="https://sequelize.org"><img height="80" width="100" src="https://sequelize.org/master/image/brand_logo.png" style="max-width:100%;"></img></a>
      </td>
  
   <td valign="top" align="center">
      <a href="https://mariadb.org"><img height="80" width="80" src="https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2018/03/mariadb.png" style="max-width:100%;"></img></a>
    </td>

   <td valign="top" align="center">
      <a href="https://expressjs.com"><img height="80" width="80" src="https://hackr.io/tutorials/learn-express-js/logo/logo-express-js?ver=1557508379" style="max-width:100%;"></img></a>
    </td>

   <td valign="top" align="center">
      <a href="https://swagger.io"><img height="80" width="80"src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img></a>
    </td>
  </tr>
</table>


### <a name="ProjectDependencies"></a> Project dependencies:
  * [Express](https://www.npmjs.com/package/express) 4.17.1 - It is a framework for Node.js that provides minimal resources for building web servers.
  * [Nodemon](https://www.npmjs.com/package/nodemon) 2.0.13 -  To restart the server whenever there is a change.
  * [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 8.5.1 - To protect private routes.
  * [Bcrypt](https://www.npmjs.com/package/bcrypt) 5.0.1 - To Encrypt user passwords before saving to bank.
  * [Crypto](https://www.npmjs.com/package/crypto) 1.0.1 - Used to create a random Token that will be transformed into a string.
  * [Cors](https://www.npmjs.com/package/cors) 2.8.5 - It is a mechanism used by browsers to share resources between different sources
  * [Multer](https://www.npmjs.com/package/multer) 1.4.2 - It is a node.js middleware to handle multipart, which is mainly used to upload files.
  * [Nodemailer](https://www.npmjs.com/package/nodemailer) 6.6.3 - Used to send e-mails.
  * [MariaDB](https://www.npmjs.com/package/mariadb) 2.5.4 - It's the database we use.
  * [Dotenv](https://www.npmjs.com/package/dotenv) 10.0.0 - Used to place environment variables (sensitive data).


## <a name="HowToStartTheApplication"></a> :arrow_forward: How to start the application:

### <a name="preRequisites"></a> Pre-requisites

* Before you start, you will need to have installed on your machine the following tools:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

* Besides, it's good to have an editor to work with the code as: [VSCode](https://code.visualstudio.com).


### <a name="Configuring"></a> Configuring

1. Clone or download this repository to your machine.

2. Install the project dependencies, with the `npm install` or `yarn install` command if you have [yarn](https://yarnpkg.com) installed

3. The `.env.sample` file is used to configure all the environment variables you need, such as information about your **database**. Change all the information so that the application works properly.

```bash
# Data Base
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=

# Mailer
#example: hotmail
MAILER_SERVICE= 
MAILER_USER=
MAILER_PASS=
#Email that requests / reprography evaluations will be sent
MAILER_COMPANY_EMAIL=
#Front-end Host and Port that will be sent in password recovery email
#exaple: http://localhost:3002
MAILER_HOST_PORT= 

#JWT 
JWT_SECRET_KEY=
HEADER_KEY=
SALT_ROUNDS=

#First Account in application
ADMIN_EMAIL=
ADMIN_PASS=
```

4. Remember to rename this file to `.env` to be able to run the application


### <a name="StartingTheServer"></a> Starting the server

**Important:** Before you start the application, first create the **database** that you entered in DB_DATABASE in the configuration file of the environment variables.

Run the command below to start Nodejs and connect to the database:
``` bash
# To start normally -> will run the "start" script of package.json.
$ npm run start

# To start in development mode (requires nodemon) -> will run the package.json "dev" script.
$ npm run dev
```

If you prefer Yarn:
```bash
# To start normally -> will run the "start" script of package.json.
$ yarn start

# To start in development mode (requires nodemon) -> will run the package.json "dev" script.
$ yarn dev
```

⚡ Wait for the API to run and the API will be running at the URL: `http://localhost:3002`

<br>
And so you will have your application running locally.
<br>


## <a name="Docs"></a> 📄 Documentation:

 * [Click here to acess documentation area](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/README-en.md)
 

## <a name="Tests"></a> ⚡ Tests

* [Click here to access the tests](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/tests/README-en.md)


## <a name="HowtoContributeToWithTheProject"></a> 😯 How to contribute to with the project

1. Do a **fork** of the project.
2. Create a new branch with your changes: `git checkout -b my-feature`
3. Save the changes and create a commit message telling you what you've done: `git commit -m "feature: My new feature"`
4. Submit your changes: `git push origin my-feature`
> If you have any questions check out this [guide on how to contribute to GitHub](https://github.com/firstcontributions/first-contributions)


## <a name="Developers"></a> :rocket: Developers :octocat:

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/Luccazx12">
    <img src="https://avatars.githubusercontent.com/u/71888383?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
     <sub><b>Lucca</b></sub><br />:snowflake:TechLead:snowflake:
     </td>
    <td align="center"><a href="https://github.com/patricksp08">
    <img src="https://avatars.githubusercontent.com/u/71887999?v=4" width="100px" alt="Imagem do perfil de Ṕatrick"/>
    <br />
    <sub><b>Patrick</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/MrCyberpunKx">
    <img src="https://avatars.githubusercontent.com/u/71890228?v=4" width="100px" alt="Imagem do perfil de Daniel"/>
    <br />
    <sub><b>Daniel Santos</b></sub><br />:snowflake::snowman::snowflake:
     </td>
     <td align="center"><a href="https://github.com/Oseias-maker">
    <img src="https://avatars.githubusercontent.com/u/71889159?v=4" width="100px" alt="Imagem do perfil de Oséias"/>
    <br />
    <sub><b>Oseias Farias Jesus</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/JoaoOFS">
    <img src="https://avatars.githubusercontent.com/u/71888050?v=4" width="100px" alt="Imagem do perfil de João"/>
    <br />
    <sub><b>João Otávio</b></sub><br />:snowflake::snowman::snowflake:
     </td>
         <td align="center"><a href="https://github.com/Tiagogtr">
    <img src="https://avatars.githubusercontent.com/u/71888086?v=4" width="100px" alt="Imagem do perfil de Tiago"/>
    <br />
    <sub><b>Tiago Soares</b></sub><br />:snowflake::snowman::snowflake:
     </td>
 </tr>
</table>

## <a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/LICENSE">📝</a> <a name="License"></a> License

This project is under the MIT license.
