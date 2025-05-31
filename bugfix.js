// Question 5: Individual Contributor Test – Bug Fixing & Enhancement
// Here’s a snippet from the current codebase (pseudo code):
// Javascript:
// function getEnergyToday(data) {
//  let total = 0;
//  for (let d of data) {
//  if (d.timestamp.includes("2025-04-19")) {
//  total += d.voltage * d.current;
//  }
//  }
//  return total;
// }
// Issues:
// 1. Improve logic accuracy (energy = power * time, not voltage * current directly)
// 2. Add support for different timezones
// 3. Optimize for performance (assume large dataset)
// Task:
// - Submit fixed function with explanation of changes
// - Optional: Add unit tests

function getEnergyToday(data) {
  let total = 0;
  const day = new Date().toISOString().slice(0, 10);
  for (let d of data) {
    const timest = d.timestamp.slice(0, 10);
    if (timest === day) {
      const power = d.power || d.voltage * d.current;
      const eng = power * (60 / 3600);
      total += eng;
    }
  }
  return total;
}


// bug i fix

// 1. It use voltage * current which is power not energy. Energy = power * Time

// 2 HardCore Date not work on next day
// 3 NO time Calcutation
// 4 No Time Zone Calulated
// 5 Not scalabel
