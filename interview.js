// Task: 1
// You are receiving raw inverter data every minute in the following format:
// JSON:
const data = [
    {
  inverterId: "INV123",
  timestamp: "2025-04-19T10:05:00Z",
  voltage: 230.5,
  current: 4.2,
  power: 967.1,
},{
  inverterId: "INV123",
  timestamp: "2025-04-19T11:05:00Z",
  voltage: 231.5,
  current: 4.6,
  power: 886.1,
},

];
// Write a function that takes a list of such entries and returns hourly aggregated average
// power for each inverter.
// Expected Output:
// {
//  "INV123": {
//  "2025-04-19T10:00:00Z": 951.3,
//  "2025-04-19T11:00:00Z": 1023.8
//  }
// }
const hourlyaggregated = (data) => {
 const result = {};
 data.forEach(element => {
    const inverterId = element.inverterId;
    const timestamp = new Date(element.timestamp);

    const hourtime = new Date(timestamp)
      hourtime.setMinutes(0,0,0)
      const hour = hourtime.toISOString();
      if(!result[inverterId]){
        result[inverterId] ={}
      }
      if(!result[inverterId][hour]){
        result[inverterId][hour] = 0;
      }
      result[inverterId][hour] += element.power;
 });
 return result
};
const output = hourlyaggregated(data)
console.log(JSON.stringify(output,null,2));

// Task one Compleated

// Question 2: Problem Solving – Implement Alert Feature
// You’re building an alert module for the RMS platform. Create a simple backend API and logic
// for this feature.
// Problem Statement:
// Generate an alert when:
// - Power drops below 10W for more than 5 minutes
// - Voltage goes above 270V
// Deliverable:
// - API to fetch current alerts for a given inverter
// - Logic to scan incoming data stream and trigger alert conditions (mock data or hardcoded
// simulation is fine)
// - Design considerations if the volume is 10,000 inverters


// Question 3: Database Design – RMS Data Storage
// Design the database schema (SQL or NoSQL) for storing the following:
// - Inverter details
// - Per-minute telemetry
// - Alerts
// - User (plant owner, installer) access control
// Deliverable:
// - ERD or table structure
// - Indexing and partitioning strategy for scale (100k inverters, 1-year data)
// - Justify choice of DB (e.g., TimescaleDB, MongoDB, PostgreSQL)