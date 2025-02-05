# Dockerized Task Manager Application

This repository contains a containerized full-stack Task Manager application built with Next.js (frontend), Node.js (backend), and PostgreSQL (database). This guide will help you set up and run the application using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Docker
- Docker Compose
- Git (for cloning the repository)

## Project Structure

```
task-manager/
├── frontend/             # Next.js frontend application
│   ├── Dockerfile
│   └── ...
├── backend/             # Node.js backend API
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml   # Docker Compose configuration
```

## Environment Variables

### Frontend Environment Variables
- `NEXT_PUBLIC_API_URL`: URL for the backend API (default: http://backend:4000/api)

### Backend Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Application port (default: 4000)
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Application environment (development/production)

### Database Environment Variables
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Start the application using Docker Compose:
```bash
docker-compose up -d
```

This command will:
- Build the frontend and backend images
- Create and start all containers
- Set up the PostgreSQL database
- Configure networking between services

3. The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: localhost:5433

## Services

### Frontend (Next.js)
- Runs on port 3000
- Built using Node.js 18 Alpine image
- Automatically builds and starts the Next.js application

### Backend (Node.js)
- Runs on port 4000
- Built using Node.js 18 Alpine image
- Connects to PostgreSQL database
- Handles API requests and business logic

### Database (PostgreSQL)
- Runs on port 5433
- Persistent data storage using Docker volumes
- Automatically creates database and user on first run

## Development

To make changes to the application:

1. Stop the containers:
```bash
docker-compose down
```

2. Make your changes to the code

3. Rebuild and start the containers:
```bash
docker-compose up --build -d
```

## Useful Commands

```bash
# View running containers
docker-compose ps

# View container logs
docker-compose logs

# View logs for a specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v

# Rebuild specific service
docker-compose up -d --build frontend
```

## Data Persistence

PostgreSQL data is persisted using a named volume (`postgres_data`). This ensures your data survives container restarts and removals.

## Security Notes

- The JWT secret and database credentials in the docker-compose.yml are for development purposes only
- In production, use environment files or secure secret management
- Change default database credentials before deploying to production
- Consider using a reverse proxy (like Nginx) in production

## Troubleshooting

1. If containers fail to start, check logs:
```bash
docker-compose logs
```

2. If database connection fails:
- Ensure PostgreSQL container is running
- Verify database credentials match in docker-compose.yml
- Check if port 5433 is available on your system

3. If changes aren't reflecting:
- Rebuild the containers using `docker-compose up --build`
- Clear Docker cache if necessary

## Production Deployment

For production deployment:

1. Modify environment variables for production use
2. Use proper secret management
3. Enable and configure security features
4. Set `NODE_ENV=production`

Done by Tatenda Mapuranga
