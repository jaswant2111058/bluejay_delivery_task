// Required modules
const fs = require('fs'); // Node.js module for file system operations
const csv = require('csv'); // Library for parsing CSV files
const _ = require('lodash'); // Library for utility functions

// Specify the path to your CSV file
const csvFilePath = "./Assignment_Timecard.csv";

// Read the CSV file
const fileContent = fs.readFileSync(csvFilePath, 'utf8');

// Parse the CSV content into JSON
csv.parse(fileContent, { columns: true }, (error, employeeData) => {
    // Check for parsing errors
    if (error) {
        console.error('Error:', error.message);
    } else {

        // Function to calculate the hour difference between two dates
        function calculateHourDifference(startDateStr, endDateStr) {
            // Convert date strings to Date objects
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            // Calculate the time difference in milliseconds
            const timeDifference = endDate - startDate;

            // Calculate the hour difference
            const hourDifference = timeDifference / (1000 * 60 * 60);

            return hourDifference;
        }

        // Array to store names of employees who worked at least 1 hour but less than 10 hours continuously
        const employeeWith10hours = [];

        // Initialize variables
        let employeeName = null;

        // Iterate over the employee data
        for (let i = 1; i < employeeData.length - 1; i++) {
            // Extract 'Time Out' date for the current entry and 'Time' date for the next entry
            const commingDate = new Date(employeeData[i]['Time']);
            const departureDate = new Date(employeeData[i]['Time Out']);

            // Extract employee name
            const name = employeeData[i]['Employee Name'];

            // Check if the employee name changes
            if (name !== employeeName) {
                employeeName = name;
            }
           
            // Check if the hour difference between 'Time' and 'Time Out' is greater than 14 hours
            else if (calculateHourDifference(commingDate, departureDate) > 14) {
                employeeWith10hours.push(employeeName);
            }
        }

        // Display unique names of employees who worked at least 1 hour but less than 10 hours continuously
        console.log(Array.from(new Set(employeeWith10hours)));
    }
});
