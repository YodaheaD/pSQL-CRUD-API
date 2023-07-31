## CRUD Express API for PostgreSQL databases
#### By: Yodahea Daniel

### Features of Project

- An Express-TS API for PostgreSQL databases. 


#### Goals for project:

- Create a Express, Typescript based API to use for web development.
- Create an API configured for a database (PostgreSQL).
- Work with containers and multi-container applications.


#### Future Features

- Adding authentication to Express API with JWT/AuthO.
- Adding to the docker-compose, a client-side webpage for interacting with the Exp-API.


### Softwares Used: 

#### Docker 

* Docker is a tool for building, running, and delivering applications. The apps are packaged in 'containers' that house everything needed to run the app like dependencies. With containers, deploying applications is simple because everything that is need to do so is within the container. 

* Docker-compose is a tool within Docker used to run multi-container projects. We use a .yaml to define the services need then use the command 'docker compose up/down' to easily build up or retract the containers. 


#### Express

* Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
* It was released as free and open-source software under the MIT License. 
* It is designed for building web applications and APIs.
* considered the standard server framework for Node.js

#### PostgreSQL

* An open source, RDBMS relational database management system for data storage. 
#### Helmet 

* Helmet. js is an open source JavaScript library that helps you secure your Node. js application by setting several HTTP headers. 
* It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards.


#### Cross Origin Resource Sharing

* CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. 
* The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.


### Versions List 

##### 1.0 <-> Initial Release
- API performs Add, view, and delete functions for data in a Postgres Database Table.
- Table: 'items' holds product information for a companies repository. 
- Future Improvement: create class for interacting with DB to make code more efficient, adding authentication or caching. 

##### 1.1 <-> Table Class Release
- API now has generic class that contains function for adding, viewing, and deleting data from Postgres DB table called 'tablelike.ts. 
- Table like generic class: 'createTable()', 'addToDb()', 'deleteFromDb()','getAllData()', 'getDataWId()'.
- Future Improvement: Authentication to routes, caching data, more efficient coding.


