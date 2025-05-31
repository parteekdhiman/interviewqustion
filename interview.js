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
