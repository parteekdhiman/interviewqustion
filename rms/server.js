require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.connect(process.env.MONGODB_URL,);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error:'));
db.once('open', () => console.log('MongoDB connected'));

const inverterSchema = new mongoose.Schema({
  inverterId: String,
  siteId: String,
  power: Number,
  voltage: Number,
  current: Number,
  timestamp: { type: Date, default: Date.now },
});
const Inverter = mongoose.model('Inverter', inverterSchema);

const virtualMeterSchema = new mongoose.Schema({
  siteId: String,
  totalPower: Number,
  timestamp: { type: Date, default: Date.now },
});
const VirtualMeter = mongoose.model('VirtualMeter', virtualMeterSchema);

app.post('/inverter', async (req, res) => {
  try {
    const { inverterId, siteId, power, voltage, current } = req.body;
    const entry = new Inverter({ inverterId, siteId, power, voltage, current });
    await entry.save();
    res.json({ message: 'Inverter data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save inverter data' });
  }
});

app.get('/virtual-meter/:siteId', async (req, res) => {
  try {
    const { siteId } = req.params;

    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const data = await Inverter.aggregate([
      { $match: { siteId, timestamp: { $gte: fiveMinsAgo } } },
      { $group: { _id: '$siteId', totalPower: { $sum: '$power' } } }
    ]);

    if (data.length === 0) {
      return res.status(404).json({ message: 'No recent data found' });
    }
    await VirtualMeter.create({
      siteId,
      totalPower: data[0].totalPower
    });

    res.json({
      siteId,
      totalPower: data[0].totalPower,
      timestamp: new Date()
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch virtual meter data' });
  }
});

//
app.get('/dashboard/:siteId', async (req, res) => {
  try {
    const { siteId } = req.params;

    const recent = await VirtualMeter.find({ siteId })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
