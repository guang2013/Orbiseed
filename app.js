const express = require('express');
const data = require('./data');
  
const app = express();
  
app.use('/', (req, res, next) => {
  const filters = req.query;
  const filteredCars = data.filter(car => {
    let isValid = true;
    for (key in filters) {
      if (key.includes('gte')){
        let oriKey = key.split('_')[0]
        isValid = isValid && car[oriKey] >= filters[key]
      }
      else if (key.includes('lte')) {
        let oriKey = key.split('_')[0]
        isValid = isValid && car[oriKey] <= filters[key]
      }
      else isValid = isValid && car[key] == filters[key] ;
    }
    return isValid;
  });
  res.send(filteredCars);
});
  
app.listen(5000, () => {
  console.log('Server started!');
});