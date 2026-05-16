# Weevr

A React web application for bird species identification, built around 
a custom-trained TensorFlow Lite model. Users connect to live bird 
feeder webcam streams, submit frames for identification, and browse 
species information. Designed as a companion app for a smart bird 
feeder product concept.

## Stack

React · Node.js · Express · MariaDB · TensorFlow Lite

## Features

- Live bird feeder stream integration
- Custom TensorFlow Lite model for species identification
- User authentication
- Species information browser
- MariaDB backend with full schema included

## Screenshots

*Coming soon*

## Installation

**Clone the repo:**
```bash
git clone https://github.com/consurdist/weevr.git && cd weevr
```

**Install MariaDB and set up the database:**
```bash
sudo apt install mariadb && sudo mariadb
```
```sql
create database birdidapp;
grant all privileges on birdidapp.* TO 'birdy'@'%' identified by 'W33verDB';
flush privileges;
quit
```

**Restore the database:**
```bash
sudo mysqldump -u root -p birdidapp < birdidapp.sql
```

**Install dependencies and run:**
```bash
npm install
cd backend && npm install && cd ..
npm run dev
```

Server runs at `http://localhost:3000`

## Status

Functional as of January 2020. Was self-hosted in production on a 
Linux server with the React build served statically and Node backend 
running separately. Backend bird feeder stream sources are no longer 
active — local testing requires substituting an alternative stream 
source. Not actively maintained.
