Both backend and frontend are deployed on Heroku [Demo](https://map-marks.herokuapp.com)

Video of workflow [link](https://drive.google.com/open?id=1SCK6vxmxqiyhu9tP3fJVTQcqDdzOl2go)

Please be sure you are using `https` (get current location doesn't work on not secured connection)

## Tech stack
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Using JS ES6, with React + React Router.

Using Jest for unit tests.

Using `google-map-react` npm package for Google Maps integration.

## Implementation details

### Artwork
Logo and markers were done in Affinity Designer.
SVG were used for better scalability.

### Authentication
User can specify a name at the start of his/her workflow.
There is no need to register before using the app.
User can specify different name each time.

### Map
User can can scroll and navigate through the map.
Current location is displayed on the map via a small green circle icon.
All remarks which are available within currently visible part of the map are displayed as small icons(SVG).
When map is moved - new API call is performed to fetch remarks for the new location.
If there are multiple remarks at the same location they are grouped into one icon
which has a number representing how many records are available for that location.
Clicking on an icon reveals a list of remarks (their author's name, text and create date).

### Add remark
User can add remark at current location

### Search
Clicking on a search button shows a search dialog. Search is performed by matching user name AND/OR remark text.
Search results are displayed in the dialog while map renders their icons.
Each search result includes a distance from the remark to user's current location.
Search is implemented on backend which provides much better scalability (in case of many users and many remarks around the world)

### Personal remarks toggle
There is a button in a bottom side of the screen that toggles between showing all remarks (regardless of the author)
and remarks created by the current user. This toggle, when ON, filters map with remark icons and search results screen, i.e. if it's on you will search within your own remarks and on the map will be rendered only your remarks.
Please note, that for now, remarks are considered yours if names of users are the same. Future improvement add authentication

### Responsive design and browser support
I used [Bulma](https://bulma.io) CSS framework.
Site renders nicely on small and big screens.
Tested in OSX Safari/Chrome, iOS Safari/Chrome

## Features and tasks for the future

### Authentication
Adding proper registration/login work flows. Sending auth token with each request.

### Validations
Name cannot be empty, body cannot be empty

### Handle errors
Handle errors gracefully. Currently I don't react on different errors, 
for example inform user that there is no location data from him/her

### Loaders
Show spinner on requests

### Delete / Edit remark
Allow editing and deleting personal remarks (depends on authentication).

### Search/map interaction
Add ability to click on search result and jump to its location on the map.

### Persisting apps state
Utilize local storage to persist current state and allow to resume work in case of browser reload.

### Toggle button will change it's icon to visualize the state (my remarks/all remarks)

###Group icons based on zoom level
It would be nice to group icons on zoom change. Let's say you will zoom out to the level where you can see many countries, 
you would like to see 1-2 markers per country only. 
Currently grouping of remarks is happening only if lat/lon are exact 

### Different colors for markers
Use different colors to distinguish personal/all other's markers

### Tests
Add additional tests for components.

### Automate linting
Add ES linter and automate code linting. Enable auto code formatting to guarantee consistent code style throughout the code base.

### Redux
Currently all of the state and business logic is managed in `App.js`. In the future as application becomes bigger and more complicated we should consider another state management solution (ie Redux)

### Bugs
There is a bug with calculating distance between test results and current location on search remarks dialog 

Rough time breakout:
- requirements analysis 1 hour
- artwork 1 hour
- backend 3 hours
- investigating google maps API and google react  2 hours
- frontend 8 hours
- deployment 2 hours

# Installation
Setup is trivial
`npm install`

`npm start`

`npm test`

| Please note, in order to render a map, you will need to provide you [Google API key](https://console.cloud.google.com/). You will need to store it in `.env` file in the root folder.
| Alternatively, you can contact me, I will provide my API key. API key is not submitted to repo for security reasons :)

Keys for `.env` file:
```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_MAPS_API_KEY=
REACT_APP_API_URL=http://localhost:3001/
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
