# Frontend Deployment Guide

## Environment Variables Configuration

### For Deployed Frontend

When deploying your frontend to **Render**, **Netlify**, or **Vercel**, you **MUST** set the following environment variable:

```
VITE_API_URL=https://hallelujah-church-app.onrender.com/api
```

**Important:** Do NOT include a trailing slash after `/api`

---

## Deployment Options

### Option 1: Render Static Site

1. Go to https://render.com and click "New +" → "Static Site"
2. Connect your GitHub repository: `Joelmaloba2541/Hallelujah_app`
3. Configure:
   - **Name:** `hallelujah-church-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   
4. **Add Environment Variable:**
   - Click "Environment" tab
   - Add: `VITE_API_URL` = `https://hallelujah-church-app.onrender.com/api`

5. Click "Create Static Site"

---

### Option 2: Netlify

1. Go to https://netlify.com and click "Add new site" → "Import an existing project"
2. Connect your GitHub repository
3. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

4. **Add Environment Variable:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://hallelujah-church-app.onrender.com/api`

5. Click "Deploy site"

---

### Option 3: Vercel

1. Go to https://vercel.com and click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variable:**
   - In the deployment settings
   - Add: `VITE_API_URL` = `https://hallelujah-church-app.onrender.com/api`

5. Click "Deploy"

---

## Local Development

For local development, create a `.env` file in the `frontend` directory:

```bash
cd frontend
cp .env.example .env
```

The `.env` file should contain:
```
VITE_API_URL=http://localhost:8000/api
```

**Note:** The `.env` file is gitignored and won't be committed to the repository.

---

## Testing the Connection

After deployment, open your browser console and check:
1. No `ERR_CONNECTION_REFUSED` errors
2. API calls should go to `https://hallelujah-church-app.onrender.com/api`
3. Login/Signup should work properly

---

## Troubleshooting

### Issue: Still seeing localhost:8000 errors
**Solution:** Make sure you set the `VITE_API_URL` environment variable in your deployment platform and redeploy.

### Issue: CORS errors
**Solution:** The backend needs to allow your frontend domain. Update `CORS_ALLOWED_ORIGINS` in the backend settings.

### Issue: 404 on page refresh
**Solution:** Add a `_redirects` file (Netlify) or configure rewrites (Vercel/Render) to handle client-side routing.

For Netlify, create `frontend/public/_redirects`:
```
/*    /index.html   200
```

---

## Important Notes

- **Environment variables in Vite** must be prefixed with `VITE_` to be exposed to the client
- Changes to environment variables require a **redeploy** to take effect
- Never commit `.env` files with sensitive data to Git
- The backend URL should use `https://` in production, not `http://`
