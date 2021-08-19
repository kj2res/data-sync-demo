# Data Synchronization Demo
Data synchronization between 2 data stores

## Data Stores used

- JSON file ( Data Source A )
- Google Sheet via API (apispreadsheets.com) ( Data Source B )

## Features

- Store A endpoints ( Create, Update, Get )
- Store B endpoints ( Create, Update, Get )

- Store B endpoints cannot read/write directly to data store #B
- Store A endpoints cannot read/write directly to data store #A

- When an entity is added/updated to data store A, the entity is also created/updated in data store B
- When an entity is added/updated to data store B, the entity is also created/updated in data store A

## Requirements

* node >= 8.17.0

## Installation

Clone Repository

```shell
git clone https://github.com/kj2res/data-sync-demo
```

Installing dependencies

```shell
cd data-sync-demo
npm install
```

To Run

```shell
npm start
```
Then server runs on http://localhost:3001

## Endpoints

I added the postman collections in the root folder called `data_sync_endpoints.postman_collection.json` or you can also use this public link https://www.getpostman.com/collections/a3a2cdf02612b7628fc9


## How does it work

When I check the tech challenge about data synchronization, first thing comes into my mind is using `events`. Using `events` make this synchronization possible. These `events` are registered as soon as the server is up and running. If source A is updated, an event will be raised using the `emit()` function. Same thing happens to source B. We raised the `events` on `Create` and `Update` endpoints because that's where the changes happens.

## How long to make this application

I spent 4 hours and 20 minutes to be exact. I did some research on the idea of having two data source and how can we sychronize them. I actually couldn't find any useful resources. Most of the resources are only explaining the offline/online data synchronization from the browser/mobile to the server. I encounter some issues along the way, like data is not updated, dealing with async/sync, etc. But overall it was fun and satisfying. :)

## Assumptions

I only know that `events` will make this synchronization works. I had the same idea on my project before where I needed to inject `model events` or `model listeners`. The idea is just similar when using one data source - example for MySQL, when updating a row on Table A, you also need to update the related row on Table B.

## Queries to resolve

- Data format on initialization

## Part of the application that I'm proud of.

Everything seems to be straightforward. But I'm just having fun working with these magical `events` and I'm happy that it works.

## Improvements

- Remove repetitive functions/implementation
- Validations, Catching errors
- Organize events in separate file
- Add comments
- Remove unused variables

## Demo Video
https://www.loom.com/share/cfda53f857fd4d5abdb8e1cb5c9f2e60

