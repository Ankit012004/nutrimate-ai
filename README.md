# NutriMate AI 🥗

> A simple, clean, modern AI-powered nutrition and recipe web app designed for everyday healthy eating.

---

## 🌟 Overview & Key Features

NutriMate AI is built with a clean, consumer-focused user experience that makes understanding nutrition and cooking healthy meals intuitive, fast, and delightful.

### 1. 🍎 Food Photo → Nutrition Analysis
- **Image Upload & Live Camera Capture:** Upload meals directly from your phone gallery/desktop or capture them live in the browser using the integrated camera.
- **Client-Side Image Optimization:** Automatically resizes and compresses photos before sending to prevent heavy payloads.
- **Comprehensive Nutritional Estimates:** Estimates **Calories (kcal)**, **Protein (g)**, **Carbohydrates (g)**, **Fats (g)**, **Fiber (g)**, and **Approximate Serving Size**.
- **Identified Ingredients & Insights:** Breaks down identified food components and helpful nutritional tips.
- **Estimated Disclaimers:** Clearly notes that nutritional calculations are estimates subject to preparation and portions.

### 2. 📸 What's in My Kitchen? (Pantry Recipe Generator)
- **Dual Input:** Upload/snap a photo of your fridge or pantry shelf, OR type in ingredients manually.
- **Ingredient Quick-Add:** 1-click addition for kitchen staples like Eggs, Tomatoes, Spinach, Paneer, Rice, and Chicken.
- **Diet Filters:** Supports **High Protein**, **Low Calorie**, **Quick Recipe (<20m)**, and **Vegetarian** toggles.
- **Step-by-Step Guidance:** Provides exact quantities, cooking times, complete macronutrients, step-by-step cooking steps, and chef tips.

### 3. 🍳 "What Should I Eat?" (Recipe Discovery)
- **Natural Language Discovery:** Search for anything you crave (e.g. *"Chicken recipe"*, *"Healthy breakfast"*, *"High protein dinner"*, *"Something under 500 calories"*).
- **Instant Inspiration:** Includes quick suggestion chips for popular health goals.
- **Full Recipe Profiles:** Displays preparation instructions and macro breakdowns for every dish.

### 4. 🎯 Personal Goal → Safe Diet Plan ("My Goal")
- **Metrics Intake:** Current Weight (kg), Target Weight (kg), Height (cm), Age, Gender, Activity Level, Goal (Lose/Maintain/Gain), Diet Preference (Non-Veg/Veg/Eggetarian), and Optional Allergies.
- **Mifflin-St Jeor Metabolic Engine:** Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
- **Safe & Realistic Targets:** Computes daily calorie and protein targets with medical safety boundaries (never extreme restriction).
- **Realistic Timeline Range:** Employs safe rate calculation (0.4 - 0.75 kg/week for fat loss, 0.25 - 0.5 kg/week for lean gain) and provides a realistic estimated range in weeks rather than promising an exact date.
- **5-Meal Daily Breakdown:**
  - 🌅 Breakfast
  - 🍎 Mid-Morning Snack
  - 🥗 Lunch
  - ☕ Evening Snack
  - 🍲 Dinner
- **Daily Totals:** Sums all 5 meals to match the daily target.

### 5. 🏠 Dashboard
- Home dashboard featuring the 4 large cards:
  - 🍎 **Analyze My Food**
  - 📸 **What's in My Kitchen?**
  - 🍳 **Find a Recipe**
  - 🎯 **My Diet Plan**
- Mobile-first responsive layout with bottom navigation drawer for touch devices.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React (Vite), Modern Vanilla CSS Design System with responsive grid, Google Fonts (Plus Jakarta Sans, Inter), Lucide React Icons.
- **Backend:** Node.js, Express, CORS.
- **AI Integration:** Google Gemini Generative AI (`gemini-1.5-flash` with vision and structured JSON outputs).
- **Reliability:** Built-in intelligent context-aware fallback engine that ensures the app is 100% testable and functional even without an API key or when offline.

---

## 🚀 How to Install & Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Step 1: Install Dependencies
From the project root:
```bash
# Install root orchestration packages
npm install

# Install server packages
cd server
npm install

# Install client packages
cd ../client
npm install
```
*(Or run `npm run install:all` from the root directory)*

---

### Step 2: Configure Environment Variables
Inside the `server/` directory, create or edit `.env`:
```bash
# Server port (default: 5000)
PORT=5000

# Google Gemini API Key (Optional)
# Get a free API key at: https://aistudio.google.com/app/apikey
# If left empty, NutriMate AI will automatically use its smart demonstration fallback!
GEMINI_API_KEY=your_gemini_api_key_here
```

---

### Step 3: Run the Application
You can run both backend and frontend concurrently from the root directory:
```bash
npm run dev
```

Or run them individually in separate terminals:
```bash
# Terminal 1: Backend Server (runs on http://localhost:5000)
cd server
npm run dev

# Terminal 2: Frontend Client (runs on http://localhost:3000)
cd client
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🔑 How to Configure the AI API

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and click **Get API key**.
2. Copy your key.
3. Open `server/.env` and paste your key:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
4. Restart the backend server. The app header status indicator will immediately switch from `Smart Demo Mode` to `Gemini AI Active`.

---

## 📦 How to Build & Deploy

### Building the Frontend Bundle
```bash
cd client
npm run build
```
This generates the optimized production bundle in `client/dist`.

### Production Server
In `server/server.js`, you can configure Express to serve static files from `client/dist`:
```bash
cd server
npm start
```
The application can be deployed to services like Google Cloud Run, Render, Railway, Vercel, or AWS.

---

## 🛡️ Medical & Health Safety Disclaimer
NutriMate AI provides general nutritional and caloric estimates for educational, dietary awareness, and culinary convenience only. It is **NOT** a medical diagnostic tool or prescription service. Individuals who are pregnant, lactating, managing diabetes, kidney disorders, eating disorders, or any other medical condition should consult a qualified physician or registered dietitian before adopting any new diet plan.
