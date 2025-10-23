# 🚀 NeuroWrite Platform - Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start (Docker)](#quick-start-docker)
3. [Manual Setup](#manual-setup)
4. [Production Deployment](#production-deployment)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** 20+ and npm 10+
- **Python** 3.11+
- **Docker** 24+ and Docker Compose 2+
- **PostgreSQL** 16
- **Redis** 7
- **Git**

### API Keys Required
- **Google Gemini API Key** (get from https://makersuite.google.com/app/apikey)
- AWS S3 credentials (optional, for file storage)
- Infura API key (optional, for Web3 features)

---

## Quick Start (Docker)

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/your-org/neurowrite-platform.git
cd neurowrite-platform

# Copy environment variables
cp .env.example .env

# Edit .env file with your API keys
nano .env  # or use your preferred editor
```

### 2. Configure Environment

Edit `.env` file and set:
```env
# REQUIRED: Add your Gemini API Key
GEMINI_API_KEY=AIzaSyB6xR1anuTx-HTPv-EoFBjPPTyVdtf3sYQ

# Change default passwords (IMPORTANT for production)
POSTGRES_PASSWORD=your_secure_password
REDIS_PASSWORD=your_secure_redis_password
JWT_SECRET=your_ultra_secure_jwt_secret
```

### 3. Start All Services

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 4. Access Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **AI Engine**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3002 (admin/admin)

### 5. Initialize Database

```bash
# Run database migrations
docker-compose exec backend npm run migrate

# Seed initial data
docker-compose exec backend npm run seed
```

---

## Manual Setup (Development)

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install

# Setup Prisma
npx prisma generate
npx prisma migrate dev
```

#### Frontend
```bash
cd frontend
npm install
```

#### AI Engine
```bash
cd ai-engine
pip install -r requirements.txt

# Download spaCy models
python -m spacy download en_core_web_sm
```

### 2. Start Databases

```bash
# PostgreSQL
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_USER=neurowrite \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=neurowrite \
  postgres:16-alpine

# Redis
docker run -d \
  -p 6379:6379 \
  redis:7-alpine

# Qdrant
docker run -d \
  -p 6333:6333 \
  -p 6334:6334 \
  qdrant/qdrant
```

### 3. Start Services

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: AI Engine
cd ai-engine
uvicorn main:app --reload --port 8001

# Terminal 3: Frontend
cd frontend
npm run dev
```

---

## Production Deployment

### Option 1: Docker Compose (Recommended for small-medium scale)

```bash
# 1. Set production environment
export NODE_ENV=production

# 2. Build production images
docker-compose -f docker-compose.prod.yml build

# 3. Start services
docker-compose -f docker-compose.prod.yml up -d

# 4. Setup SSL with Let's Encrypt
docker-compose exec nginx certbot --nginx -d yourdomain.com
```

### Option 2: Kubernetes (Recommended for large scale)

```bash
# 1. Create namespace
kubectl create namespace neurowrite

# 2. Create secrets
kubectl create secret generic neurowrite-secrets \
  --from-literal=gemini-api-key=$GEMINI_API_KEY \
  --from-literal=jwt-secret=$JWT_SECRET \
  --from-literal=postgres-password=$POSTGRES_PASSWORD \
  -n neurowrite

# 3. Apply configurations
kubectl apply -f kubernetes/ -n neurowrite

# 4. Check deployment
kubectl get pods -n neurowrite
kubectl get services -n neurowrite
kubectl get ingress -n neurowrite

# 5. View logs
kubectl logs -f deployment/neurowrite-backend -n neurowrite
```

### Option 3: Cloud Platforms

#### AWS (ECS/EKS)
```bash
# Build and push images
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  YOUR_ECR_REGISTRY

docker-compose build
docker tag neurowrite-frontend YOUR_ECR_REGISTRY/neurowrite-frontend
docker push YOUR_ECR_REGISTRY/neurowrite-frontend
# Repeat for backend and ai-engine

# Deploy with ECS CLI
ecs-cli compose --project-name neurowrite service up
```

#### Google Cloud (GKE)
```bash
# Build with Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Deploy to GKE
gcloud container clusters create neurowrite-cluster
kubectl apply -f kubernetes/
```

#### Azure (AKS)
```bash
# Create AKS cluster
az aks create --resource-group neurowrite-rg --name neurowrite-cluster

# Get credentials
az aks get-credentials --resource-group neurowrite-rg --name neurowrite-cluster

# Deploy
kubectl apply -f kubernetes/
```

---

## Configuration

### Frontend Configuration (`frontend/.env`)

```env
VITE_API_URL=https://api.neurowrite.ai
VITE_AI_ENGINE_URL=https://ai.neurowrite.ai
VITE_WS_URL=wss://api.neurowrite.ai
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Backend Configuration (`backend/.env`)

```env
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://user:pass@host:5432/neurowrite
REDIS_URL=redis://host:6379
JWT_SECRET=ultra_secure_secret_key
AI_ENGINE_URL=http://ai-engine:8001
```

### AI Engine Configuration (`ai-engine/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key
REDIS_URL=redis://host:6379
POSTGRES_URL=postgresql://user:pass@host:5432/neurowrite
```

### Nginx Configuration

```nginx
# nginx/nginx.conf
upstream frontend {
    server frontend:3000;
}

upstream backend {
    server backend:8000;
}

upstream ai-engine {
    server ai-engine:8001;
}

server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket
    location /socket.io/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # AI Engine
    location /ai/ {
        proxy_pass http://ai-engine;
        proxy_set_header Host $host;
    }
}
```

---

## Monitoring & Health Checks

### Health Check Endpoints

```bash
# Backend
curl http://localhost:8000/health

# AI Engine
curl http://localhost:8001/health

# Frontend (check if serving)
curl http://localhost:3000
```

### Monitoring with Prometheus & Grafana

1. **Access Prometheus**: http://localhost:9090
2. **Access Grafana**: http://localhost:3002
3. **Import Dashboards**: 
   - Node.js Dashboard ID: 11159
   - PostgreSQL Dashboard ID: 9628
   - Redis Dashboard ID: 11835

### Logging

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f ai-engine

# View last 100 lines
docker-compose logs --tail=100 backend
```

---

## Performance Optimization

### Database Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_analytics_timestamp ON analytics(timestamp DESC);
```

### Redis Caching

```javascript
// Cache AI responses for 1 hour
await redis.setex(`ai:response:${hash}`, 3600, response);
```

### CDN Setup

Use Cloudflare, AWS CloudFront, or similar:
- Cache static assets (JS, CSS, images)
- Enable HTTP/2 and Brotli compression
- Set appropriate cache headers

---

## Scaling

### Horizontal Scaling

```bash
# Scale backend instances
docker-compose up -d --scale backend=3

# With Kubernetes
kubectl scale deployment neurowrite-backend --replicas=5
```

### Load Balancing

Configure nginx upstream:
```nginx
upstream backend {
    least_conn;
    server backend-1:8000;
    server backend-2:8000;
    server backend-3:8000;
}
```

### Database Read Replicas

```yaml
# Add read replica in docker-compose.yml
postgres-replica:
  image: postgres:16-alpine
  environment:
    POSTGRES_REPLICATION_MODE: slave
    POSTGRES_MASTER_HOST: postgres
```

---

## Backup & Recovery

### Database Backup

```bash
# Automated daily backups
docker-compose exec postgres pg_dump -U neurowrite neurowrite > backup_$(date +%Y%m%d).sql

# Restore from backup
cat backup_20240101.sql | docker-compose exec -T postgres psql -U neurowrite neurowrite
```

### Volume Backup

```bash
# Backup all volumes
docker run --rm \
  -v neurowrite_postgres_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/postgres_backup.tar.gz /data
```

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Implement API authentication
- [ ] Regular security updates
- [ ] Enable audit logging
- [ ] Backup encryption keys
- [ ] Use secrets management (Vault, AWS Secrets Manager)

---

## Troubleshooting

### Issue: Can't connect to database

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U neurowrite -d neurowrite
```

### Issue: AI Engine not responding

```bash
# Check AI Engine status
docker-compose ps ai-engine

# View logs
docker-compose logs ai-engine

# Verify Gemini API key
docker-compose exec ai-engine python -c "import os; print(os.getenv('GEMINI_API_KEY'))"
```

### Issue: Frontend build fails

```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules dist
npm install
npm run build
```

### Issue: WebSocket connection fails

```bash
# Check backend logs
docker-compose logs backend | grep socket

# Verify nginx WebSocket configuration
docker-compose exec nginx nginx -t
```

### Issue: High memory usage

```bash
# Check resource usage
docker stats

# Limit container resources
docker-compose up -d --scale backend=2 \
  --memory="1g" --cpus="2"
```

---

## Support

For issues and questions:
- **Documentation**: https://docs.neurowrite.ai
- **GitHub Issues**: https://github.com/your-org/neurowrite-platform/issues
- **Discord**: https://discord.gg/neurowrite
- **Email**: support@neurowrite.ai

---

## License

MIT License - See LICENSE file for details
