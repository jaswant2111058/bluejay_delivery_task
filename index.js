const fs = require('fs');
const csv = require('csv');

// Specify the path to your CSV file
const csvFilePath = "./Assignment_Timecard.csv";

// Read the CSV file
const fileContent = fs.readFileSync(csvFilePath, 'utf8');

// Parse the CSV content into JSON
csv.parse(fileContent, { columns: true }, (error, data) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    // The 'data' array contains the parsed JSON data
    console.log('CSV file successfully processed.');
    console.log(data[5]);
  }
});
