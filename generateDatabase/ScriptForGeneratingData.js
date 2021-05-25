const fs = require("fs");
const arr = [];
const Max = 1e5;
const totalEntries = 1e5;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function convertTojson() {
  const res = JSON.stringify(arr);
  fs.writeFile("data.json", res, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}


for (var i = 0; i < totalEntries; i++) {
  const vehicleData = {
    vehicleId: i,
    vehicleX: getRandomInt(i+5),
    vehicleY: getRandomInt(i+5),
  };
  arr.push(vehicleData);
}

convertTojson();
