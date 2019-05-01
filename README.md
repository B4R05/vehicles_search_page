# Introduction

> Search cars for rent with the Drover API!

![](https://img.shields.io/github/last-commit/GavBaros/vehicles_search_page.svg?style=flat)
![](https://img.shields.io/github/repo-size/GavBaros/vehicles_search_page.svg?style=flat)
![](https://img.shields.io/david/GavBaros/vehicles_search_page.svg?style=flat)

## Table of Contents

1. [About](#about)
1. [Previews](#previews)
1. [Demo](#demo)
1. [Installation](#installation)
1. [Tests](#tests)
1. [Styling](#styling)
1. [Improvements](#improvements)

# About

This app is a search page prototype allowing a user to search for rental cars based on dynamic criteria sent to the Drover API.

### Features

- Change any dropdown or slider search filters and see all car results fetched matching those filters
- Clearable active filters show up as a user interacts with any dropdown / sliders to indicate their current selection
- Pagination
- PCO and Consumer hire types: A user can search for both private and consumer cars
- Fully responsive layout: fits mobile, tablet and desktop widths smoothly
- Expandable search filters minimise as soon as a user reaches mobile widths

# Previews

### Consumer Mode Preview

The Consumer mode only lists cars for regular individual use.

![](consumer.gif)

### PCO Mode Preview

The PCO mode lists cars for private group use, with a rolling subscription option, Uber Types and City Jurisdiction options not available in Consumer mode.

![](pco.gif)

# Demo

https://drover-7b33b.firebaseapp.com

# Installation

For Mac OS, Linux and Windows, from your terminal:

```sh
git clone https://github.com/GavBaros/search_filter.git
cd search_filter
npm install
npm start
```

# Tests

Only simple unit tests were done as per specifications. In-depth unit and integration tests could have been done given more time.

From your terminal:

```sh
npm run test
```

# Styling

[2]: https://github.com/Semantic-Org/Semantic-UI-React

The [Semantic UI React][2] component library has been used for a highly scalable, ready-to-use and consistent styling across the app. Extra styling was added to make the app resemble as close as possible to the original search page.

### Responsive Layout

The app is fully responsive across all devices and the breakpoints easily configurable by setting them on the `Grid` component in `App.js`.

![](responsive.gif)

### Additional UX implementations

- A loading indicator and `searching for cars` text are displayed while fetching results
- `Car Model` is disabled unless a `Car Make` is actively selected
- Used `react-graceful-image` to lazy load images on demand
- Smooth scroll to the top of the page each time new cars are fetched
- For the PCO mode, a placeholder stock photo is provided as the url for all cars as the images provided for PCO types look generic compared to those of the Consumer stock photos

# Improvements

- Redux form could have been used to facilitate certain features
- The logic which prompt clearable active filters to show up could always be improved
- `react-places-autocomplete` could have been used as an autocomplete feature for the `location` field
- Testing the redux store, reducers, action creators and connected components could have been done
