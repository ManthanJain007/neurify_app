# 🚀 Deploy Neurify Backend to Render

## Step-by-Step Guide

### 1. Sign Up / Log In to Render
Go to: https://render.com
- Sign in with GitHub (recommended)
- Or sign up with email

### 2. Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### 3. Connect GitHub Repository

1. Click **"Connect a repository"**
2. If first time: Click **"Configure account"** → Select GitHub account
3. Find and select: **ManthanJain007/Neurify-App**
4. Click **"Connect"**

### 4. Configure Service

Fill in these settings:

**Basic Settings:**
- **Name**: `neurify-api` (or any name you like)
- **Region**: Oregon (US West) - or closest to you
- **Branch**: `main`
- **Root Directory**: `ai-engine` ⚠️ IMPORTANT!
- **Runtime**: Python 3

**Build & Deploy:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Instance Type:**
- Select: **Free** (0.1 CPU, 512 MB RAM)

### 5. Add Environment Variable

Scroll down to **Environment Variables** section:

Click **"Add Environment Variable"**
- **Key**: `GEMINI_API_KEY`
- **Value**: `AIzaSyCW6uYbz9r8u8AJJixVtZYzBQsS-rAbcFU`

### 6. Deploy!

1. Click **"Create Web Service"** button at bottom
2. Wait 2-5 minutes for deployment
3. You'll see build logs in real-time

### 7. Get Your Backend URL

Once deployed:
- Your API will be live at: `https://neurify-api.onrender.com`
- API docs available at: `https://neurify-api.onrender.com/docs`

Copy this URL - you'll need it for the frontend!

---

## ⚙️ After Backend is Deployed

### Deploy Frontend to Vercel

1. Go to: https://vercel.com/new
2. Import `ManthanJain007/Neurify-App`
3. Configure:
   - **Root Directory**: `neurowrite-app`
   - **Framework**: Next.js (auto-detected)
4. Click **Deploy**
5. After first deploy, go to **Settings** → **Environment Variables**
6. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://neurify-api.onrender.com` (your Render URL)
7. **Deployments** → **Redeploy**

---

## ✅ Your App is Live!

- **Frontend**: `https://neurify-app.vercel.app`
- **Backend**: `https://neurify-api.onrender.com`
- **API Docs**: `https://neurify-api.onrender.com/docs`

All 165 AI features are now accessible worldwide! 🎉

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `requirements.txt` exists in `ai-engine/`
- Make sure Root Directory is set to `ai-engine`

### Service Not Starting
- Check if `GEMINI_API_KEY` is set correctly
- Verify Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Check runtime logs

### API Key Issues
- Verify API key in Render environment variables
- Check Google AI Studio for API key status
- Ensure Generative Language API is enabled

---

## 📊 Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month
- ✅ 512 MB RAM
- ✅ 0.1 CPU
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30s)
- ⚠️ Suspended after 90 days if inactive

**Tip:** Keep it active by pinging every 10 minutes or upgrade to paid tier ($7/month) for always-on.

---

## 🎯 Keep Service Active (Optional)

Add this to your frontend to keep backend awake:

```typescript
// Ping backend every 10 minutes
setInterval(() => {
  fetch('https://neurify-api.onrender.com/health');
}, 600000);
```

---

Need help? Check Render docs: https://render.com/docs
