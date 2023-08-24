const fs = require("fs");

function parseData(data) {
  // Split the input into lines
  const lines = data.trim().split("\n");

  // Define time periods based on given data
  const timePeriods = ["1 vko", "1 kk", "3 kk", "6 kk", "12 kk"];

  // Initialize the final result object
  let result = {};
  for (const period of timePeriods) {
    result[period] = {};
  }

  // Iterate through the lines and populate the result object
  for (let i = 0; i < lines.length; i += timePeriods.length + 1) {
    const date = lines[i];
    const rates = lines.slice(i + 1, i + timePeriods.length + 1);

    for (let j = 0; j < timePeriods.length; j++) {
      result[timePeriods[j]][date] = rates[j];
    }
  }

  return result;
}

// Read from rates.txt
fs.readFile("rates.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the data
  const parsedData = parseData(data);

  // Save parsed data to a JSON file
  fs.writeFile("rates.json", JSON.stringify(parsedData, null, 4), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }

    console.log("Data saved to rates.json");
  });
});
