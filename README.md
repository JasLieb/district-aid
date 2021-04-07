# District Aid

## Prerequisites

- Have VS Code installed. Some extensions are needed such like Dart and Flutter to be able to develop and debug the application.
- Have Node installed, minimal version 10.17.0 and NPM package manager
- Have Flutter installed. [See here](https://flutter.dev/docs/get-started/install) for a local installation and setup with your VS Code editor.
- Have Docker installed. Used now only for a (pre-)production purpose.
- Have a Heroku account and Heroku CLI installed.

## How to build docker image

- `docker build -t da/web .`
- `docker run -p 3000:3000 -p 27017:27017 -e "MONGO_KEY=<A MONGO KEY>" -e "JWTSECRETKEY=district-aid" da/web`
- `test on localhost:3000`

## To push Dockerfile to Heroku and make web deploy

- `heroku login`
- `heroku container:login`
- `heroku container:push web -a district-aid`
- `heroku container:release web -a district-aid`
- `heroku open -a district-aid`

## Architecture

The project is divided into two parts with the `Front` folder which it will contain the user application developed in Flutter; and the `Back` folder will contain the NodeJs server and make the binding between a [cloud Mongo database](https://www.mongodb.com/cloud/atlas) and the previous Flutter app. This point will describe the content of the current project.

### External services

- [MapBox](https://www.mapbox.com/) 

### Back

- `bin/` : classical folder for a Express NodeJs app
- `factories/` : mongoDB connection creation and services. Quite confusing here about User or InterestPoint factories which have some business logic. Should be renamed as services
- `middleware/` : services injected into the server to allow log generation for example
- `models/` : model for business entities mongoDb compliant
- `route/` : server routes available here
- `test/` : server tests. Execute them with `npm start` inside the `Back` folder
- `web/` : Builded Flutter web app which will be served by the server
- `.envDefault` : For local development purpose, make a copy named `.env` and fill it with need environment variables
- `app.js` : Server entry point
- `config.js` : Server configuration
- `packages.json` : Server dependencies, install them with `npm start`
- `swagger.json` : Open Api documentation. Fill this file belong as you develop a new route with associated description, payload needed / send or model used.

### Front

- `android/` : Android specifications for building purposes
- `assets/` : Assets used by the app
- `ios/` : Ios specifications for building purposes (Apple licence needed to allow build for this target)
- `lib/` : source code for the app, main.dart is the entry point
- `route/` : server routes available here
- `test/` : app tests. Not implemented
- `web/` : web  specifications for building purposes
- `.envTemplate` : For local development purpose, same goal as Back folder. This mechanism should disappear in the future.
- `pubspec.yaml` : App dependencies, install them with `flutter pub get`, and declared assets

A focus for the user app architecture is needed to understand used pattern. It's a reactive pattern named [Bloc](https://bloclibrary.dev/#/). It allows to split the business logic from the view generation into a _bloc_.

A bloc will have the responsibility to ask to the server the needed data and handle state management. It will instanced by the page widget and will be able to build the related view via a BlocBuilder. This widget will listen for state changes and adapt the view. And This is where resides the reactive principle : listen for a state change and react consequently.

Between the bloc and the view (page widget), we have to imagine a unilateral pipe between which will deserve state changes to the view and an another one which will deserve events to the bloc. For example when a button is pressed, the view will notify the bloc with an event and then, the bloc will react with a new state change.

## In the future, if the project is still alive

- Offer full Flutter environment via Docker and VS code container workspace. Same the whole environment inside a docker-compose
- [Contact me](mailto:jas.lieb@hotmail.com) to have required access, to define a code of conduct, gain any information about the whole project
- Find a new provider for map titles, [MapBox](https://www.mapbox.com/) was previously used
- Think about pros and cons of use of Mongo Atlas
- Make Flutter tests
- Improve the DevOps workflow

## Useful links

- [Release into Heroku](https://dev.to/pacheco/how-to-dockerize-a-node-app-and-deploy-to-heroku-3cch)

- [Flutter and Docker workspace](https://medium.com/@cezary.zelisko/how-to-prepare-a-flutter-workspace-in-a-docker-container-e56e0c7c7dcd)
