import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fallbackFoodAnalyses,
  fallbackKitchenRecipes,
  fallbackDiscoverRecipes,
  generateFallbackDietPlan
} from "./fallbackData.js";

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    return null;
  }
  return new GoogleGenerativeAI(apiKey.trim());
}

function cleanJsonResponse(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

/**
 * 1. FOOD PHOTO NUTRITION ANALYSIS
 */
export async function analyzeFoodImage({ base64Data, mimeType = "image/jpeg" }) {
  const client = getGeminiClient();

  if (!client) {
    console.log("[NutriMate API] GEMINI_API_KEY not configured. Serving intelligent fallback nutrition data.");
    const randomIndex = Math.floor(Math.random() * fallbackFoodAnalyses.length);
    return {
      ...fallbackFoodAnalyses[randomIndex],
      isAiGenerated: false,
      notice: "Demo / Fallback Mode: Configure GEMINI_API_KEY in server/.env for live AI vision recognition."
    };
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are NutriMate AI, a professional dietary and nutrition expert.
Analyze the provided food photograph carefully.
Identify the food item and provide realistic, conservative nutritional estimates.

Return ONLY a valid JSON object with the following exact keys and types:
{
  "foodName": string (e.g. "Grilled Chicken Salad with Avocado"),
  "calories": number (estimated total calories),
  "protein": number (in grams),
  "carbs": number (in grams),
  "fats": number (in grams),
  "fiber": number (in grams),
  "servingSize": string (e.g. "1 medium plate (approx 320g)"),
  "confidence": string (e.g. "High", "Moderate"),
  "keyIngredients": array of strings (e.g. ["Chicken Breast", "Avocado", "Lettuce", "Olive Oil"]),
  "healthRating": string (e.g. "Nutrient-Dense", "Balanced Meal", "High Protein"),
  "healthNotes": string (brief, constructive, friendly health insight on this meal),
  "disclaimer": "Nutrition values are estimates and can vary depending on exact ingredients, cooking oils, and portion size."
}

Do not include any markdown backticks or commentary outside the JSON.`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();
    const parsed = JSON.parse(cleanJsonResponse(responseText));

    return {
      ...parsed,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("[NutriMate AI] Vision analysis error:", error.message);
    const randomIndex = Math.floor(Math.random() * fallbackFoodAnalyses.length);
    return {
      ...fallbackFoodAnalyses[randomIndex],
      isAiGenerated: false,
      notice: `Fallback used due to AI API issue: ${error.message}`
    };
  }
}

/**
 * 2. WHAT'S IN MY KITCHEN? RECIPE GENERATOR
 */
export async function generateKitchenRecipesAI({ ingredients = [], preferences = [], base64Data, mimeType }) {
  const client = getGeminiClient();

  if (!client) {
    console.log("[NutriMate API] GEMINI_API_KEY not configured. Serving intelligent fallback kitchen recipes.");
    return {
      recipes: fallbackKitchenRecipes,
      detectedIngredients: ingredients.length > 0 ? ingredients : ["Eggs", "Spinach", "Tomatoes", "Onions"],
      isAiGenerated: false,
      notice: "Demo / Fallback Mode: Configure GEMINI_API_KEY in server/.env for live recipe generation."
    };
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contents = [];
    let detectedIngredients = [...ingredients];

    let prompt = `You are NutriMate AI, an expert culinary chef and nutritionist.
The user wants recipes based on ingredients they have at home.
`;

    if (base64Data) {
      prompt += `First, inspect the uploaded photo of their kitchen/fridge/ingredients and detect the available food items.\n`;
      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType || "image/jpeg"
        }
      });
    }

    prompt += `
Known or provided ingredients: ${ingredients.join(", ") || "Ingredients from image"}
Preferences requested: ${preferences.join(", ") || "None / General healthy"}

Rules:
1. Prioritize ingredients the user already has at home. Allow standard pantry staples (salt, pepper, water, oil).
2. Generate 2 to 3 creative, practical, healthy recipes.
3. If preferences include "High Protein", ensure protein is at least 25g.
4. If "Low Calorie", keep under 450 kcal.
5. If "Quick Recipe", cooking time must be under 20 mins.
6. If "Vegetarian", no meat/poultry/fish.

Return ONLY a valid JSON object in this format:
{
  "detectedIngredients": ["item 1", "item 2", ...],
  "recipes": [
    {
      "id": "recipe-1",
      "name": "Recipe Title",
      "description": "Short appetizing description",
      "cookingTime": "15 mins",
      "difficulty": "Easy",
      "calories": 350,
      "protein": 28,
      "carbs": 22,
      "fats": 12,
      "tags": ["High Protein", "Quick Recipe"],
      "ingredients": [
        { "item": "Ingredient name", "quantity": "e.g. 2 eggs", "available": true }
      ],
      "instructions": [
        "Step 1...",
        "Step 2..."
      ],
      "tip": "Chef tip for extra flavor or easy prep"
    }
  ]
}
Do not output markdown code blocks or text outside the JSON.`;

    contents.push(prompt);
    const result = await model.generateContent(contents);
    const responseText = result.response.text();
    const parsed = JSON.parse(cleanJsonResponse(responseText));

    return {
      ...parsed,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("[NutriMate AI] Kitchen recipe error:", error.message);
    return {
      recipes: fallbackKitchenRecipes,
      detectedIngredients: ingredients.length > 0 ? ingredients : ["Eggs", "Spinach", "Tomatoes"],
      isAiGenerated: false,
      notice: `Fallback used due to AI API issue: ${error.message}`
    };
  }
}

/**
 * 3. "WHAT SHOULD I EAT?" DISCOVERY RECIPES
 */
export async function discoverRecipesAI({ query = "" }) {
  const client = getGeminiClient();

  if (!client) {
    console.log("[NutriMate API] GEMINI_API_KEY not configured. Serving intelligent discovery recipes.");
    return {
      query,
      recipes: fallbackDiscoverRecipes(query),
      isAiGenerated: false,
      notice: "Demo / Fallback Mode: Configure GEMINI_API_KEY in server/.env for live recipe search."
    };
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are NutriMate AI, a culinary and wellness expert.
The user is asking: "${query || "Healthy balanced meal"}"

Generate 2 to 3 delicious, healthy, real-world recipes tailored directly to their search request.
Ensure each recipe has complete macronutrient estimates and clear step-by-step instructions.

Return ONLY a valid JSON object in this exact format:
{
  "recipes": [
    {
      "id": "disc-1",
      "name": "Recipe Name",
      "description": "Appetizing description",
      "cookingTime": "20 mins",
      "calories": 420,
      "protein": 35,
      "carbs": 30,
      "fats": 14,
      "tags": ["High Protein", "Dinner"],
      "ingredients": [
        { "item": "Name", "quantity": "e.g. 200g" }
      ],
      "instructions": [
        "Step 1...",
        "Step 2..."
      ]
    }
  ]
}
Do not include any text outside the JSON.`;

    const result = await model.generateContent([prompt]);
    const responseText = result.response.text();
    const parsed = JSON.parse(cleanJsonResponse(responseText));

    return {
      query,
      ...parsed,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("[NutriMate AI] Recipe discovery error:", error.message);
    return {
      query,
      recipes: fallbackDiscoverRecipes(query),
      isAiGenerated: false,
      notice: `Fallback used due to AI API issue: ${error.message}`
    };
  }
}

/**
 * 4. PERSONAL GOAL → DIET PLAN GENERATOR
 */
export async function generatePersonalizedDietPlanAI(params) {
  // First compute scientific baseline (Mifflin-St Jeor & safe rates)
  const baseline = generateFallbackDietPlan(params);
  const client = getGeminiClient();

  if (!client) {
    console.log("[NutriMate API] GEMINI_API_KEY not configured. Serving science-based fallback diet plan.");
    return {
      ...baseline,
      isAiGenerated: false,
      notice: "Demo / Fallback Mode: Calculated using verified Mifflin-St Jeor metabolic equations. Add GEMINI_API_KEY in server/.env for live custom AI meal tailoring."
    };
  }

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are NutriMate AI, a registered sports nutritionist and dietitian.
A user has submitted their personal health profile:
- Current Weight: ${params.currentWeight} kg
- Target Weight: ${params.targetWeight} kg
- Height: ${params.height} cm
- Age: ${params.age} years
- Gender: ${params.gender}
- Activity Level: ${params.activityLevel}
- Primary Goal: ${params.goal}
- Preferred Diet: ${params.preferredDiet}
- Dietary Restrictions/Allergies: ${params.dietaryRestrictions || "None"}

Calculated Safe Targets:
- Daily Calorie Target: ~${baseline.overview.estimatedDailyCalories} kcal
- Daily Protein Target: ~${baseline.overview.estimatedDailyProtein}
- Safe Timeline Range: ${baseline.overview.estimatedTimeRange}
- Safe Rate: ${baseline.overview.safeWeeklyRate}

Create a personalized 5-meal daily plan adhering strictly to their preferred diet (${params.preferredDiet}) and restrictions (${params.dietaryRestrictions || "None"}).
Do NOT promise an exact number of days. State a realistic estimated range based on a safe rate (0.4 - 0.75 kg/week for loss, 0.25 - 0.5 kg/week for gain).
Never recommend extreme calorie restriction (<1200 kcal for women, <1500 kcal for men).

Return ONLY a valid JSON object in this exact structure:
{
  "overview": {
    "currentWeight": "${params.currentWeight} kg",
    "targetWeight": "${params.targetWeight} kg",
    "weightDifference": "${baseline.overview.weightDifference}",
    "estimatedDailyCalories": ${baseline.overview.estimatedDailyCalories},
    "estimatedDailyProtein": "${baseline.overview.estimatedDailyProtein}",
    "bmr": ${baseline.overview.bmr},
    "tdee": ${baseline.overview.tdee},
    "estimatedTimeRange": "${baseline.overview.estimatedTimeRange}",
    "safeWeeklyRate": "${baseline.overview.safeWeeklyRate}",
    "dietaryNotes": "Tailored for ${params.preferredDiet}"
  },
  "meals": [
    {
      "mealName": "Breakfast",
      "time": "8:00 AM",
      "food": "Specific meal description",
      "portion": "Realistic portion description",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "prepNotes": "Quick tips or beverage pairing"
    },
    {
      "mealName": "Mid-Morning Snack",
      "time": "11:00 AM",
      "food": "Specific snack",
      "portion": "Portion",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "prepNotes": "Tips"
    },
    {
      "mealName": "Lunch",
      "time": "1:30 PM",
      "food": "Lunch meal",
      "portion": "Portion",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "prepNotes": "Tips"
    },
    {
      "mealName": "Evening Snack",
      "time": "5:00 PM",
      "food": "Snack",
      "portion": "Portion",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "prepNotes": "Tips"
    },
    {
      "mealName": "Dinner",
      "time": "8:00 PM",
      "food": "Dinner meal",
      "portion": "Portion",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number,
      "prepNotes": "Tips"
    }
  ],
  "dailyTotals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fats": number
  },
  "wellnessTips": [
    "Tip 1...",
    "Tip 2...",
    "Tip 3..."
  ],
  "safetyDisclaimer": "NutriMate AI provides general nutritional and caloric estimates for educational and wellness purposes only. It is NOT medical advice. Individuals with medical conditions, diabetes, renal conditions, pregnancy, or special dietary requirements should consult a qualified physician or registered dietitian before undertaking any diet plan."
}
Do not write markdown backticks or commentary outside JSON.`;

    const result = await model.generateContent([prompt]);
    const responseText = result.response.text();
    const parsed = JSON.parse(cleanJsonResponse(responseText));

    return {
      ...parsed,
      isAiGenerated: true
    };
  } catch (error) {
    console.error("[NutriMate AI] Diet plan AI error:", error.message);
    return {
      ...baseline,
      isAiGenerated: false,
      notice: `Fallback used due to AI API issue: ${error.message}`
    };
  }
}
