## Cluno Fullstack Task 

This is the cluno's Fullstack task implementations containing both the frontend and backend repos and details.

Please test the implementation at the following link.

https://cluno-final.firebaseapp.com/#/dashboard

To log in use the the following credentials.

username: test@cluno.com
passwors: cluno12345

## Frontend 

1. The frontend is hosted on Firebase with Firebase authentication. 
2. It is an angular application based on the core ui theme. 
3. Some of the salient features of the front end implementation include services using Dependency Injections to resue business logic, admin guards to prevent views from non logged in users, using observables from the rxjs library to access the REST API with the http client module and lazy loading etc.

## Backend

1. The backend is an ExpressJs based Rest API hosted on a Linux machine on Google cloud platform.
2. The linux is used with nginx as a proxy server with https certificates from letsencrypt.
3. For sercure communication between the front end and the backend, JWT are used to authenticate a https request.

To run the frontend locally, simply use ng serve --open for the frontend after installing all the missing node dependencies by using npm install command.

To run the backend locally, use the node cluno-backend.js command after again installing the middleware dependancies.
