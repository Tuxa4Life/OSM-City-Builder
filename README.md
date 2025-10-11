# OSM 3D Map Builder

A React app that fetches geographic data from **OpenStreetMap (OSM)** and generates a **3D map** using **Three.js** based on node information. You can also **export the 3D map as a GLTF file**.

## Features

-   Fetch city/region data from OSM.
-   Convert OSM nodes into 3D geometries.
-   Interactive 3D map rendering with **Three.js**.
-   Export the generated map as a **GLTF file**.
-   User-friendly interface to select countries or regions.
-   Dynamic updates for selected areas.

## Installation

```bash
git clone https://github.com/Tuxa4Life/OSM-City-Builder.git
cd OSM-City-Builder
npm install
npm start
```

## Usage

1. Open the app in your browser.
2. Select a country or region.
3. The app fetches OSM data and generates a 3D map.
4. Interact with the map using mouse controls (rotate, zoom, pan).
5. Click Export to save the map as a .gltf file.

## Tech Stack

-   React – Frontend framework
-   Three.js – 3D map rendering
-   Axios – API requests to OSM
-   OpenStreetMap API – Geospatial data source
-   Open-Elevation API - Geoelevation data source

## API and Function data structure

-   Raw building data

```json
{
    "type": "way",
    "id": 25698772,
    "bounds": {
        "minlat": 41.7095295,
        "minlon": 44.8495167,
        "maxlat": 41.7103581,
        "maxlon": 44.8505023
    },
    "nodes": [
        280177984,
        280177937,
        ...
    ],
    "geometry": [
        {
            "lat": 41.7100213,
            "lon": 44.8495167
        },
        {
            "lat": 41.7103581,
            "lon": 44.8501463
        },
        ...
    ],
    "tags": {
        "building": "yes",
        "tourism": "hotel"
        ...
    }
}
```
  
-   Eleveation

```json
// input
[
    {
    "latitude": 41.7099,
    "longitude": 44.85
    },
    ...
]

// output
[
    {
        "latitude": 41.7099,
        "longitude": 44.85,
        "elevation": 587
    },
    ...
]
```
  
-   Processed building data

```json
// input
[
    {
        "nodes": [
            [
                44.8495167,
                41.7100213
            ],
            [
                44.8501463,
                41.7103581
            ],
            ...
        ],
        "height": 3,
        "center": {
            "latitude": 41.7099,
            "longitude": 44.85
        },
        "elevation": 587
    },
    ...
]

// output
[
    {
        "nodes": [
            [
                298.6236,
                -178.4477
            ],
            [
                303.2018,
                -175.1661
            ],
            ...
        ],
        "height": 9,
        "elevation": 20.48
    },
    ...
]
```

- Countries
```json
{
    "georgia": "GE",
    "cyprus": "CY",
    "belgium": "BE",
    ...
}
```

- Cities
```json
{
    "Tbilisi": 1996871,
    "Rustavi": 5997314,
    "Kutaisi": 8742174,
    ...
}
```