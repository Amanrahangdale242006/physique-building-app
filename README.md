# ⚡ AuraSculpt AI — Vision Calorie & Precision Physique Architect

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-00F2FE?style=for-the-badge&logo=github)](https://amanrahangdale242006.github.io/physique-building-app/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-7F00FF?style=for-the-badge&logo=pwa)](https://amanrahangdale242006.github.io/physique-building-app/)
[![Google Play](https://img.shields.io/badge/Google_Play-TWA_Ready-34A853?style=for-the-badge&logo=google-play)](https://www.pwabuilder.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

> **AuraSculpt AI** is an intelligent, visual-first fitness and sports nutrition platform. It scans meal photos to estimate calories and macros, prescribes personalized hypertrophy and athletic workouts, and gamifies physique transformations through an 8-Tier Competitive League Ranking System.

---

## 🌟 Live Demo

Experience the live application right in your browser or install it on your smartphone:

👉 **[Launch AuraSculpt AI Live](https://amanrahangdale242006.github.io/physique-building-app/)**

---

## 🚀 Key Features

### 📸 1. AI Vision Meal Scanner
* **Instant Visual Macro Audit**: Snap or upload a photo of your meal to calculate calories, protein, carbohydrates, and fats.
* **Camera Hardware Integration**: Seamless one-tap mobile camera trigger (`capture="environment"`).
* **Macro Target Visualizer**: Real-time progress rings tracking daily target calories and protein intake.

### 🏋️‍♂️ 2. Precision Hypertrophy & Workout Protocols
* **Tailored Physique Blueprints**:
  * Clean Athletic Hypertrophy (Lean Surplus)
  * Fat Loss & Razor Shred (Caloric Deficit)
  * Body Recomposition (Isocaloric Periodization)
  * Maximum Strength & Bulk (Mass Surplus)
* **Interactive Set Logging**: Check off working sets (`Set 1 [✓]`, `Set 2 [✓]...`), record weights, and monitor target RPE.
* **Smart Rest Timer**: Integrated 60s / 75s rest timer with audio chime and visual progress bar.

### 🏆 3. 8-Tier Competitive League System
Advance through ranks by staying consistent with your nutrition and training:

| Tier | Rank Name | RP Range | Unlocked Perks & Privileges |
| :---: | :--- | :---: | :--- |
| 🥉 | **Bronze** | 0 – 200 RP | Baseline calorie & macronutrient calculation |
| 🥈 | **Silver** | 201 – 500 RP | Anabolic hydration & water tracking engine |
| 🥇 | **Gold** | 501 – 1,000 RP | Nutrient timing & bodyweight trajectory forecasting |
| 💠 | **Platinum** | 1,001 – 1,800 RP | Advanced progressive overload & RPE set tracker |
| 💎 | **Diamond** | 1,801 – 3,000 RP | Visual silhouette comparison & Leucine MPS audit |
| 🔥 | **Heroic** | 3,001 – 4,800 RP | Peak week carbohydrate cycling & thermogenic optimizer |
| 👑 | **Legend** | 4,801 – 7,000 RP | Unlimited VIP AI Sports Scientist coaching engine |
| 🔮 | **Grandmaster** | 7,000+ RP | Grandmaster Crest, Golden Trophy & Infinite Prestige |

### 💧 4. Anabolic Hydration Tracker
* One-tap quick logging (`+250ml`, `+500ml`, `+750ml`).
* Real-time fluid replenishment percentage vs. daily recommended intake.

### 📱 5. Native Mobile Experience (PWA)
* **Installable**: Operates like a native iOS/Android application.
* **Offline Support**: Cached static assets via Service Worker (`sw.js`).
* **Mobile-First UX**: Fixed thumb-friendly bottom navigation bar matching native fitness apps.

### 🔒 6. Privacy by Design
* All biometric calculations, meal records, and RP stats are stored locally on your device via HTML5 `localStorage`.
* Includes Google Play compliant [Privacy Policy](privacy-policy.html).

---

## 🛠️ Tech Stack

* **Core**: Semantic HTML5, Vanilla JavaScript (ES6+ modular architecture)
* **Styling**: Vanilla CSS3 (Custom design tokens, glassmorphism, responsive single-column mobile layout)
* **PWA & Offline**: Web App Manifest v2, Service Worker Cache API
* **Icons & Visuals**: High-resolution 512x512 adaptive maskable vector-rendered icons

---

## 📂 Project Architecture

```text
├── index.html                       # Main application interface
├── styles.css                       # Design system, glassmorphism & responsive layouts
├── app.js                           # Core engine (AI Vision, Macros, Workouts, League logic)
├── manifest.json                    # PWA Manifest configured for Google Play
├── sw.js                            # Service Worker for offline caching
├── privacy-policy.html              # Mandatory Google Play Store Privacy Policy
├── DEPLOYMENT_AND_PLAYSTORE_GUIDE.md# Complete deployment & publishing walkthrough
├── .well-known/
│   └── assetlinks.json              # Android Digital Asset Links verification
├── icon-192.png                     # 192x192 Android home screen icon
├── icon-512.png                     # 512x512 Google Play Store app icon
├── icon-maskable-512.png            # 512x512 Android adaptive maskable icon
└── .nojekyll                        # Ensures static routing on GitHub Pages
```

---

## 📲 How to Install as an App on Your Smartphone

### On Android (Chrome)
1. Navigate to [https://amanrahangdale242006.github.io/physique-building-app/](https://amanrahangdale242006.github.io/physique-building-app/)
2. Tap the banner **"Add AuraSculpt to Home screen"** (or tap `⋮` > **Install app**).
3. The app is added directly to your app drawer and home screen.

### On iPhone (Safari)
1. Open the link in Safari.
2. Tap the **Share** button (`⎋`).
3. Tap **"Add to Home Screen"** &rarr; **Add**.

---

## 🏪 Google Play Store Submission

This repository is pre-configured for Google Play Store packaging via Microsoft/Google's **[PWABuilder](https://www.pwabuilder.com)**:
1. Enter `https://amanrahangdale242006.github.io/physique-building-app/` into PWABuilder.
2. Click **Package for Android** to download your signed `.aab` bundle.
3. Upload to Google Play Console with the included `icon-512.png` and `privacy-policy.html`.
4. Detailed step-by-step instructions are available in [DEPLOYMENT_AND_PLAYSTORE_GUIDE.md](DEPLOYMENT_AND_PLAYSTORE_GUIDE.md).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

Developed with ❤️ by **[Aman Rahangdale](https://github.com/Amanrahangdale242006)**.
