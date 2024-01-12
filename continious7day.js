// Required modules
const fs = require('fs');
const csv = require('csv');
const _ = require('lodash');

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
        // Array to store names of employees who worked continuously for 7 days
        const continuous7day = [];

        // Initialize variables
        let employeeName = null;
        let dayCount = 1;

        // Iterate over the employee data
        for (let i = 1; i < employeeData.length - 1; i++) {
            // Extract current and next date from the 'Time' field
            const currentDate = new Date(employeeData[i]['Time']);
            const nextDate = new Date(employeeData[i + 1]['Time']);
            
            // Extract employee name
            const name = employeeData[i]['Employee Name'];

            // Log current and next date for debugging
            console.log(currentDate.getDate(), nextDate.getDate());

            // Check if the employee name changes
            if (name !== employeeName) {
                employeeName = name;
            }
            // Check if the next date is consecutive
            else if (currentDate.getDate() + 1 === nextDate.getDate()) {
                dayCount++;
                // Log the day count for debugging
                console.log(dayCount);
            }
            // Check if the dates are the same (possibly consecutive entries on the same day)
            else if (currentDate.getDate() === nextDate.getDate()) {
                continue; // Skip to the next iteration
            } else {
                // Reset the day count if the dates are not consecutive
                dayCount = 1;
            }

            // Check if the employee has worked for 7 consecutive days
            if (dayCount >= 7) {
                continuous7day.push(employeeName);
                dayCount = 1; // Reset the count for the next employee
            }
        }

        // Display the names of employees who worked continuously for 7 days
        console.log(continuous7day);
    }
});
