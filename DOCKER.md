# Docker Setup for Maritime Incident Dashboard

This document provides instructions for running the Maritime Incident Dashboard using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. Clone the repository and navigate to the project directory:
```bash
git clone <repository-url>
cd maritime-incident-dashboard
```

2. Build and start the application using Docker Compose:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:53215

## Docker Compose Services

### Backend Service
- **Container Name**: `maritime-backend`
- **Port**: 53215
- **Technology**: Node.js with Express
- **Health Check**: Monitors `/api/incidents/stats` endpoint

### Frontend Service
- **Container Name**: `maritime-frontend`
- **Port**: 80
- **Technology**: React with Nginx
- **Features**: 
  - Production-optimized build
  - API proxy to backend
  - Gzip compression
  - Security headers

## Available Commands

### Start the application
```bash
# Start in foreground
docker-compose up

# Start in background (detached mode)
docker-compose up -d

# Build and start
docker-compose up --build
```

### Stop the application
```bash
# Stop running containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Rebuild services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache
```

## Development Mode

For development with hot reloading, you can override the docker-compose configuration:

1. Create a `docker-compose.override.yml` file:
```yaml
version: '3.8'

services:
  backend:
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev

  frontend:
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    command: npm start
    ports:
      - "3000:3000"
```

2. Start in development mode:
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

## Environment Variables

### Backend
- `NODE_ENV`: Set to 'production' or 'development'
- `PORT`: Backend server port (default: 53215)

### Frontend
- Built-time environment variables can be added to the Dockerfile

## Networking

The services communicate through a custom Docker network called `maritime-network`. The frontend nginx configuration proxies API requests to the backend service.

## Health Checks

Both services include health checks:
- **Backend**: Checks the `/api/incidents/stats` endpoint
- **Frontend**: Checks the nginx server availability

## Troubleshooting

### Port Conflicts
If you encounter port conflicts, modify the ports in `docker-compose.yaml`:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change from 80:80 to 8080:80
  backend:
    ports:
      - "3001:53215"  # Change from 53215:53215 to 3001:53215
```

### Build Issues
1. Clear Docker cache:
```bash
docker system prune -a
```

2. Rebuild without cache:
```bash
docker-compose build --no-cache
```

### Container Logs
Check container logs for debugging:
```bash
docker-compose logs backend
docker-compose logs frontend
```

## Production Deployment

For production deployment:

1. Set appropriate environment variables
2. Use a reverse proxy (nginx/Apache) in front of the containers
3. Configure SSL/TLS certificates
4. Set up monitoring and logging
5. Configure backup strategies for any persistent data

## Security Considerations

- The nginx configuration includes security headers
- API requests are proxied through nginx
- No sensitive data is exposed in the Docker images
- Use environment variables for sensitive configuration