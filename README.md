![image](https://user-images.githubusercontent.com/6332116/39202145-73bcfcd4-47c7-11e8-92bc-c5fdbc495a6f.png)

# Jason [WIP]

[![Build Status](https://travis-ci.org/getninjas/jason.svg?branch=master)](https://travis-ci.org/getninjas/jason)
[![Maintainability](https://api.codeclimate.com/v1/badges/f3ff27575c8f7872b296/maintainability)](https://codeclimate.com/github/getninjas/jason/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f3ff27575c8f7872b296/test_coverage)](https://codeclimate.com/github/getninjas/jason/test_coverage)

Killer JSON form generator.  [NPM](https://www.npmjs.com/package/jason-react-form)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

After creation, your project should look like this:

```
jason/
  README.md
  node_modules/
  package.json
  public/
    index.html
  src/
    index.js
    index.dev.js
  spec/
```

For the project to build, **these files must exist with exact filenames**:

* `src/index.js` is the JavaScript entry point for build.
* `src/index.dev.js` is the JavaScript entry point for development.

You can delete or rename the other files.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:7777](http://localhost:7777) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run coverage`

Launches the *coverage* test runner in the interactive watch mode.

### `npm run clear`

Delete the `build` generated path.

### `npm run version`

Generate version for publish on npm. Ex.: `npm version major|minor|patch -m "Message"`

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.
