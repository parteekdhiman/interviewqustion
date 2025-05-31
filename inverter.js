const alerts = {};  
const dataStore = {}; 

function ingestData(inverterId, power, voltage) {
  const now = Date.now();
  if (!dataStore[inverterId]) dataStore[inverterId] = [];
  dataStore[inverterId].push({ power, voltage, timestamp: now });

  dataStore[inverterId] = dataStore[inverterId].filter(d => d.timestamp > now - 10 * 60 * 1000);

  checkAlerts(inverterId);
}

function checkAlerts(inverterId) {
  const data = dataStore[inverterId];
  if (!data) return;

  const now = Date.now();
  const latest = data[data.length - 1];

  if (latest.voltage > 270) {
    triggerAlert(inverterId, "high", "Voltage exceeded 270V");
  } else {
    resolveAlert(inverterId, "high");
  }

  const fiveMinsAgo = now - 5 * 60 * 1000;
  const recentData = data.filter(d => d.timestamp >= fiveMinsAgo);
  const lowPower = recentData.length && recentData.every(d => d.power < 10);

  if (lowPower) {
    triggerAlert(inverterId, "low", "Power below 10W for over 5 minutes");
  } else {
    resolveAlert(inverterId, "low");
  }
}

function triggerAlert(inverterId, type, message) {
  if (!alerts[inverterId]) alerts[inverterId] = [];
  if (!alerts[inverterId].some(a => a.type === type)) {
    alerts[inverterId].push({ type, message, timestamp: new Date() });
    console.log(`Alert triggered for ${inverterId}: ${message}`);
  }
}

function resolveAlert(inverterId, type) {
  if (!alerts[inverterId]) return;
  alerts[inverterId] = alerts[inverterId].filter(a => a.type !== type);
}

function getAlerts(inverterId) {
  return alerts[inverterId] || [];
}

ingestData("INV1", 5, 275); 
console.log(getAlerts("INV1"));
