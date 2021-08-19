const fs = require('fs');
const path = require("path");
var array = require('lodash/array');

const dataPath = path.resolve(__dirname, "../datasource/users.json");

export const getAll = (req, res, next) => {
  const jsonData = fs.readFileSync(dataPath);
  res.send(JSON.parse(jsonData));
};

export const create = (req, res, next) => {

  let currentUsers = JSON.parse(fs.readFileSync(dataPath));
  
  const newUserId = Math.floor(100000 + Math.random() * 900000);

  const newData = {
    id: newUserId,
    name: req.body.name,
    email: req.body.email
  };

  currentUsers.data.push(newData);

  const stringifyData = JSON.stringify(currentUsers);
  fs.writeFileSync(dataPath, stringifyData);

  req.app.emit('sourceAUpdated', 'added', newData);

  res.send({success: true, msg: 'user added successfully'})
};

export const update = (req, res, next) => {

  let currentUsers = JSON.parse(fs.readFileSync(dataPath));
  
  const userId = req.params['id'];
  const objIndex = array.findIndex(currentUsers.data, function(o) { return o.id == userId; });

  const updatedData = {
    id: parseInt(userId),
    name: req.body.name,
    email: req.body.email
  }

  currentUsers.data[objIndex] = updatedData;

  const stringifyData = JSON.stringify(currentUsers);
  fs.writeFileSync(dataPath, stringifyData);

  req.app.emit('sourceAUpdated', 'updated', updatedData);

  res.send(`user with id ${userId} has been updated`)
}