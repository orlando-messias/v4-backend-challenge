## VUTTR - Backend

### :computer: About

VUTTR API uses NodeJS, Express, Docker and BD Postgres to allow users to manage some tools with their respective ***names, links, descriptions*** and ***tags*** by searching, adding and removing them.

Everyone can search for tools in the repository but in case of adding new ones or delete them, user login is required. **PS:** in case of your first access, you need to register first and then login to add or delete any tool.

The project runs on port **3000**.


### :gear: Install
```
## Clone the repository
$ git clone https://github.com/orlando-messias/v4-backend-challenge.git

## Install all dependencies
$ npm install

## Run docker-compose to build and access Postrgres DB
$ docker-compose up -d

## Run the project to start server
$ npm run dev
```

### :vertical_traffic_light: Available Routes
tools
![](/images/routes01.png)

users
![](/images/routes02.png)

### :hammer_and_wrench: Technologies
- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [Typescript](https://www.typescriptlang.org)
- [JWT](https://jwt.io/)
- [Typeorm](https://typeorm.io)
- [Class-Validator](https://github.com/typestack/class-validator)
- [Docker](https://www.docker.com)
- [PostgreSQL](https://www.postgresql.org/)
- [Cors](https://www.npmjs.com/package/cors)


#
> Developed by Orlando Messias [linkedin.com/in/orlando-messias-dev](https://www.linkedin.com/in/orlando-messias-dev)
