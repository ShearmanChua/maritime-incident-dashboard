# Maritime Incident Dashboard

A real-time dashboard for monitoring maritime incidents, built with React (frontend) and Node.js (backend). The dashboard displays incident statistics through interactive charts, including vessel types, incident types, severity levels, and a timeline view.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Option 1: Using Docker (Recommended)](#option-1-using-docker-recommended)
  - [Option 2: Manual Setup](#option-2-manual-setup)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Data Structure](#data-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Incident Distribution Charts:**
  - Vessel Type Distribution (Pie Chart)
  - Incident Type Distribution (Pie Chart)
  - Severity Level Distribution (Pie Chart)
- **Timeline Analysis:**
  - Interactive line chart showing incident frequency
  - Adjustable time granularity (hour/day/month)
- **Interactive Visualizations:**
  - Hover tooltips with detailed information
  - Responsive design for different screen sizes

## Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Project Structure

```
maritime_incident_dashboard/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maritime_incident_dashboard
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

Note: The project uses a .gitignore file to exclude the following:
- Node modules and dependencies
- Build and distribution files
- Environment files (.env)
- System and IDE-specific files
- Log files and runtime data

Make sure to create your own .env files if needed, as they are not included in the repository.

## Running the Application

### Option 1: Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed on your system.

2. Build and start the application using Docker Compose:
```bash
docker-compose up --build
```

3. The application will be available at:
   - Frontend: http://localhost:56940
   - Backend API: http://localhost:53215

4. To stop the application:
```bash
docker-compose down
```

5. To run in detached mode (background):
```bash
docker-compose up -d
```

### Option 2: Manual Setup

1. Start the backend server:
```bash
cd backend
PORT=53215 npm start
```
The backend server will start on port 53215.

2. In a new terminal, start the frontend development server:
```bash
cd frontend
PORT=56940 npm start
```
The frontend application will start on port 56940.

3. Open your web browser and navigate to:
```
http://localhost:56940
```

## API Endpoints

The backend server provides the following API endpoints:

- `GET /api/incidents` - Returns all incidents
- `GET /api/incidents/stats` - Returns incident statistics
- `GET /api/incidents/timeline?granularity=<hour|day|month>` - Returns timeline data with specified granularity

## Technologies Used

Frontend:
- React
- Recharts (for charts)
- Axios (for API calls)

Backend:
- Node.js
- Express
- CORS
- Morgan (for logging)

Containerization:
- Docker
- Docker Compose

## Development

- The frontend code is in `frontend/src/App.js`
- The backend code is in `backend/server.js`
- Styling is handled in `frontend/src/App.css`

## Data Structure

The application uses sample data generated on the backend with the following structure:

```javascript
{
  date: DateTime,
  vessel_type: String,    // ['Cargo Ship', 'Tanker', 'Fishing Vessel', 'Passenger Ship', 'Container Ship']
  incident_type: String,  // ['Collision', 'Grounding', 'Fire', 'Equipment Failure', 'Weather Related']
  severity: String        // ['Low', 'Medium', 'High', 'Critical']
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.