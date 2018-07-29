# Neighboorhood Map React

This is my final project in Udacity's "Web Front-End Advanced Nanodegree" program.
The goal was to build a accessible and responsive single page application using React, Google Maps and a third party API (I used [Foursquare](https://foursquare.com/)) to display a Neighboorhood map.
More information on the requirements can be found [here](https://review.udacity.com/#!/rubrics/1351/view).

## Running the app

- Download the project from [this repository](https://github.com/jose-lehmkuhl/neighborhood-map-react.git).
- While on the project directory in your terminal:
  - run `npm i`
  - then `npm start`
- The app will run at [http://localhost:3000/](http://localhost:3000/).

Note that the app has a service worker to run offline first that, but for that you must start the app in production mode:

- Download the project from [this repository](https://github.com/jose-lehmkuhl/neighborhood-map-react.git).
- While on the project directory in your terminal:
  - run `npm run build`
  - then `python -m SimpleHTTPServer 8000`
- The app will run at [http://localhost:8000/](http://localhost:8000/).


## Dependencies

The app uses React, Google Maps and the Foursquare API. 
<sub>note that you need npm to run it<sub>