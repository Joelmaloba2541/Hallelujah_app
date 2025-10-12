# Hallelujah Church App - Render Deployment Guide

## Prerequisites
- GitHub account
- Render account (free tier available at https://render.com)

## Deployment Steps

### 1. Push to GitHub
The code is ready to be pushed to: https://github.com/Joelmaloba2541/Hallelujah_app.git

### 2. Create Web Service on Render

1. Go to https://render.com and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository: `Joelmaloba2541/Hallelujah_app`
4. Configure the service:

**Basic Settings:**
- **Name:** `hallelujah-church-app`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** Leave blank
- **Runtime:** `Python 3`
- **Build Command:** `./build.sh`
- **Start Command:** `gunicorn backend.wsgi:application`

**Environment Variables:**
Add these in the "Environment" section:
```
SECRET_KEY=your-super-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
PYTHON_VERSION=3.11.6
```

### 3. Create PostgreSQL Database (Optional but Recommended)

1. In Render dashboard, click "New +" and select "PostgreSQL"
2. Configure:
   - **Name:** `hallelujah-church-db`
   - **Database:** `hallelujah_db`
   - **User:** `hallelujah_user`
   - **Region:** Same as your web service
   - **Plan:** Free

3. After creation, copy the "Internal Database URL"
4. Add to your web service environment variables:
   ```
   DATABASE_URL=<paste-internal-database-url-here>
   ```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies from `requirements.txt`
   - Run `build.sh` (migrations, collectstatic, init data)
   - Start the application with gunicorn

### 5. Access Your App

- **Backend API:** `https://your-app-name.onrender.com/api/`
- **Admin Panel:** `https://your-app-name.onrender.com/admin/`
- **Admin Credentials:**
  - Username: `admin`
  - Password: `admin`
  - Email: `admin@gmail.com`

## Frontend Deployment

The frontend (React app) should be deployed separately:

### Option 1: Render Static Site
1. Click "New +" → "Static Site"
2. Connect the same repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

### Option 2: Netlify/Vercel
1. Connect your GitHub repository
2. Set build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-app.onrender.com
   ```

## Important Notes

### Free Tier Limitations
- Apps spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one app running 24/7)

### Database Persistence
- SQLite database will be reset on each deploy
- Use PostgreSQL for production (recommended)
- Free PostgreSQL tier: 90 days, then requires upgrade

### Static Files
- Handled by WhiteNoise
- Automatically compressed and cached
- No CDN needed for small apps

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify Python version in `runtime.txt`

### App Won't Start
- Check application logs
- Verify `ALLOWED_HOSTS` includes your Render domain
- Ensure `SECRET_KEY` is set

### Database Issues
- Verify `DATABASE_URL` is correct
- Check PostgreSQL database is running
- Review migration logs

### CORS Errors
- Update `CORS_ALLOW_ALL_ORIGINS` in settings
- Or set specific origins in `CORS_ALLOWED_ORIGINS`

## Monitoring

- **Logs:** Available in Render dashboard
- **Metrics:** CPU, Memory, Request count
- **Alerts:** Configure in Render settings

## Updating the App

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. Render automatically redeploys on push to main branch

## Security Recommendations

1. **Change SECRET_KEY:** Generate a new one for production
2. **Set DEBUG=False:** Never run with DEBUG=True in production
3. **Update Admin Password:** Change default admin credentials
4. **Configure ALLOWED_HOSTS:** Set to your specific domain
5. **Enable HTTPS:** Render provides free SSL certificates

## Cost Optimization

- Use free PostgreSQL for 90 days
- After 90 days, consider:
  - Upgrading to paid PostgreSQL ($7/month)
  - Using external database (e.g., ElephantSQL, Supabase)
  - Switching to paid Render plan for better performance

---

**Deployment Date:** October 12, 2025
**Status:** Ready for deployment ✅
