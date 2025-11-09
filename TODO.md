# Hosting Preparation Tasks

## 1. Update Server Package.json ✅
- Add "start" script to run server.js

## 2. Update Server.js for Production ✅
- Use process.env.PORT instead of hardcoded 5000
- Add production-ready configuration

## 3. Update Client App.jsx for Production API ✅
- Replace localhost:5000 with environment variable
- Add fallback for development

## 4. Update Client Package.json ✅
- Add "build" script for production build

## 5. Test Locally ✅
- Run backend on different port
- Test frontend with updated API URL

## 6. Deploy Backend to Heroku ✅
- Create Heroku app
- Deploy server code
- Get production URL

## 7. Deploy Frontend to Vercel ✅
- Build client for production
- Deploy to Vercel with backend URL
- Configure environment variables
