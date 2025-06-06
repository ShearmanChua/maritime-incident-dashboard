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

// Chat assistant endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const userMessage = message.toLowerCase().trim();
    let response = '';

    // Simple rule-based responses for common queries
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        response = "Hello! I'm here to help you navigate the Maritime Incident Dashboard. You can ask me about incidents, statistics, or how to use the dashboard features.";
    } else if (userMessage.includes('what') && userMessage.includes('dashboard')) {
        response = "This is a Maritime Incident Dashboard that helps you track and analyze maritime incidents. You can view incident statistics, browse individual incident reports, and analyze trends over time.";
    } else if (userMessage.includes('how') && (userMessage.includes('use') || userMessage.includes('navigate'))) {
        response = "You can navigate using the menu at the top: 'Dashboard' shows statistics and charts, while 'Incident Reports' displays individual incident cards. Use the charts to analyze trends by vessel type, incident type, and severity.";
    } else if (userMessage.includes('incident') && userMessage.includes('type')) {
        response = "The dashboard tracks several incident types: Collision, Grounding, Fire, Equipment Failure, and Weather Related incidents. You can see the distribution in the dashboard charts.";
    } else if (userMessage.includes('vessel') && userMessage.includes('type')) {
        response = "We track incidents for various vessel types: Cargo Ships, Tankers, Fishing Vessels, Passenger Ships, and Container Ships. The dashboard shows statistics for each type.";
    } else if (userMessage.includes('severity')) {
        response = "Incidents are classified by severity levels: Low, Medium, High, and Critical. You can view the severity distribution in the dashboard statistics.";
    } else if (userMessage.includes('data') || userMessage.includes('information')) {
        response = "The dashboard contains data on maritime incidents including date, vessel type, incident type, and severity. All data is displayed through interactive charts and detailed incident cards.";
    } else if (userMessage.includes('help') || userMessage.includes('support')) {
        response = "I can help you with: understanding the dashboard features, explaining incident types and severity levels, navigating between pages, and interpreting the statistics and charts.";
    } else if (userMessage.includes('chart') || userMessage.includes('graph')) {
        response = "The dashboard includes several charts: incident timeline, vessel type distribution, incident type breakdown, and severity analysis. These help you visualize trends and patterns in maritime incidents.";
    } else if (userMessage.includes('filter') || userMessage.includes('search')) {
        response = "Currently, you can browse all incidents in the 'Incident Reports' section. The dashboard shows overall statistics and trends across all recorded incidents.";
    } else if (userMessage.includes('thank')) {
        response = "You're welcome! Feel free to ask if you need any more help with the Maritime Incident Dashboard.";
    } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
        response = "Goodbye! Feel free to return anytime if you need help with the dashboard.";
    } else {
        response = "I can help you with questions about the Maritime Incident Dashboard, including how to navigate the interface, understand the data, and interpret the charts. What would you like to know?";
    }

    res.json({ response });
});

const PORT = process.env.PORT || 57077;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});