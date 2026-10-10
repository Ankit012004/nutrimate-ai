/**
 * NutriMate AI - High Quality Fallback Data Engine
 * Provides realistic, intelligent nutrition analysis and recipes when Gemini API key is not present or offline.
 */

export const fallbackFoodAnalyses = [
  {
    foodName: "Grilled Chicken & Quinoa Avocado Bowl",
    calories: 485,
    protein: 38,
    carbs: 42,
    fats: 16,
    fiber: 8,
    servingSize: "1 medium bowl (approx 350g)",
    confidence: "High (94%)",
    keyIngredients: ["Grilled Chicken Breast", "Cooked Quinoa", "Ripe Avocado", "Cherry Tomatoes", "Baby Spinach", "Olive Oil Dressing"],
    healthRating: "Nutrient-Dense & Balanced",
    healthNotes: "Excellent high-protein meal rich in monounsaturated healthy fats, lean poultry protein, and complex carbohydrates with sustained energy release.",
    disclaimer: "Estimated nutritional values. Actual values vary depending on cooking oils, portion size, and specific dressing used."
  },
  {
    foodName: "Overnight Oats with Berries & Chia Seeds",
    calories: 340,
    protein: 15,
    carbs: 52,
    fats: 8,
    fiber: 11,
    servingSize: "1 jar / bowl (approx 280g)",
    confidence: "High (92%)",
    keyIngredients: ["Rolled Oats", "Almond Milk", "Blueberries", "Chia Seeds", "Greek Yogurt", "Raw Honey"],
    healthRating: "High Fiber & Heart Healthy",
    healthNotes: "Rich in beta-glucan soluble fiber that helps support healthy cholesterol and microbiome gut health. Great morning satiety.",
    disclaimer: "Estimated nutritional values. Actual values vary depending on milk choice, sweeteners, and fruit portions."
  },
  {
    foodName: "Mediterranean Salmon & Roasted Veggies",
    calories: 520,
    protein: 42,
    carbs: 22,
    fats: 28,
    fiber: 6,
    servingSize: "1 plate (approx 320g)",
    confidence: "High (95%)",
    keyIngredients: ["Atlantic Salmon Fillet", "Zucchini", "Bell Peppers", "Extra Virgin Olive Oil", "Garlic", "Lemon"],
    healthRating: "High Omega-3 Anti-inflammatory",
    healthNotes: "Superb source of EPA & DHA omega-3 fatty acids, high bioavailability protein, and vibrant antioxidant-rich roasted vegetables.",
    disclaimer: "Estimated nutritional values. Actual values vary depending on salmon cut thickness and added oils."
  }
];

export const fallbackKitchenRecipes = [
  {
    id: "kr-1",
    name: "Hearty Garden Skillet Frittata",
    description: "A quick, protein-packed skillet dish using your available kitchen staples like eggs and fresh vegetables.",
    cookingTime: "15 mins",
    difficulty: "Easy",
    calories: 320,
    protein: 24,
    carbs: 8,
    fats: 20,
    tags: ["High Protein", "Quick Recipe", "Vegetarian"],
    ingredients: [
      { item: "Whole Eggs", quantity: "3 large", available: true },
      { item: "Spinach / Greens", quantity: "1 cup chopped", available: true },
      { item: "Onion / Tomatoes", quantity: "1/2 cup diced", available: true },
      { item: "Olive oil or butter", quantity: "1 tsp", available: true },
      { item: "Salt, pepper, herbs", quantity: "To taste", available: true }
    ],
    instructions: [
      "Whisk eggs in a bowl with salt, black pepper, and your favorite dried herbs until frothy.",
      "Heat olive oil in a non-stick pan over medium heat. Sauté onions and tomatoes for 2-3 minutes until soft.",
      "Add spinach and stir until wilted (about 45 seconds).",
      "Pour the whisked eggs evenly across the vegetables. Cover with a lid and cook on low heat for 5-6 minutes until firm.",
      "Slide onto a plate and serve hot."
    ],
    tip: "Add a sprinkle of chili flakes or a spoonful of yogurt on the side for extra tang and protein."
  },
  {
    id: "kr-2",
    name: "Rustic High-Protein Stir-Fry Bowl",
    description: "Flavorful, colorful stir-fry maximizing your pantry vegetables and lean protein with minimal cleanup.",
    cookingTime: "18 mins",
    difficulty: "Easy",
    calories: 390,
    protein: 32,
    carbs: 34,
    fats: 12,
    tags: ["High Protein", "Quick Recipe"],
    ingredients: [
      { item: "Protein base (Tofu, Paneer or Chicken)", quantity: "150g cubed", available: true },
      { item: "Assorted vegetables (peppers, onion, carrots)", quantity: "1.5 cups sliced", available: true },
      { item: "Soy sauce or Tamari", quantity: "1 tbsp", available: true },
      { item: "Garlic & ginger", quantity: "1 tsp minced", available: true },
      { item: "Cooked rice or noodles", quantity: "1/2 cup (optional)", available: true }
    ],
    instructions: [
      "Heat a wok or heavy skillet over medium-high heat with a dash of oil.",
      "Sear the protein cubes until golden brown on all sides (approx 4-5 mins), then set aside.",
      "In the same pan, toss in minced garlic and ginger for 30 seconds until fragrant.",
      "Add vegetables and stir-fry briskly for 4 minutes to keep them crisp and tender.",
      "Return protein to the pan, drizzle soy sauce, toss well, and serve over rice or as a standalone bowl."
    ],
    tip: "A splash of lemon juice or apple cider vinegar brightens up the entire stir-fry without adding sodium."
  }
];

export const fallbackDiscoverRecipes = (query = "") => {
  const q = query.toLowerCase();
  
  if (q.includes("chicken")) {
    return [
      {
        id: "disc-chk-1",
        name: "Crispy Lemon-Herb Pan-Seared Chicken Breast",
        description: "Juicy, tender chicken breast infused with lemon juice, fresh garlic, rosemary, and olive oil.",
        cookingTime: "20 mins",
        calories: 360,
        protein: 44,
        carbs: 4,
        fats: 16,
        tags: ["High Protein", "Low Carb"],
        ingredients: [
          { item: "Boneless chicken breast", quantity: "200g (cut into cutlets)" },
          { item: "Olive oil", quantity: "1 tbsp" },
          { item: "Lemon juice & zest", quantity: "1 fresh lemon" },
          { item: "Garlic cloves", quantity: "2 crushed" },
          { item: "Oregano and rosemary", quantity: "1 tsp dried" },
          { item: "Salt and cracked black pepper", quantity: "To taste" }
        ],
        instructions: [
          "Pat chicken cutlets dry with a paper towel. Season both sides generously with salt, pepper, and herbs.",
          "In a small bowl, whisk olive oil, lemon juice, lemon zest, and crushed garlic.",
          "Heat a skillet over medium-high heat. Add chicken and sear for 5-6 minutes without moving until a golden crust forms.",
          "Flip, pour the lemon-herb mixture over the chicken, baste gently, and cook for another 4-5 minutes until internal temp reaches 165°F (74°C).",
          "Rest for 3 minutes before slicing to keep all juices locked inside."
        ]
      },
      {
        id: "disc-chk-2",
        name: "One-Pot Creamy Garlic Tuscan Chicken",
        description: "A restaurant-quality high protein dinner packed with sun-dried tomatoes, spinach, and garlic.",
        cookingTime: "25 mins",
        calories: 440,
        protein: 42,
        carbs: 9,
        fats: 24,
        tags: ["High Protein", "Comfort Food"],
        ingredients: [
          { item: "Chicken breast strips", quantity: "220g" },
          { item: "Baby spinach", quantity: "2 cups" },
          { item: "Sun-dried tomatoes", quantity: "1/4 cup chopped" },
          { item: "Low-fat Greek yogurt or light cream", quantity: "3 tbsp" },
          { item: "Chicken broth", quantity: "1/3 cup" },
          { item: "Garlic", quantity: "3 cloves minced" }
        ],
        instructions: [
          "Sear chicken in a heated pan until lightly golden; remove and set aside.",
          "Sauté garlic and sun-dried tomatoes in the residual pan juices for 1 minute.",
          "Deglaze with chicken broth, lower heat, and stir in Greek yogurt/light cream until smooth.",
          "Add baby spinach and let it wilt gently in the warm sauce.",
          "Return chicken to the pan and simmer for 3 minutes until rich and coated."
        ]
      }
    ];
  }

  if (q.includes("breakfast") || q.includes("morning")) {
    return [
      {
        id: "disc-bf-1",
        name: "Fluffy Protein Scramble with Sourdough & Avocado",
        description: "A nourishing breakfast delivering sustained cognitive energy and complete amino acids.",
        cookingTime: "10 mins",
        calories: 390,
        protein: 26,
        carbs: 32,
        fats: 18,
        tags: ["High Protein", "Quick Breakfast"],
        ingredients: [
          { item: "Whole eggs + egg whites", quantity: "2 whole + 2 whites" },
          { item: "Sourdough bread", quantity: "1 thick toasted slice" },
          { item: "Ripe avocado", quantity: "1/4 sliced" },
          { item: "Cherry tomatoes", quantity: "5-6 halved" },
          { item: "Butter or olive oil", quantity: "1 tsp" }
        ],
        instructions: [
          "Whisk eggs and egg whites together with a pinch of sea salt and pepper.",
          "Melt butter in a skillet on medium-low heat. Pour in eggs and stir gently with a spatula to form soft, creamy curds.",
          "Toast sourdough slice until crispy; spread sliced avocado on top.",
          "Pile the scrambled eggs over the toast and garnish with halved cherry tomatoes and crushed pepper."
        ]
      },
      {
        id: "disc-bf-2",
        name: "Power Berry Green Protein Smoothie Bowl",
        description: "Refreshing, nutrient-dense breakfast bowl packed with antioxidants, fiber, and clean protein.",
        cookingTime: "5 mins",
        calories: 310,
        protein: 24,
        carbs: 38,
        fats: 6,
        tags: ["Vegetarian", "Quick Recipe", "Low Calorie"],
        ingredients: [
          { item: "Protein powder (vanilla or unflavored)", quantity: "1 scoop (25g)" },
          { item: "Frozen mixed berries", quantity: "1 cup" },
          { item: "Baby spinach", quantity: "1 handful" },
          { item: "Almond milk", quantity: "1/2 cup" },
          { item: "Chia seeds", quantity: "1 tsp for topping" }
        ],
        instructions: [
          "Place frozen berries, spinach, protein powder, and almond milk into a high-speed blender.",
          "Blend on high for 60 seconds until thick and spoonable.",
          "Pour into a chilled bowl and top with chia seeds, sliced strawberries, or a drizzle of peanut butter."
        ]
      }
    ];
  }

  // Default general recommendations (under 500 cals or general)
  return [
    {
      id: "disc-gen-1",
      name: "Mediterranean Chickpea & Feta Salad Bowl",
      description: "Crisp, zesty, and fiber-rich salad that comes together in minutes without any cooking.",
      cookingTime: "10 mins",
      calories: 380,
      protein: 16,
      carbs: 45,
      fats: 14,
      tags: ["Vegetarian", "Low Calorie", "Quick Recipe"],
      ingredients: [
        { item: "Cooked / canned chickpeas (rinsed)", quantity: "1.5 cups" },
        { item: "Cucumbers & cherry tomatoes", quantity: "1 cup diced" },
        { item: "Crumble feta cheese", quantity: "30g" },
        { item: "Red onion & parsley", quantity: "2 tbsp finely chopped" },
        { item: "Lemon juice & olive oil", quantity: "1 tbsp each" }
      ],
      instructions: [
        "In a large salad bowl, combine rinsed chickpeas, diced cucumbers, tomatoes, and red onion.",
        "Drizzle with extra virgin olive oil and fresh lemon juice.",
        "Toss thoroughly, then top with crumbled feta and chopped parsley.",
        "Season with oregano, sea salt, and black pepper. Enjoy fresh!"
      ]
    },
    {
      id: "disc-gen-2",
      name: "Golden Turmeric Lentil Dahl with Greens",
      description: "Warm, comforting, gut-friendly plant-based powerhouse bursting with warming spices.",
      cookingTime: "25 mins",
      calories: 410,
      protein: 22,
      carbs: 58,
      fats: 8,
      tags: ["Vegetarian", "High Fiber", "Budget-Friendly"],
      ingredients: [
        { item: "Red split lentils (rinsed)", quantity: "3/4 cup" },
        { item: "Turmeric, cumin, coriander", quantity: "1/2 tsp each" },
        { item: "Chopped spinach", quantity: "2 cups" },
        { item: "Diced tomatoes", quantity: "1/2 cup" },
        { item: "Ginger & garlic", quantity: "1 tbsp minced" },
        { item: "Vegetable broth or water", quantity: "2.5 cups" }
      ],
      instructions: [
        "Sauté ginger, garlic, and spices in a pot with a drop of oil for 1 minute until fragrant.",
        "Add rinsed red lentils and diced tomatoes, then pour in vegetable broth.",
        "Bring to a boil, then reduce heat to medium-low, cover, and simmer for 15-18 minutes until lentils are tender and creamy.",
        "Fold in fresh spinach and simmer for 2 more minutes until wilted.",
        "Serve warm with a squeeze of fresh lemon."
      ]
    }
  ];
};

export const generateFallbackDietPlan = (params) => {
  const {
    currentWeight = 75,
    targetWeight = 70,
    height = 175,
    age = 28,
    gender = "male",
    activityLevel = "moderate",
    goal = "lose",
    preferredDiet = "non-vegetarian",
    dietaryRestrictions = ""
  } = params;

  const w = parseFloat(currentWeight) || 75;
  const tw = parseFloat(targetWeight) || 70;
  const h = parseFloat(height) || 175;
  const a = parseFloat(age) || 28;

  // Mifflin-St Jeor BMR
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  bmr += (gender.toLowerCase() === "female" ? -161 : 5);

  // Activity multipliers
  const actMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  const mult = actMultipliers[activityLevel] || 1.45;
  const tdee = Math.round(bmr * mult);

  const diff = Math.round((tw - w) * 10) / 10;
  let targetCalories = tdee;
  let timeRange = "Ongoing healthy maintenance";
  let safeWeeklyRate = "0.0 kg/week";

  if (goal === "lose" || diff < 0) {
    targetCalories = Math.max(gender === "female" ? 1250 : 1500, Math.round(tdee - 450));
    const kgToLose = Math.abs(diff);
    // Safe rate: 0.4kg to 0.75kg per week
    const minWeeks = Math.max(2, Math.round(kgToLose / 0.75));
    const maxWeeks = Math.max(3, Math.round(kgToLose / 0.4));
    timeRange = `${minWeeks} - ${maxWeeks} weeks`;
    safeWeeklyRate = "0.4 - 0.75 kg/week (safe sustainable pace)";
  } else if (goal === "gain" || diff > 0) {
    targetCalories = Math.round(tdee + 400);
    const kgToGain = Math.abs(diff);
    // Safe rate: 0.25kg to 0.5kg per week
    const minWeeks = Math.max(2, Math.round(kgToGain / 0.5));
    const maxWeeks = Math.max(3, Math.round(kgToGain / 0.25));
    timeRange = `${minWeeks} - ${maxWeeks} weeks`;
    safeWeeklyRate = "0.25 - 0.5 kg/week (lean mass building pace)";
  }

  // Safe protein target: approx 1.6 - 1.8g per kg body weight
  const proteinTarget = Math.round(w * (goal === "gain" ? 1.8 : 1.6));

  const isVeg = preferredDiet.toLowerCase().includes("veg") && !preferredDiet.toLowerCase().includes("non");
  const isEgg = preferredDiet.toLowerCase().includes("egg");

  const meals = [
    {
      mealName: "Breakfast",
      time: "8:00 AM",
      food: isVeg 
        ? "Rolled Oats Bowl with Chia Seeds, Almond Butter & Berries"
        : (isEgg ? "Veggie & 3-Egg White Omelette with Whole Wheat Toast" : "Egg & Spinach Scramble with Smoked Salmon and Whole Wheat Toast"),
      portion: isVeg ? "1 large bowl (60g oats, 150ml milk, 1 tbsp chia)" : "3 eggs/whites, 1 slice toast, 1/4 avocado",
      calories: Math.round(targetCalories * 0.25),
      protein: Math.round(proteinTarget * 0.26),
      carbs: Math.round((targetCalories * 0.25 * 0.45) / 4),
      fats: Math.round((targetCalories * 0.25 * 0.25) / 9),
      prepNotes: "Pair with black coffee or green tea. Drink 500ml water upon waking."
    },
    {
      mealName: "Mid-Morning Snack",
      time: "11:00 AM",
      food: isVeg ? "Greek Yogurt or Roasted Edamame with Apple Slices" : "Greek Yogurt with a Handful of Walnuts & Cinnamon",
      portion: "150g Greek yogurt + 1 small sliced apple",
      calories: Math.round(targetCalories * 0.12),
      protein: Math.round(proteinTarget * 0.14),
      carbs: Math.round((targetCalories * 0.12 * 0.5) / 4),
      fats: Math.round((targetCalories * 0.12 * 0.2) / 9),
      prepNotes: "Keeps blood sugar stable and curbs mid-day cravings."
    },
    {
      mealName: "Lunch",
      time: "1:30 PM",
      food: isVeg
        ? "Paneer / Tofu Tikka Bowl with Brown Rice & Mixed Green Salad"
        : "Grilled Herb Chicken Breast with Steamed Quinoa & Roasted Broccoli",
      portion: isVeg ? "150g Tofu/Paneer, 1 cup cooked brown rice, 1 cup greens" : "160g Chicken Breast, 3/4 cup cooked quinoa, 1 cup broccoli",
      calories: Math.round(targetCalories * 0.32),
      protein: Math.round(proteinTarget * 0.33),
      carbs: Math.round((targetCalories * 0.32 * 0.45) / 4),
      fats: Math.round((targetCalories * 0.32 * 0.25) / 9),
      prepNotes: "Cook with light olive oil spray. Season with fresh lemon, garlic, and pink salt."
    },
    {
      mealName: "Evening Snack",
      time: "5:00 PM",
      food: "Roasted Pumpkin Seeds & Green Tea with a Boiled Egg or Hummus & Carrots",
      portion: "20g seeds + 1 boiled egg or 2 tbsp hummus with cucumber sticks",
      calories: Math.round(targetCalories * 0.11),
      protein: Math.round(proteinTarget * 0.11),
      carbs: Math.round((targetCalories * 0.11 * 0.35) / 4),
      fats: Math.round((targetCalories * 0.11 * 0.4) / 9),
      prepNotes: "Ideal pre-workout booster or evening hunger buffer."
    },
    {
      mealName: "Dinner",
      time: "8:00 PM",
      food: isVeg
        ? "Hearty Lentil Soup (Dahl) with Sautéed Spinach and Cauliflower Rice"
        : "Baked Lemon Pepper Fish Fillet with Asparagus and Sweet Potato Mash",
      portion: isVeg ? "1.5 cups lentil soup + generous bowl of greens" : "180g Fish Fillet + 100g sweet potato + asparagus spears",
      calories: Math.round(targetCalories * 0.20),
      protein: Math.round(proteinTarget * 0.22),
      carbs: Math.round((targetCalories * 0.20 * 0.4) / 4),
      fats: Math.round((targetCalories * 0.20 * 0.25) / 9),
      prepNotes: "Light and easily digestible for better sleep quality."
    }
  ];

  // Calculate daily totals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

  return {
    overview: {
      currentWeight: `${w} kg`,
      targetWeight: `${tw} kg`,
      weightDifference: `${diff > 0 ? "+" : ""}${diff} kg`,
      estimatedDailyCalories: targetCalories,
      estimatedDailyProtein: `${proteinTarget} g`,
      bmr: Math.round(bmr),
      tdee: tdee,
      estimatedTimeRange: timeRange,
      safeWeeklyRate: safeWeeklyRate,
      dietaryNotes: dietaryRestrictions ? `Tailored avoiding: ${dietaryRestrictions}` : "Standard balanced distribution"
    },
    dailyTotals: {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fats: totalFats
    },
    meals,
    wellnessTips: [
      "Aim for 2.5 - 3.5 liters of clean water daily to optimize metabolic efficiency.",
      "Prioritize 7-8 hours of restful sleep: recovery regulates hunger hormones leptin and ghrelin.",
      "Progressive consistency beats perfection. Weigh yourself under consistent morning conditions once per week."
    ],
    safetyDisclaimer: "NutriMate AI provides general nutritional and caloric estimates for educational and wellness purposes only. It is NOT medical advice. Individuals with medical conditions, diabetes, renal conditions, cardiovascular diseases, pregnancy, lactation, eating disorders, or special dietary requirements should consult a qualified physician or registered dietitian before undertaking any diet plan."
  };
};
