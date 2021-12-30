# Metric-Imperial Converter

This project is the first of five projects completed for FreeCodeCamp's sixth (final JavaScript) certificate: [Quality Assurance](https://www.freecodecamp.org/learn/quality-assurance/#advanced-node-and-express). FreeCodeCamp provided [assignment instructions](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter) and [starter code on GitHub](https://github.com/freeCodeCamp/boilerplate-project-metricimpconverter/). 

The application was created with Express.js and Chai.js to convert metric units to imperial units, specially gal <-> L, mi <-> km, and kg <-> lbs. The first task was to establish the route /api/convert/ to accept GET requests. Then, the methods of the Convert Handler class were to be implemented to work with that  route. Regex expressions were used to properly analyze user input, making sure to extract the number and unit for the user input. Any invalid input will will cause a method to return null, which should trigger an error message of "invalid unit and time," "invalid unit," or "invalid time."

Unit tests and functional tests for the application were then written, and they can be found in the /tests/ directory. 

The starter code came with a single-page of HTML (index.html) that contained an ajax request to send GET requests to the /api/convert/ route. The results are displayed on the page after input is added to the form and submitted. 