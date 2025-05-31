const alerts = {}; 
const data = {}; 

function ingestData(inverterId, power, voltege) {
  const now = Date.now();
  if (!data[inverterId]) data[inverterId] = [];
  data[inverterId].push({ power, voltege, timestamp: now });

  // Keep last 10 minutes data
  data[inverterId] = data[inverterId].filter(d => d.timestamp > now - 10 * 60 * 1000);

  alerts(inverterId);
}

function alerts(inverterId) {
  const data = data[inverterId];
  if (!data) return;

  const now = Date.now();
  const latest = data[data.length - 1];
  if (latest.voltege > 270) {
    triggerAlert(inverterId, "high", "voltege exceeded 270V");
  } else {
    resolveAlert(inverterId, "high");
  }
  const MinsAgo = now - 5 * 60 * 1000;
  const recent = data.filter(d => d.timestamp >= MinsAgo);
  const lowPower = recent.length && recent.every(d => d.power < 10);

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
