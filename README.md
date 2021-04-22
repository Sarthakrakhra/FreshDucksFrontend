# Freshducks - Frontend

This mini-project is developed as the frontend for the Full-Stack Developer Test. You can find a working demo [here](https://fresh-ducks.herokuapp.com/)

To run the application please look at the commands below. First thing you will want to do is execute the commands in the [Project Setup](#project-setup) section and then you can run the application by executing the command in the [Compiles and run application locally](#compile-and-run-application-locally) section.

### Project Setup

To setup the project we first need to install all the main and development dependencies using the command:

```
npm install
```

Since there is some sensitive information such as the link to the backend and the API Key for the [Google Places API](https://developers.google.com/maps/documentation/javascript/places-autocomplete) we need to create a `.env` file in the root directory of the project.

`.env` is a file which holds envrionment variables. These variables can in turn be used to store sensitive data and be accessed from the source code. The variables to add in the `.env` file are provided in the written document submitted with this project.

Eventhough the `.env` file is mentioned in the `.gitignore`, it is vital that envrionment variable files are not committed to the repository. To read more, please visit the [VueJS CLI website](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)

### Compile and run application locally

```
npm run serve
```

### Compiles and minifies for production

I do not quite use this command locally since the build is created by [this buildpack](https://github.com/heroku/heroku-buildpack-static) in the [Heroku](https://heroku.com/) deployment service. This allows us to just push our changes up and let the server build the project.

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/) to read more how to configure Vue in your local envrionment.
