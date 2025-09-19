# Docker Deployment Guide 🐳

This guide shows how to containerize and deploy the Fast Track Academy Virtual Classroom using Docker.

## Docker Setup

### Prerequisites
- Docker installed on your system
- Docker Compose (usually included with Docker Desktop)

### 1. Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
```

### 2. Create Dockerfile for Frontend

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3. Create nginx.conf for Frontend

Create `frontend/nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Enable gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

### 4. Create Docker Compose

Create `docker-compose.yml` in the root directory:
```yaml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  default:
    name: virtual-classroom
```

### 5. Environment Configuration

Create `.env` files for production:

**backend/.env**
```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=http://localhost
```

**frontend/.env**
```
VITE_BACKEND_URL=http://localhost:3001
```

## Deployment Commands

### Development with Docker
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
```bash
# Build for production
docker-compose -f docker-compose.yml up --build -d

# Update images
docker-compose pull
docker-compose up -d

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

## Cloud Deployment

### AWS ECS
1. Build and push images to ECR
2. Create ECS task definitions
3. Deploy using ECS service

### Google Cloud Run
1. Build images with Cloud Build
2. Deploy to Cloud Run
3. Configure custom domains

### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure build settings
3. Deploy automatically on push

## Monitoring and Logs

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f backend
```

### Health Checks
```bash
# Check backend health
curl http://localhost:3001/health

# Check frontend
curl http://localhost
```

## Scaling Considerations

### Load Balancing
- Use nginx or HAProxy for load balancing
- Configure sticky sessions for Socket.io

### Database
- Add PostgreSQL or MongoDB service
- Use environment variables for connection strings

### Redis for Session Storage
```yaml
redis:
  image: redis:alpine
  restart: unless-stopped
  volumes:
    - redis_data:/data

volumes:
  redis_data:
```

## Security Best Practices

1. **Use non-root users in containers**
2. **Scan images for vulnerabilities**
3. **Use secrets management for sensitive data**
4. **Enable HTTPS in production**
5. **Configure proper CORS origins**
6. **Use environment variables for configuration**

## Troubleshooting

### Common Issues
- **Port conflicts**: Ensure ports 80 and 3001 are available
- **Build failures**: Check Dockerfile syntax and dependencies
- **Network issues**: Verify service communication
- **Memory limits**: Increase Docker memory allocation if needed

### Debug Commands
```bash
# Enter container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Check container status
docker-compose ps

# View container resource usage
docker stats
```