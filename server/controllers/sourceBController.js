const fs = require('fs');
const axios = require('axios');

export const getAll = (req, res, next) => {

  axios.get('https://api.apispreadsheets.com/data/16935/')
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });

};

export const create = (req, res, next) => {

  const newUserId = Math.floor(100000 + Math.random() * 900000);

  const newData = {
    id: newUserId,
    email: req.body.email,
    name: req.body.name  
  };

  axios.post('https://api.apispreadsheets.com/data/16935/', {
    data: newData
  })
  .then(response => {
    req.app.emit('sourceBUpdated', 'added', newData);
    res.send({success: true, msg: 'user added successfully'})
  })
  .catch(error => {
    console.log(error);
  });

};

export const update = (req, res, next) => {

  const userId = req.params['id'];

  const updatedData = {
    name: req.body.name,
    email: req.body.email
  }

  axios.post('https://api.apispreadsheets.com/data/16935/', {
    data: updatedData,
    query: 'select*from16935whereid=' + userId
  })
  .then(response => {
    updatedData.id = userId;
    req.app.emit('sourceBUpdated', 'updated', updatedData);
    res.send(`user with id ${userId} has been updated`)
  })
  .catch(error => {
    console.log(error);
  });
}