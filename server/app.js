/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import * as routes from './routes';

const app = express();
const axios = require('axios');
const path = require("path");
const fs = require('fs');
const array = require('lodash/array');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/api/source_a/users', routes.sourcea);
app.use('/api/source_b/users', routes.sourceb);

app.on('sourceAUpdated', (actionType, data) => {

    // Sync data to Source B
    if (actionType === 'added') {
        axios.post('https://api.apispreadsheets.com/data/16935/', {
            data: data
        })
        .then(response => {
            console.log('Source B Sync Successfully');
        })
        .catch(error => {
            console.log(error);
        });
    } else { // updated

        axios.post('https://api.apispreadsheets.com/data/16935/', {
            data: {
                name: data.name,
                email: data.email
            },
            query: 'select*from16935whereid=' + data.id
          })
          .then(response => {
            console.log('Source B Sync Successfully');
          })
          .catch(error => {
            console.log(error);
          });
        
    }
});

app.on('sourceBUpdated', (actionType, data) => {

    const dataPath = path.resolve(__dirname, "datasource/users.json");

    // Sync data to Source A
    if (actionType === 'added') {

        let currentUsers = JSON.parse(fs.readFileSync(dataPath));
      
        currentUsers.data.push(data);
      
        const stringifyData = JSON.stringify(currentUsers);
        fs.writeFileSync(dataPath, stringifyData);

        console.log('Source A Sync Successfully');
    } else { // updated

        let currentUsers = JSON.parse(fs.readFileSync(dataPath));

        const objIndex = array.findIndex(currentUsers.data, function(o) { return o.id == data.id; });
      
        currentUsers.data[objIndex] = {
            id: parseInt(data.id),
            name: data.name,
            email: data.email
        };
      
        const stringifyData = JSON.stringify(currentUsers);
        fs.writeFileSync(dataPath, stringifyData);

        console.log('Source A Sync Successfully');
    }
});


module.exports = app;
