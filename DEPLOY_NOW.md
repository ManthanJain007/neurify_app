# 🚀 Deploy Neurify in 5 Minutes

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `neurify`
3. Description: `AI Writing Assistant with 165+ Features`
4. Keep it Public (or Private)
5. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
cd E:\projects\neurowrite-platform

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/neurify.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend on Railway

1. Visit: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select `neurify` repository
4. Click "Add variables" and add:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyCW6uYbz9r8u8AJJixVtZYzBQsS-rAbcFU`
5. In Settings → Set:
   - **Root Directory**: `ai-engine`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Click "Deploy"
7. Copy your Railway URL (e.g., `neurify-api.up.railway.app`)

## Step 4: Deploy Frontend on Vercel

1. Visit: https://vercel.com/new
2. Click "Import Git Repository"
3. Select `neurify` repository  
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `neurowrite-app`
5. Click "Deploy"
6. Your app is live!

## Step 5: Connect Frontend to Backend

1. In Vercel, go to your project → Settings → Environment Variables
2. Add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url.railway.app` (from Step 3)
3. Redeploy from Vercel dashboard

## ✅ Done!

Your Neurify app is now live at:
- **App**: `https://your-app.vercel.app`
- **API**: `https://your-api.railway.app/docs`

Try it out and share with the world! 🎉

---

## Alternative: Railway for Backend

If Railway doesn't work, try Render:

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub → Select `neurify`
4. Settings:
   - **Root Directory**: `ai-engine`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Environment → Add `GEMINI_API_KEY`
6. Deploy!
