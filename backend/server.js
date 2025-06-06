const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Sample data
const incidents = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    vessel_type: ['Cargo Ship', 'Tanker', 'Fishing Vessel', 'Passenger Ship', 'Container Ship'][Math.floor(Math.random() * 5)],
    incident_type: ['Collision', 'Grounding', 'Fire', 'Equipment Failure', 'Weather Related'][Math.floor(Math.random() * 5)],
    severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)]
}));

// Routes
app.get('/api/incidents', (req, res) => {
    res.json(incidents);
});

app.get('/api/incidents/stats', (req, res) => {
    const vesselTypeCounts = {};
    const incidentTypeCounts = {};
    const severityCounts = {};

    incidents.forEach(incident => {
        vesselTypeCounts[incident.vessel_type] = (vesselTypeCounts[incident.vessel_type] || 0) + 1;
        incidentTypeCounts[incident.incident_type] = (incidentTypeCounts[incident.incident_type] || 0) + 1;
        severityCounts[incident.severity] = (severityCounts[incident.severity] || 0) + 1;
    });

    res.json({
        vesselTypeCounts,
        incidentTypeCounts,
        severityCounts
    });
});

app.get('/api/incidents/timeline', (req, res) => {
    const { granularity = 'day' } = req.query;
    
    const timelineCounts = {};
    incidents.forEach(incident => {
        let timeKey;
        const date = new Date(incident.date);
        
        switch(granularity) {
            case 'hour':
                timeKey = `${date.toISOString().slice(0, 13)}:00`;
                break;
            case 'month':
                timeKey = date.toISOString().slice(0, 7);
                break;
            case 'day':
            default:
                timeKey = date.toISOString().slice(0, 10);
        }
        
        timelineCounts[timeKey] = (timelineCounts[timeKey] || 0) + 1;
    });

    const timeline = Object.entries(timelineCounts)
        .map(([time, count]) => ({ time, count }))
        .sort((a, b) => a.time.localeCompare(b.time));

    res.json(timeline);
});

const PORT = process.env.PORT || 53215;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});