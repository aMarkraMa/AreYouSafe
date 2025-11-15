# Deployment Guide

This guide covers deploying the "Are You Safe" application to production.

## Architecture

- **Frontend**: React + Vite (Static files)
- **Backend**: FastAPI (Python)

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend on Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   - Go to your project settings
   - Add `VITE_API_URL` with your backend URL (e.g., `https://your-backend.railway.app`)

4. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

#### Backend on Railway

1. **Create Railway Account**: https://railway.app

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**:
   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variables:
     - `CORS_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

4. **Get Backend URL**:
   - Railway will provide a URL like `https://your-app.railway.app`
   - Update `VITE_API_URL` in Vercel with this URL

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify

1. **Create Netlify Account**: https://netlify.com

2. **Deploy from GitHub**:
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variable:
     - `VITE_API_URL`: Your backend URL

#### Backend on Render

1. **Create Render Account**: https://render.com

2. **Create Web Service**:
   - Connect GitHub repository
   - Settings:
     - Root Directory: `backend`
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     - `CORS_ORIGINS`: Your frontend URL

### Option 3: Docker Deployment (Self-hosted)

#### Using Docker Compose

1. **Build and Run**:
   ```bash
   docker-compose up -d --build
   ```

2. **Update Environment Variables**:
   - Edit `docker-compose.yml` with production URLs
   - Rebuild: `docker-compose up -d --build`

#### Using Individual Dockerfiles

**Frontend**:
```bash
docker build -f Dockerfile.frontend -t are-you-safe-frontend --build-arg VITE_API_URL=https://your-backend.com .
docker run -p 80:80 are-you-safe-frontend
```

**Backend**:
```bash
docker build -f Dockerfile.backend -t are-you-safe-backend ./backend
docker run -p 8000:8000 -e CORS_ORIGINS=https://your-frontend.com are-you-safe-backend
```

## CI/CD with GitHub Actions

The project includes GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Setup Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

**For Frontend Deployment:**
- `VERCEL_TOKEN`: Your Vercel token (optional)
- `VERCEL_ORG_ID`: Your Vercel organization ID (optional)
- `VERCEL_PROJECT_ID`: Your Vercel project ID (optional)
- `NETLIFY_AUTH_TOKEN`: Your Netlify token (optional)
- `NETLIFY_SITE_ID`: Your Netlify site ID (optional)

**For Backend Deployment:**
- `RAILWAY_TOKEN`: Your Railway token (optional)
- `RENDER_API_KEY`: Your Render API key (optional)
- `RENDER_SERVICE_ID`: Your Render service ID (optional)

**For API Configuration:**
- `VITE_API_URL`: Your production backend URL

### Manual Deployment

If you prefer manual deployment:

1. **Build Frontend**:
   ```bash
   npm run build
   ```

2. **Deploy Frontend**:
   - Upload `dist/` folder to your hosting service
   - Or use the hosting service's CLI

3. **Deploy Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend
```
CORS_ORIGINS=https://your-frontend-url.com
PORT=8000
```

## Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] Backend API is accessible
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] SSL/HTTPS is enabled
- [ ] Domain is configured (if using custom domain)
- [ ] Health checks are working
- [ ] Error monitoring is set up (optional)

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGINS` in backend includes your frontend URL
- Check that URLs match exactly (including https/http)

### Build Failures
- Check Node.js version (should be 20+)
- Check Python version (should be 3.11+)
- Verify all dependencies are in package.json/requirements.txt

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check backend logs for errors
- Ensure backend is running and accessible

## Monitoring

Consider setting up:
- **Error Tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Plausible
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Logs**: Railway/Render built-in logs, or external service

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Only allow your frontend domain
3. **HTTPS**: Always use HTTPS in production
4. **API Keys**: Store securely in environment variables
5. **Rate Limiting**: Consider adding rate limiting to backend

## Support

For issues or questions, check:
- GitHub Issues
- Documentation
- Service provider support (Vercel, Railway, etc.)

