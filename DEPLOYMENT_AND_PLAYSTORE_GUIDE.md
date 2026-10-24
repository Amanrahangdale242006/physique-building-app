# 🚀 AuraSculpt AI — Live Deployment & Google Play Store Publishing Guide

This application is **100% production-ready** for cloud deployment and Google Play Store distribution. You do **NOT** need to run it on `localhost`.

---

## 🌐 PART 1: Deploy Live Online in 60 Seconds (Free Public HTTPS)

Google Play Store and mobile devices require a **live HTTPS URL**. Here are the fastest free methods:

### Option A: Netlify Drop (Instant — No Terminal Required)
1. Open [**app.netlify.com/drop**](https://app.netlify.com/drop) in your web browser.
2. Drag and drop this folder (`c:\Users\Abhishek\Desktop\new project'`) onto the Netlify drop zone.
3. Your app is deployed **instantly** with a free, permanent public URL (e.g. `https://aurasculpt-ai.netlify.app`).

### Option B: GitHub Pages (Free Permanent Hosting)
The local Git repository is already initialized and committed! To push to GitHub:
1. Create a new repository on [GitHub.com](https://github.com/new) named `aurasculpt`.
2. In your terminal, run:
   ```bash
   git remote add origin https://github.com/<your-username>/aurasculpt.git
   git push -u origin main
   ```
3. In your GitHub repo: Go to **Settings** > **Pages** > Select branch **`main`** > Click **Save**.
4. Your app goes live at `https://<your-username>.github.io/aurasculpt/`.

### Option C: Vercel (1-Click Deployment)
1. Go to [**vercel.com/new**](https://vercel.com/new).
2. Connect your GitHub repository or upload the directory.
3. Click **Deploy**. Your app will be live at `https://aurasculpt.vercel.app`.

---

## 📱 PART 2: Test Immediately on Your Android Phone

Once your live URL is active:
1. Open Chrome on your Android smartphone and navigate to your live HTTPS URL.
2. Tap the Chrome menu (`⋮`) and select **"Add to Home screen"** or tap the **"Install App"** banner.
3. The app installs directly onto your phone screen with the custom AuraSculpt icon and runs as a full-screen standalone application (no browser address bar, camera enabled, offline ready)!

---

## 🏪 PART 3: Package & Publish to the Official Google Play Store

Because AuraSculpt AI includes a compliant `manifest.json`, Service Worker (`sw.js`), and HD PNG icons, it can be packaged directly into a native Android App Bundle (`.aab`) using Google and Microsoft's official **PWABuilder**.

### Step 1: Generate the Android App Bundle (.aab) with PWABuilder
1. Visit [**PWABuilder.com**](https://www.pwabuilder.com).
2. Enter your **live HTTPS URL** (from Netlify, Vercel, or GitHub Pages) and click **Start**.
3. PWABuilder will test your Manifest, Service Worker, and Security (all will show green checkmarks).
4. Click **Package for Android** (Google Play).
5. In the Android settings popup:
   - **Package ID**: `com.aurasculpt.app` (or your custom domain identifier)
   - **App Name**: `AuraSculpt AI`
   - **Version**: `1.0.0`
   - **Signing Key**: Select *Create new* or *PWABuilder Managed*
6. Click **Generate**.
7. Download the generated `.zip` package. Inside you will find:
   - `app-release.aab` — The exact bundle uploaded to Google Play.
   - `assetlinks.json` — Copy this file into your `.well-known/` folder on your website.

### Step 2: Set Up Google Play Console
1. Log in to [**Google Play Console**](https://play.google.com/console) (one-time $25 registration fee required by Google).
2. Click **Create app**:
   - App name: `AuraSculpt AI — Vision Calorie & Physique Coach`
   - Default language: English (United States)
   - App or Game: **App**
   - Free or Paid: **Free**

### Step 3: Complete App Policies & Details
Google Play Console requires the following sections:
- **Privacy Policy**: Paste your live URL: `https://<your-domain>/privacy-policy.html` *(This file is already included in your project!)*
- **App Access**: Choose "All functionality is available without special access restrictions".
- **Ads**: Select "No, my app does not contain ads".
- **Content Rating**: Complete the questionnaire (Category: Health/Fitness — Rating: Everyone).
- **Target Audience**: Select age 13+.
- **Data Safety**:
  - Meal photos are processed for optical calorie estimation.
  - Data is stored locally on the user's device. No data is shared with third parties.

### Step 4: Set Up Store Listing Assets
- **App Icon**: Upload `icon-512.png` (512x512 PNG, already generated in your project folder!).
- **Feature Graphic**: 1024x500 PNG/JPG banner.
- **Screenshots**: Take 2 to 4 screenshots from your phone or browser.

### Step 5: Upload the .AAB Bundle & Submit for Review
1. In the Play Console menu, go to **Production** (or **Closed Testing**).
2. Click **Create new release**.
3. Drag and drop `app-release.aab` from your PWABuilder download.
4. Enter release notes (e.g. *Initial release of AuraSculpt AI Vision Calorie Tracker*).
5. Click **Next** > **Save** > **Submit for Review**!
6. Google typically reviews and publishes your app within **2 to 5 business days**.

---

## 📁 Included Ready-To-Use Files
- `index.html` — Full responsive application
- `styles.css` — High-performance dark aesthetic styling
- `app.js` — Core AI Vision, Macro tracking, and Workout routines
- `manifest.json` — Android Web App Manifest configured for Google Play
- `sw.js` — Service worker enabling offline caching
- `icon-192.png` — 192x192 Android home screen icon
- `icon-512.png` — 512x512 Google Play Store official icon
- `icon-maskable-512.png` — Adaptive maskable Android icon
- `privacy-policy.html` — Mandatory Google Play Store Privacy Policy
- `.well-known/assetlinks.json` — Digital Asset Links verification
