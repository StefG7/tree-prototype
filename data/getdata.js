const fs = require('fs');
const filePath = 'scenario-1.json'

var scenario = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
// console.log(data[0])