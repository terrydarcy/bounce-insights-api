## Node expressjs application hosted on firebase functions

Deployed live at: https://bounce-insights-ui.web.app/

This project facilitates bounce-insights-ui (https://github.com/terrydarcy/bounce-insights-ui)

## How to run:

- npm i
- npm i -g firebase-tools
- firebase login (I will need to add your google account to the project. Please contact me by email for help with this)

- cd ./functions
- npm run serve

# Endpoint Documentation

This document provides an overview of the available endpoints in the NASA API service for retrieving data related to the Astronomy Picture of the Day (APOD), Mars Rover images, and Mars weather data.

## Table of Contents

1. [Get Astronomy Picture of the Day (APOD)](#1-get-astronomy-picture-of-the-day-apod)
2. [Get Rover Images by Sol](#2-get-rover-images-by-sol)
3. [Get Rover Images by Earth Date](#3-get-rover-images-by-earth-date)
4. [Get Mars Weather](#4-get-mars-weather)
5. [Response Models](#response-models)
6. [Error Handling](#error-handling)

## 1. Get Astronomy Picture of the Day (APOD)

- **Endpoint**: `/apod`
- **Method**: `GET`
- **Description**: Retrieves the NASA Astronomy Picture of the Day (APOD) for the current day.

### Request Example

```bash
GET /apod
```

## 2. Get Rover Images by Sol

- **Endpoint**: `/rover-images/sol`
- **Method**: `GET`
- **Description**: Retrieves Mars Rover images for a specific sol (Martian day).

### Request Parameters

- `sol` (required): The Martian day (integer) for which images should be retrieved.
- `rover_type` (required): The type of rover (`CURIOSITY`, `OPPORTUNITY`, or `SPIRIT`).
- `page` (optional): The page number for paginated results.

### Request Example

```bash
GET /rover-images/sol?sol=1000&rover_type=CURIOSITY&page=1
```

## 3. Get Rover Images by Earth Date

- **Endpoint**: `/rover-images/earth-date`
- **Method**: `GET`
- **Description**: Retrieves Mars Rover images for a specific Earth date.

### Request Parameters

- `year` (required): The year of the Earth date.
- `month` (required): The month of the Earth date.
- `day` (required): The day of the Earth date.
- `rover_type` (required): The type of rover (`CURIOSITY`, `OPPORTUNITY`, or `SPIRIT`).
- `page` (optional): The page number for paginated results.

### Request Example

```bash
GET /rover-images/earth-date?year=2024&month=10&day=5&rover_type=CURIOSITY&page=1
```

## 4. Get Mars Weather

- **Endpoint**: `/mars-weather`
- **Method**: `GET`
- **Description**: Retrieves the latest weather data from Mars.

### Request Example

```bash
GET /mars-weather
```
