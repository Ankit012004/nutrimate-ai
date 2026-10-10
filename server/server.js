import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  analyzeFoodImage,
  generateKitchenRecipesAI,
  discoverRecipesAI,
  generatePersonalizedDietPlanAI
} from "./geminiService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for client
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));

// Generous payload limits for base64 camera and food photos
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Health & System status check
app.get("/api/health", (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "" && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here");
  res.json({
    status: "ok",
    app: "NutriMate AI API",
    aiConfigured: hasKey,
    mode: hasKey ? "Live Gemini AI" : "Smart Demonstration Fallback"
  });
});

// Helper to strip data:image/...;base64, prefix if present
function parseBase64Image(dataString) {
  if (!dataString) return { base64Data: null, mimeType: "image/jpeg" };
  const matches = dataString.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches) {
    return {
      mimeType: matches[1],
      base64Data: matches[2]
    };
  }
  return {
    mimeType: "image/jpeg",
    base64Data: dataString
  };
}

/**
 * 1. POST /api/analyze-food
 * Analyzes uploaded or captured food photo for nutritional breakdown
 */
app.post("/api/analyze-food", async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Please provide an image for analysis." });
    }

    const parsed = parseBase64Image(image);
    const result = await analyzeFoodImage({
      base64Data: parsed.base64Data,
      mimeType: mimeType || parsed.mimeType
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /api/analyze-food:", err);
    res.status(500).json({ error: "Failed to analyze food image.", details: err.message });
  }
});

/**
 * 2. POST /api/kitchen-recipes
 * Generates recipes based on pantry ingredients or photo
 */
app.post("/api/kitchen-recipes", async (req, res) => {
  try {
    const { ingredients = [], preferences = [], image, mimeType } = req.body;

    let base64Data = null;
    let detectedMime = "image/jpeg";
    if (image) {
      const parsed = parseBase64Image(image);
      base64Data = parsed.base64Data;
      detectedMime = mimeType || parsed.mimeType;
    }

    if ((!ingredients || ingredients.length === 0) && !base64Data) {
      return res.status(400).json({ error: "Please provide ingredients or upload a kitchen image." });
    }

    const result = await generateKitchenRecipesAI({
      ingredients,
      preferences,
      base64Data,
      mimeType: detectedMime
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /api/kitchen-recipes:", err);
    res.status(500).json({ error: "Failed to generate kitchen recipes.", details: err.message });
  }
});

/**
 * 3. POST /api/discover-recipes
 * "What should I eat?" recipe discovery endpoint
 */
app.post("/api/discover-recipes", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Please enter a food preference or search term." });
    }

    const result = await discoverRecipesAI({ query: query.trim() });
    res.json(result);
  } catch (err) {
    console.error("Error in /api/discover-recipes:", err);
    res.status(500).json({ error: "Failed to discover recipes.", details: err.message });
  }
});

/**
 * 4. POST /api/diet-plan
 * Personalized goal calculation and 5-meal daily plan
 */
app.post("/api/diet-plan", async (req, res) => {
  try {
    const {
      currentWeight,
      targetWeight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      preferredDiet,
      dietaryRestrictions
    } = req.body;

    if (!currentWeight || !targetWeight || !height || !age) {
      return res.status(400).json({ error: "Please provide current weight, target weight, height, and age." });
    }

    const result = await generatePersonalizedDietPlanAI({
      currentWeight: parseFloat(currentWeight),
      targetWeight: parseFloat(targetWeight),
      height: parseFloat(height),
      age: parseInt(age, 10),
      gender: gender || "male",
      activityLevel: activityLevel || "moderate",
      goal: goal || "lose",
      preferredDiet: preferredDiet || "non-vegetarian",
      dietaryRestrictions: dietaryRestrictions || ""
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /api/diet-plan:", err);
    res.status(500).json({ error: "Failed to generate personalized diet plan.", details: err.message });
  }
});

export default app;

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[NutriMate AI Server] running on http://localhost:${PORT}`);
  });
}
