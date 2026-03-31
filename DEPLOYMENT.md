# Unit Converter Deployment Guide

## Backend (Spring Boot)
1. **Railway** (Recommended):
   - Connect your GitHub repo
   - Railway auto-detects Java/Spring Boot
   - Uses the `railway.json` config
   - Free tier available

2. **Render**:
   - Connect GitHub repo
   - Use `render.yaml` config
   - Free tier with 750 hours/month

3. **Heroku**:
   - Install Heroku CLI
   - `heroku create your-app-name`
   - `git push heroku main`

## Frontend Deployment
1. **Netlify** (Recommended for static frontend):
   - Connect GitHub repo
   - Set build command: (none needed for static)
   - Publish directory: `.`
   - Update API_BASE in app.js to your backend URL

2. **Vercel**:
   - Similar to Netlify
   - Great for static sites

## Important: Update Frontend API URL
After deploying backend, update `API_BASE` in `app.js`:
```javascript
const API_BASE = 'https://your-backend-url.com';
```

## CORS Configuration (Spring Boot)
Add to your Spring Boot application.properties:
```
spring.web.cors.allowed-origins=https://your-frontend-domain.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

## Environment Variables
Set these in your hosting platform:
- `PORT=8080` (Railway/Render set this automatically)
- Database URL if using database
- Any API keys needed