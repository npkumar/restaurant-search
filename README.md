# Demo

DEMO: []()

## Screenshots

## Assumptions

Made with [spa-boilerplate](https://github.com/tablecheck/spa-boilerplate)

- Responsive for mobile / tablet / desktop
- [Tablekit](http://tablekit.tablecheck.com/) was available - reused component system, also helped with existing dark mode.
- `@emotion/styled` was available - utilized for styling
- `react-popper` was available - utilized this as part of autocomplete component. This part could be refactored if popper dropdowns were to be used elsewhere in application. Right now, left as is.
- `react-use` was available - utilized for `useMedia` and `useDebounce`
- `tablecheck-icons` was available - utilized for icons
- `@reduxjs/toolkit` introduced for state management
- `@tanstack/react-query` introduced for data-fetching, caching on client side. Defaults are kept currently for revalidation.
- `@testing-library/react` and `@testing-library/jest-dom` introduced for component unit tests
- `en` and `ja` translations have been added for new features
- All unit tests using `jest` for redux and most of new feature components have been written
- Clicking on hotel name on the hotel detail panel will open it's location on google map in a new tab.

## Getting started

- Install [Node.js](https://nodejs.org/en/download/) and [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- Fork/Clone this project
- Run `nvm use` (will use the correct Node.js version)
- Run `npm i --legacy-peer-deps` (will install the dependencies)
- Run `npm start` (will start the app in http://localhost:3000/)

## Running tests

- Run `npm test` (will run the unit tests)

## Features

- Main tech stack: React, TypeScript, Emotion, i18n
- Tablekit integration with FontAwesome icons and Dark Mode
- Basic localized routing
- Basic layout with footer, top and side navs
- Language Selection
- Responsive
- Basic FormSpree contact form

## Deploy to production

The boilerplate is configured to be deployed to [Netlify](https://netlify.com), but it can also work with Github pages,
Vercel, AWS Amplify, etc.

Instructions for a Netlify setup:

- Click on `New site from Git`
- Select `Github` and the repository where you forked it
- Change Publish directory to `build/public`
- Change the Build command to `CI= npm run build`
- Deploy site
- You can change the URL name on `Site settings > Change site name`

## Caveats

- At some point, if the project becomes a real product, all the files in `/public/static/img` and `/public/static/fonts`
  should be removed and loaded from a CDN
- The CDN URL should be specified in `/config/default.json`

## Upgrade

To upgrade this boilerplate and use the latest configuration and dependencies, please run this command and select SPA
when asked:

`npx --legacy-peer-deps -p @tablecheck/scripts tablecheck-scripts init`
