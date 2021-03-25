# District Aid

Projet dans le cadre des Ydays (Ynov Toulouse)

## How to test docker

- Have Docker installed
- `docker build -t da/web .`
- `docker run -p 3000:3000 -p 27017:27017 -e "MONGO_KEY=<A MONGO KEY>" -p "JWTSECRETKEY=district-aid" da/web`
- `test on localhost:3000`

## To push Dockerfile to Heroku and make web deploy

- `heroku login`
- `heroku container:login`
- `heroku container:push web -a district-aid`
- `heroku container:release web -a district-aid`
- `heroku open`

## Useful links

### Release into Heroku

https://dev.to/pacheco/how-to-dockerize-a-node-app-and-deploy-to-heroku-3cch
