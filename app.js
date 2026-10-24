/**
 * AURASCULPT AI — CORE ENGINE
 * Vision Calorie Tracking & Precision Physique Architecture
 */

// ===================================================================
// 1. DATA STATE & PRESETS
// ===================================================================

const DEFAULT_PROFILE = {
  gender: 'male',
  age: 24,
  height: 178,
  weight: 76.0,
  targetWeight: 79.0,
  bodyFat: 14,
  activity: 1.55,
  split: 'ppl',
  archetype: 'hypertrophy', // 'hypertrophy' | 'shred' | 'recomp' | 'strength'
  bmr: 1760,
  tdee: 2550,
  targetCalories: 2800,
  targetProtein: 190,
  targetCarbs: 280,
  targetFats: 65,
  targetWater: 3.5,
  burnedKcal: 450
};

const ARCHETYPES_CONFIG = {
  hypertrophy: {
    name: 'Clean Athletic Hypertrophy',
    calorieDelta: 250,
    proteinPerKg: 2.2,
    fatPct: 0.22,
    badge: 'Lean Surplus (+250 kcal)',
    advice: 'Target 0.25 - 0.35 kg lean gain/week. Focus on heavy progressive overload with 2-3 reps in reserve.',
    splitTip: 'Push / Pull / Legs (6-Day Hypertrophy). Emphasize incline presses, lat pulldowns, and Romanian deadlifts.'
  },
  shred: {
    name: 'Fat Loss & Razor Shred',
    calorieDelta: -500,
    proteinPerKg: 2.4,
    fatPct: 0.20,
    badge: 'Aggressive Cut (-500 kcal)',
    advice: 'Target 0.5 - 0.75 kg fat loss/week. Keep protein high to preserve 100% of contractile muscle mass.',
    splitTip: 'Upper / Lower (4-Day Heavy) + 8k-10k daily steps to maximize NEAT (Non-Exercise Activity Thermogenesis).'
  },
  recomp: {
    name: 'Body Recomposition',
    calorieDelta: 0,
    proteinPerKg: 2.3,
    fatPct: 0.25,
    badge: 'Maintenance (0 kcal Delta)',
    advice: 'Simultaneous hypertrophy and fat oxidation. Eat higher carbs on training days and moderate fats on rest days.',
    splitTip: 'Push / Pull / Legs or Full Body 3x with undulating periodization for maximum metabolic stimulation.'
  },
  strength: {
    name: 'Maximum Strength & Bulk',
    calorieDelta: 550,
    proteinPerKg: 2.0,
    fatPct: 0.28,
    badge: 'Mass Surplus (+550 kcal)',
    advice: 'Accelerate muscular power and tendon strength. Prioritize dense caloric intake and ample post-workout recovery.',
    splitTip: '5x5 / Powerbuilding split: Heavy Squats, Bench Press, and Deadlifts with 3-5 minute rest intervals.'
  }
};

const LEAGUES = [
  { id: 'bronze', name: 'Bronze League', minRP: 0, maxRP: 200, icon: '🥉', tier: 'Tier I', perk: 'Basic Calorie & Macronutrient Tracking' },
  { id: 'silver', name: 'Silver League', minRP: 201, maxRP: 500, icon: '🥈', tier: 'Tier II', perk: 'Anabolic Water Hydration Engine' },
  { id: 'gold', name: 'Gold League', minRP: 501, maxRP: 1000, icon: '🥇', tier: 'Tier III', perk: 'Nutrient Timing & Bodyweight Projections' },
  { id: 'platinum', name: 'Platinum League', minRP: 1001, maxRP: 1800, icon: '💠', tier: 'Tier IV', perk: 'Advanced Progressive Overload & RPE Set Tracker' },
  { id: 'diamond', name: 'Diamond League', minRP: 1801, maxRP: 3000, icon: '💎', tier: 'Tier III', perk: 'Visual Silhouette Split & Leucine MPS Audit' },
  { id: 'heroic', name: 'Heroic League', minRP: 3001, maxRP: 4800, icon: '🔥', tier: 'Tier II', perk: 'Peak Week Carbohydrate Cycling' },
  { id: 'legend', name: 'Legend League', minRP: 4801, maxRP: 7000, icon: '👑', tier: 'Tier I', perk: 'Unlimited VIP AI Sports Scientist Coaching' },
  { id: 'grandmaster', name: 'Grandmaster League', minRP: 7001, maxRP: 15000, icon: '🔮', tier: 'Pinnacle', perk: 'Grandmaster Crest, Trophy Badge & Infinite Prestige' }
];

const WORKOUT_ROUTINES = {
  push: {
    title: 'Push Day A — Hypertrophic Chest & Delts',
    focus: 'Upper Pectoralis, Anterior/Lateral Delts, and Tricep Lateral Head',
    exercises: [
      { name: 'Incline Dumbbell Bench Press', muscle: 'Chest (Upper Clavicular Head)', sets: 4, reps: '8 - 12', rpe: '8.5', cues: 'Retract scapulae, 30° bench angle, 3-second controlled eccentric stretch.' },
      { name: 'Standing Overhead Barbell Press (OHP)', muscle: 'Shoulders (Anterior Delts)', sets: 3, reps: '6 - 10', rpe: '8.0', cues: 'Squeeze glutes, brace core, press straight up close to face.' },
      { name: 'Cable Low-to-High Chest Flyes', muscle: 'Chest (Sternal Squeeze)', sets: 3, reps: '12 - 15', rpe: '9.0', cues: 'Slight elbow bend, bring biceps together at peak squeeze.' },
      { name: 'Dumbbell Lateral Raises', muscle: 'Shoulders (Lateral Delt Caps)', sets: 4, reps: '15 - 20', rpe: '9.5', cues: 'Lead with elbows, pause 1s at horizontal, avoid swinging hips.' },
      { name: 'Dual-Rope Tricep Cable Pushdown', muscle: 'Triceps (Lateral & Long Head)', sets: 4, reps: '12 - 15', rpe: '9.0', cues: 'Flare ropes outward at full extension for maximum contraction.' }
    ]
  },
  pull: {
    title: 'Pull Day A — Lat Width & Upper Back Density',
    focus: 'Latissimus Dorsi, Rhomboids, Rear Deltoids, Biceps Brachii',
    exercises: [
      { name: 'Weighted Pull-Ups / Lat Pulldown', muscle: 'Back (Latissimus Dorsi)', sets: 4, reps: '6 - 10', rpe: '8.5', cues: 'Drive elbows down into your back pockets, full dead-hang stretch at top.' },
      { name: 'Chest-Supported T-Bar Row', muscle: 'Upper Back & Mid-Traps', sets: 4, reps: '8 - 12', rpe: '8.5', cues: 'Protracted stretch at bottom, squeeze shoulder blades together hard.' },
      { name: 'Seated Cable Face Pulls', muscle: 'Rear Delts & Rotator Cuff', sets: 3, reps: '15 - 20', rpe: '9.0', cues: 'Pull to eye level, externally rotate wrists backward.' },
      { name: 'Incline Dumbbell Bicep Curls', muscle: 'Biceps (Long Head Stretch)', sets: 3, reps: '10 - 12', rpe: '8.5', cues: 'Keep upper arm perpendicular to floor to maintain deep stretch.' },
      { name: 'Hammer Rope Cable Curls', muscle: 'Brachialis & Forearms', sets: 3, reps: '12 - 15', rpe: '9.0', cues: 'Neutral grip, control lowering phase for thicker arm width.' }
    ]
  },
  legs: {
    title: 'Leg Day A — Quad Sweep & Posterior Chain',
    focus: 'Vastus Lateralis, Hamstrings, Gluteus Maximus, Gastrocnemius',
    exercises: [
      { name: 'Barbell Back Squat / Hack Squat', muscle: 'Quads & Glutes', sets: 4, reps: '6 - 10', rpe: '8.5', cues: 'Break at knees and hips simultaneously, hit below parallel with control.' },
      { name: 'Romanian Deadlifts (RDL)', muscle: 'Hamstrings & Posterior Chain', sets: 4, reps: '8 - 10', rpe: '8.0', cues: 'Hinge hips backward until deep hamstring stretch, soft knees.' },
      { name: 'Bulgarian Split Squats', muscle: 'Quad Sweep & Glute Stability', sets: 3, reps: '10 - 12 / leg', rpe: '9.0', cues: 'Slight torso forward lean, drive through mid-foot.' },
      { name: 'Seated Hamstring Leg Curl', muscle: 'Hamstrings (Knee Flexion)', sets: 3, reps: '12 - 15', rpe: '9.0', cues: 'Keep toes dorsiflexed, 2-second hold at bottom.' },
      { name: 'Standing Machine Calf Raises', muscle: 'Calves (Gastrocnemius)', sets: 4, reps: '15 - 20', rpe: '9.5', cues: 'Full 2-second stretch at bottom, explosive rise onto balls of feet.' }
    ]
  },
  upper: {
    title: 'Upper Strength & Power Synergy',
    focus: 'Compound Horizontal & Vertical Upper Body Pushing & Pulling',
    exercises: [
      { name: 'Flat Barbell Bench Press', muscle: 'Pectoralis Major & Triceps', sets: 5, reps: '5 Reps', rpe: '8.5', cues: 'Arch upper back, plant feet firmly, explode off the chest.' },
      { name: 'Barbell Bent-Over Row', muscle: 'Lats & Spinal Erectors', sets: 4, reps: '6 - 8 Reps', rpe: '8.0', cues: 'Torso at 45°, pull bar to lower ribcage.' },
      { name: 'Arnold Dumbbell Overhead Press', muscle: 'Complete Deltoid Head Rotation', sets: 3, reps: '10 - 12 Reps', rpe: '8.5', cues: 'Rotate palms outward as you press up in smooth arc.' },
      { name: 'Weighted Chest Dips', muscle: 'Lower Pectoralis & Triceps', sets: 3, reps: '8 - 10 Reps', rpe: '8.5', cues: 'Lean chest forward 30°, lower until elbows reach 90 degrees.' }
    ]
  }
};

const SVG_FALLBACKS = {
  salmon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="bBg" cx="50%" cy="50%" r="50%"><stop offset="60%" stop-color="%23171D2B"/><stop offset="100%" stop-color="%230A0E17"/></radialGradient><linearGradient id="sal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FF7A60"/><stop offset="100%" stop-color="%23DC2626"/></linearGradient><linearGradient id="avo" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2384CC16"/><stop offset="100%" stop-color="%234D7C0F"/></linearGradient></defs><rect width="400" height="300" fill="%230B0F17"/><circle cx="200" cy="150" r="130" fill="url(%23bBg)" stroke="%23334155" stroke-width="4"/><circle cx="200" cy="150" r="122" fill="%231E293B"/><ellipse cx="240" cy="190" rx="45" ry="35" fill="%23FBBF24" opacity="0.85"/><ellipse cx="250" cy="120" rx="12" ry="8" fill="%2384CC16"/><ellipse cx="270" cy="135" rx="12" ry="8" fill="%2384CC16"/><ellipse cx="235" cy="135" rx="12" ry="8" fill="%2384CC16"/><path d="M130 190 C120 160, 150 150, 170 180 Z" fill="url(%23avo)"/><path d="M145 195 C135 165, 165 155, 185 185 Z" fill="url(%23avo)"/><path d="M160 200 C150 170, 180 160, 200 190 Z" fill="url(%23avo)"/><rect x="135" y="100" width="75" height="110" rx="12" fill="url(%23sal)" transform="rotate(-18 172 155)" stroke="%23991B1B" stroke-width="2"/><line x1="145" y1="120" x2="195" y2="105" stroke="%237F1D1D" stroke-width="3" stroke-linecap="round"/><line x1="150" y1="145" x2="200" y2="130" stroke="%237F1D1D" stroke-width="3" stroke-linecap="round"/><line x1="155" y1="170" x2="205" y2="155" stroke="%237F1D1D" stroke-width="3" stroke-linecap="round"/><circle cx="170" cy="135" r="2" fill="%23FFFFFF"/><circle cx="185" cy="148" r="2" fill="%23FFFFFF"/></svg>',
  steak: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="plate" cx="50%" cy="50%" r="50%"><stop offset="65%" stop-color="%231E293B"/><stop offset="100%" stop-color="%230F172A"/></radialGradient><linearGradient id="stk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2378350F"/><stop offset="50%" stop-color="%23B91C1C"/><stop offset="100%" stop-color="%23451A03"/></linearGradient></defs><rect width="400" height="300" fill="%230B0F17"/><circle cx="200" cy="150" r="135" fill="url(%23plate)" stroke="%23475569" stroke-width="3"/><rect x="230" y="80" width="14" height="120" rx="7" fill="%2316A34A" transform="rotate(15 237 140)"/><rect x="245" y="85" width="14" height="120" rx="7" fill="%2322C55E" transform="rotate(18 252 145)"/><rect x="260" y="90" width="14" height="120" rx="7" fill="%2315803D" transform="rotate(22 267 150)"/><rect x="180" y="70" width="28" height="28" rx="6" fill="%23EA580C"/><rect x="150" y="85" width="26" height="26" rx="6" fill="%23D97706"/><rect x="185" y="105" width="24" height="24" rx="6" fill="%23EA580C"/><rect x="90" y="130" width="115" height="95" rx="16" fill="url(%23stk)" stroke="%23371B04" stroke-width="2"/><line x1="95" y1="140" x2="195" y2="210" stroke="%23271202" stroke-width="3.5" stroke-linecap="round"/><line x1="120" y1="135" x2="198" y2="190" stroke="%23271202" stroke-width="3.5" stroke-linecap="round"/><line x1="95" y1="180" x2="175" y2="225" stroke="%23271202" stroke-width="3.5" stroke-linecap="round"/><circle cx="140" cy="175" r="2" fill="%23F3F4F6"/></svg>',
  chicken: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="chkBowl" cx="50%" cy="50%" r="50%"><stop offset="70%" stop-color="%231F2937"/><stop offset="100%" stop-color="%23111827"/></radialGradient><linearGradient id="chk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FBBF24"/><stop offset="100%" stop-color="%23B45309"/></linearGradient></defs><rect width="400" height="300" fill="%230B0F17"/><circle cx="200" cy="150" r="130" fill="url(%23chkBowl)" stroke="%23374151" stroke-width="4"/><ellipse cx="210" cy="150" rx="75" ry="60" fill="%23D97706" opacity="0.6"/><circle cx="240" cy="115" r="18" fill="%2316A34A"/><circle cx="260" cy="130" r="16" fill="%2315803D"/><circle cx="245" cy="145" r="16" fill="%2322C55E"/><circle cx="220" cy="110" r="10" fill="%23DC2626"/><circle cx="270" cy="110" r="10" fill="%23EA580C"/><path d="M100 130 C120 100, 180 110, 190 170 C190 200, 130 220, 105 170 Z" fill="url(%23chk)" stroke="%2378350F" stroke-width="2"/><line x1="120" y1="125" x2="115" y2="185" stroke="%2378350F" stroke-width="2.5"/><line x1="140" y1="120" x2="135" y2="195" stroke="%2378350F" stroke-width="2.5"/><line x1="160" y1="125" x2="155" y2="195" stroke="%2378350F" stroke-width="2.5"/><line x1="175" y1="135" x2="175" y2="185" stroke="%2378350F" stroke-width="2.5"/></svg>',
  pancakes: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="panPlate" cx="50%" cy="50%" r="50%"><stop offset="70%" stop-color="%231E293B"/><stop offset="100%" stop-color="%230F172A"/></radialGradient><linearGradient id="pan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FDE68A"/><stop offset="100%" stop-color="%23D97706"/></linearGradient></defs><rect width="400" height="300" fill="%230B0F17"/><circle cx="200" cy="155" r="130" fill="url(%23panPlate)" stroke="%23334155" stroke-width="3"/><ellipse cx="200" cy="205" rx="72" ry="22" fill="%23B45309"/><ellipse cx="200" cy="185" rx="70" ry="21" fill="url(%23pan)" stroke="%2392400E" stroke-width="1.5"/><ellipse cx="200" cy="165" rx="68" ry="20" fill="url(%23pan)" stroke="%2392400E" stroke-width="1.5"/><ellipse cx="200" cy="145" rx="65" ry="19" fill="url(%23pan)" stroke="%2392400E" stroke-width="1.5"/><ellipse cx="200" cy="125" rx="62" ry="18" fill="url(%23pan)" stroke="%2392400E" stroke-width="1.5"/><path d="M190 125 C190 145, 175 160, 175 180" stroke="%2392400E" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="195" cy="115" r="10" fill="%231E3A8A"/><circle cx="215" cy="120" r="9" fill="%231E40AF"/><circle cx="180" cy="122" r="8" fill="%231D4ED8"/><path d="M200 95 L215 110 L185 110 Z" fill="%23DC2626"/></svg>'
};
window.SVG_FALLBACKS = SVG_FALLBACKS;

const PRESET_MEALS = {
  salmon: {
    title: 'Grilled Atlantic Salmon Quinoa Bowl',
    image: 'assets/salmon_bowl.jpg',
    fallbackImage: SVG_FALLBACKS.salmon,
    score: 94,
    verdict: 'Exceptional muscle-building meal. Rich in leucine for Muscle Protein Synthesis (MPS) and healthy omega-3 fatty acids for joint & hormone health.',
    ingredients: [
      { name: 'Grilled Atlantic Salmon', weight: 180, kcal: 370, protein: 38, carbs: 0, fats: 22 },
      { name: 'Fluffy White Quinoa', weight: 140, kcal: 170, protein: 6, carbs: 30, fats: 3 },
      { name: 'Sliced Ripe Avocado', weight: 45, kcal: 72, protein: 1, carbs: 4, fats: 7 },
      { name: 'Edamame & Microgreens', weight: 60, kcal: 68, protein: 7, carbs: 5, fats: 2 }
    ],
    boxes: [
      { top: 22, left: 24, width: 30, height: 44, label: 'Salmon (180g)' },
      { top: 48, left: 54, width: 26, height: 32, label: 'Quinoa (140g)' },
      { top: 54, left: 34, width: 20, height: 28, label: 'Avocado (45g)' },
      { top: 20, left: 53, width: 22, height: 26, label: 'Edamame (60g)' }
    ]
  },
  steak: {
    title: 'Sirloin Steak & Roasted Sweet Potato',
    image: 'assets/steak_potato.jpg',
    fallbackImage: SVG_FALLBACKS.steak,
    score: 96,
    verdict: 'Prime hypertrophy meal. High-bioavailability heme iron, natural creatine, and slow-digesting complex carbs to recharge muscle glycogen.',
    ingredients: [
      { name: 'Grilled Beef Sirloin Steak', weight: 210, kcal: 450, protein: 49, carbs: 0, fats: 26 },
      { name: 'Roasted Sweet Potato Cubes', weight: 180, kcal: 165, protein: 3, carbs: 39, fats: 1 },
      { name: 'Steamed Asparagus Spears', weight: 110, kcal: 42, protein: 4, carbs: 7, fats: 1 }
    ],
    boxes: [
      { top: 35, left: 18, width: 44, height: 42, label: 'Sirloin Steak (210g)' },
      { top: 16, left: 28, width: 32, height: 30, label: 'Sweet Potato (180g)' },
      { top: 18, left: 58, width: 32, height: 44, label: 'Asparagus (110g)' }
    ]
  },
  chicken: {
    title: 'Herb Chicken & Steamed Brown Rice Bowl',
    image: 'assets/chicken_macro_bowl.jpg',
    fallbackImage: SVG_FALLBACKS.chicken,
    score: 98,
    verdict: 'Gold standard bodybuilding staple. Ultra-lean poultry protein with low-GI complex carbs and cruciferous vegetables rich in DIM & fiber.',
    ingredients: [
      { name: 'Herb Grilled Chicken Breast', weight: 200, kcal: 330, protein: 46, carbs: 0, fats: 7 },
      { name: 'Steamed Brown Rice', weight: 160, kcal: 180, protein: 4, carbs: 39, fats: 2 },
      { name: 'Broccoli Florets & Tomatoes', weight: 120, kcal: 50, protein: 4, carbs: 9, fats: 1 }
    ],
    boxes: [
      { top: 40, left: 20, width: 28, height: 40, label: 'Chicken Breast (200g)' },
      { top: 40, left: 45, width: 30, height: 42, label: 'Brown Rice (160g)' },
      { top: 38, left: 52, width: 32, height: 35, label: 'Broccoli & Tomatoes' }
    ]
  },
  pancakes: {
    title: 'High-Protein Berry Oat Pancake Stack',
    image: 'assets/protein_pancakes.jpg',
    fallbackImage: SVG_FALLBACKS.pancakes,
    score: 91,
    verdict: 'Optimal pre-workout meal or breakfast. High-yield whey protein paired with complex oat beta-glucan and antioxidants for muscle endurance.',
    ingredients: [
      { name: 'Whey Protein Oat Pancakes', weight: 230, kcal: 430, protein: 39, carbs: 52, fats: 10 },
      { name: 'Fresh Berries (Blueberries & Strawberries)', weight: 90, kcal: 55, protein: 1, carbs: 12, fats: 0 },
      { name: 'Sugar-Free Maple Syrup', weight: 35, kcal: 18, protein: 0, carbs: 4, fats: 0 }
    ],
    boxes: [
      { top: 32, left: 24, width: 44, height: 46, label: 'Protein Pancakes (230g)' },
      { top: 22, left: 30, width: 28, height: 20, label: 'Fresh Berries (90g)' }
    ]
  }
};

const DEFAULT_MEALS_LOG = [
  {
    id: 'm1',
    name: 'High-Protein Berry Oat Pancake Stack',
    category: 'Breakfast',
    time: '08:30 AM',
    calories: 520,
    protein: 42,
    carbs: 62,
    fats: 12,
    image: 'assets/protein_pancakes.jpg',
    fallbackImage: SVG_FALLBACKS.pancakes,
    score: 91
  },
  {
    id: 'm2',
    name: 'Grilled Atlantic Salmon Quinoa Bowl',
    category: 'Lunch',
    time: '01:15 PM',
    calories: 620,
    protein: 44,
    carbs: 42,
    fats: 30,
    image: 'assets/salmon_bowl.jpg',
    fallbackImage: SVG_FALLBACKS.salmon,
    score: 94
  },
  {
    id: 'm3',
    name: 'Whey Isolate & Banana Recovery Shake',
    category: 'Post-Workout',
    time: '04:45 PM',
    calories: 340,
    protein: 38,
    carbs: 45,
    fats: 3,
    image: '',
    score: 95
  }
];

const DEFAULT_WEIGHT_TREND = [
  { day: 'Day 1', weight: 74.2 },
  { day: 'Day 7', weight: 74.5 },
  { day: 'Day 14', weight: 74.9 },
  { day: 'Day 21', weight: 75.3 },
  { day: 'Day 28', weight: 75.6 },
  { day: 'Day 35', weight: 75.9 },
  { day: 'Today', weight: 76.0 }
];

// ===================================================================
// 2. APPLICATION INITIALIZATION & STORAGE
// ===================================================================

class AuraSculptApp {
  constructor() {
    this.profile = this.loadStorage('aura_profile', DEFAULT_PROFILE);
    this.loggedMeals = this.loadStorage('aura_meals', DEFAULT_MEALS_LOG);
    this.weightTrend = this.loadStorage('aura_weight_trend', DEFAULT_WEIGHT_TREND);
    this.waterIntake = this.loadStorage('aura_water', 2.4);
    this.activePresetKey = 'salmon';
    this.currentDetectedMeal = null;
    this.cameraStream = null;

    this.settings = this.loadStorage('aura_settings', {
      apiKey: '',
      model: 'gemini-1.5-flash',
      unitSystem: 'metric'
    });

    this.leaguePoints = this.loadStorage('aura_league_points', 2450);
    this.currentWorkoutDay = 'push';
    this.completedSets = this.loadStorage('aura_completed_sets', {});
    this.workoutClaimedToday = this.loadStorage('aura_workout_claimed', false);
    this.restTimerInterval = null;

    this.init();
  }

  loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('Storage read failed', e);
      return fallback;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  init() {
    this.calculateBiometrics();
    this.bindEvents();
    this.renderHeader();
    this.renderDashboard();
    this.renderLeagueStatus();
    this.renderWorkouts(this.currentWorkoutDay);
    this.loadPreset(this.activePresetKey);
    this.renderPhysiqueForm();
    this.renderWeightChart();
    this.renderCoachWelcome();
  }

  // ===================================================================
  // 3. BIOMETRICS & TARGET CALCULATION ENGINE
  // ===================================================================

  calculateBiometrics() {
    const { gender, age, height, weight, activity, archetype } = this.profile;

    // Mifflin-St Jeor Formula
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;
    this.profile.bmr = Math.round(bmr);

    const tdee = Math.round(bmr * parseFloat(activity));
    this.profile.tdee = tdee;

    // Archetype adjustment
    const arch = ARCHETYPES_CONFIG[archetype] || ARCHETYPES_CONFIG.hypertrophy;
    const targetCalories = tdee + arch.calorieDelta;
    this.profile.targetCalories = targetCalories;

    // Macronutrient targets
    const proteinGrams = Math.round(weight * arch.proteinPerKg);
    const fatCalories = targetCalories * arch.fatPct;
    const fatGrams = Math.round(fatCalories / 9);
    const remainingCaloriesForCarbs = Math.max(0, targetCalories - (proteinGrams * 4) - (fatGrams * 9));
    const carbGrams = Math.round(remainingCaloriesForCarbs / 4);

    this.profile.targetProtein = proteinGrams;
    this.profile.targetFats = fatGrams;
    this.profile.targetCarbs = carbGrams;
    this.profile.targetWater = parseFloat(((weight * 0.04) + (activity > 1.5 ? 0.7 : 0.3)).toFixed(1));

    this.saveStorage('aura_profile', this.profile);
  }

  // ===================================================================
  // 4. RENDERING FUNCTIONS
  // ===================================================================

  renderHeader() {
    const arch = ARCHETYPES_CONFIG[this.profile.archetype] || ARCHETYPES_CONFIG.hypertrophy;
    const badge = document.getElementById('headerArchetypeName');
    if (badge) badge.textContent = arch.name;

    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
      const now = new Date();
      dateDisplay.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  }

  renderDashboard() {
    // 1. Calculate consumed sums from logged meals
    let consumedKcal = 0;
    let consumedP = 0;
    let consumedC = 0;
    let consumedF = 0;

    this.loggedMeals.forEach(m => {
      consumedKcal += Number(m.calories) || 0;
      consumedP += Number(m.protein) || 0;
      consumedC += Number(m.carbs) || 0;
      consumedF += Number(m.fats) || 0;
    });

    const targetKcal = this.profile.targetCalories;
    const targetP = this.profile.targetProtein;
    const targetC = this.profile.targetCarbs;
    const targetF = this.profile.targetFats;
    const targetWater = this.profile.targetWater;

    // Update Calorie Ring
    const remainingKcal = Math.max(0, targetKcal - consumedKcal);
    const caloriesRemainingVal = document.getElementById('caloriesRemainingVal');
    const caloriesConsumedVal = document.getElementById('caloriesConsumedVal');
    const caloriesTargetVal = document.getElementById('caloriesTargetVal');
    const statConsumedKcal = document.getElementById('statConsumedKcal');
    const statSurplusStatus = document.getElementById('statSurplusStatus');

    if (caloriesRemainingVal) caloriesRemainingVal.textContent = remainingKcal.toLocaleString();
    if (caloriesConsumedVal) caloriesConsumedVal.textContent = consumedKcal.toLocaleString();
    if (caloriesTargetVal) caloriesTargetVal.textContent = targetKcal.toLocaleString();
    if (statConsumedKcal) statConsumedKcal.textContent = consumedKcal.toLocaleString();

    const netBalance = consumedKcal - this.profile.tdee;
    if (statSurplusStatus) {
      statSurplusStatus.textContent = `${netBalance >= 0 ? '+' : ''}${netBalance} kcal`;
      statSurplusStatus.className = `energy-num ${netBalance >= 0 ? 'color-cyan' : 'color-amber'}`;
    }

    const ring = document.getElementById('calorieProgressRing');
    if (ring) {
      const circumference = 2 * Math.PI * 95; // r=95 -> 596.9
      const pct = Math.min(1, consumedKcal / targetKcal);
      const offset = circumference - (pct * circumference);
      ring.style.strokeDashoffset = offset;
    }

    // Update Macros
    this.updateMacroRow('Protein', consumedP, targetP, 'g', 'macroProteinCurrent', 'macroProteinTarget', 'macroProteinPct', 'macroProteinBar');
    this.updateMacroRow('Carbs', consumedC, targetC, 'g', 'macroCarbsCurrent', 'macroCarbsTarget', 'macroCarbsPct', 'macroCarbsBar');
    this.updateMacroRow('Fats', consumedF, targetF, 'g', 'macroFatsCurrent', 'macroFatsTarget', 'macroFatsPct', 'macroFatsBar');
    this.updateMacroRow('Water', this.waterIntake, targetWater, 'L', 'macroWaterCurrent', 'macroWaterTarget', 'macroWaterPct', 'macroWaterBar');

    // Update dynamic coach tip on dashboard
    const proteinDiff = targetP - consumedP;
    const dailyCoachTipText = document.getElementById('dailyCoachTipText');
    if (dailyCoachTipText) {
      if (proteinDiff > 0) {
        dailyCoachTipText.innerHTML = `"You are <strong>${proteinDiff}g of protein</strong> away from optimal muscle growth for your <em>${this.profile.archetype}</em> blueprint. Consider Greek yogurt, whey isolate, or chicken breast for your next meal."`;
      } else {
        dailyCoachTipText.innerHTML = `"🏆 <strong>Protein target achieved!</strong> (${consumedP}g hit). Your muscles have maximal substrate for protein synthesis. Focus on hydration and restorative sleep tonight."`;
      }
    }

    // Render Logged Meals List
    this.renderLoggedMealsList();
  }

  updateMacroRow(label, current, target, unit, currId, targetId, pctId, barId) {
    const currEl = document.getElementById(currId);
    const targetEl = document.getElementById(targetId);
    const pctEl = document.getElementById(pctId);
    const barEl = document.getElementById(barId);

    const pct = Math.min(100, Math.round((current / target) * 100));

    if (currEl) currEl.textContent = typeof current === 'number' && current % 1 !== 0 ? current.toFixed(1) : current;
    if (targetEl) targetEl.textContent = `${target}${unit}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (barEl) barEl.style.width = `${pct}%`;
  }

  renderLoggedMealsList() {
    const container = document.getElementById('loggedMealsList');
    if (!container) return;

    if (this.loggedMeals.length === 0) {
      container.innerHTML = `
        <div class="empty-meals-card">
          <p>No meals logged today yet. Use the <strong>AI Meal Vision</strong> tab to snap or upload your first meal!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.loggedMeals.map(meal => `
      <div class="meal-log-card" data-id="${meal.id}">
        <button class="btn-delete-meal" onclick="app.deleteMeal('${meal.id}')" title="Delete meal">✕</button>
        ${meal.image ? `
          <img class="meal-card-thumb" src="${meal.image}" alt="${meal.name}" onerror="this.src='${meal.fallbackImage || ''}'">
        ` : `
          <div class="meal-card-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🥗</div>
        `}
        <div class="meal-card-details">
          <div class="meal-card-top">
            <span class="meal-tag-pill">${meal.category || 'Meal'}</span>
            <span class="meal-card-time">${meal.time || 'Logged'}</span>
          </div>
          <h4 class="meal-card-title">${meal.name}</h4>
          <div class="meal-card-macros-row">
            <span class="macro-badge-kcal">${meal.calories} kcal</span>
            <span class="macro-badge-p">${meal.protein}g P</span>
            <span class="macro-badge-c">${meal.carbs}g C</span>
            <span class="macro-badge-f">${meal.fats}g F</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ===================================================================
  // LEAGUE PROGRESSION & RANKING SYSTEM
  // ===================================================================

  getLeagueData() {
    const rp = this.leaguePoints;
    let currentLeague = LEAGUES[0];
    let nextLeague = LEAGUES[1];
    let leagueIndex = 0;

    for (let i = 0; i < LEAGUES.length; i++) {
      if (rp >= LEAGUES[i].minRP && rp <= LEAGUES[i].maxRP) {
        currentLeague = LEAGUES[i];
        nextLeague = LEAGUES[i + 1] || null;
        leagueIndex = i;
        break;
      }
    }

    if (rp > LEAGUES[LEAGUES.length - 1].maxRP) {
      currentLeague = LEAGUES[LEAGUES.length - 1];
      nextLeague = null;
      leagueIndex = LEAGUES.length - 1;
    }

    let pct = 100;
    let needed = 0;
    if (nextLeague) {
      const tierSpan = currentLeague.maxRP - currentLeague.minRP;
      const progressInTier = rp - currentLeague.minRP;
      pct = Math.min(100, Math.max(0, Math.round((progressInTier / tierSpan) * 100)));
      needed = nextLeague.minRP - rp;
    }

    return { currentLeague, nextLeague, pct, needed, leagueIndex, totalRP: rp };
  }

  addLeaguePoints(amount, reason) {
    const prevData = this.getLeagueData();
    this.leaguePoints += amount;
    this.saveStorage('aura_league_points', this.leaguePoints);

    const newData = this.getLeagueData();
    this.renderLeagueStatus();

    // Check for rank up!
    if (newData.leagueIndex > prevData.leagueIndex) {
      this.showToast(`🎉 RANK UP! Promoted to ${newData.currentLeague.name}!`);
    } else {
      this.showToast(`+${amount} RP earned: ${reason}`);
    }
  }

  renderLeagueStatus() {
    const data = this.getLeagueData();
    const { currentLeague, nextLeague, pct, needed, totalRP } = data;

    // Header Pill
    const hIcon = document.getElementById('headerLeagueIcon');
    const hName = document.getElementById('headerLeagueName');
    const hRP = document.getElementById('headerLeagueRP');
    if (hIcon) hIcon.textContent = currentLeague.icon;
    if (hName) hName.textContent = currentLeague.name.replace(' League', '');
    if (hRP) hRP.textContent = `${totalRP.toLocaleString()} RP`;

    // Dashboard Banner
    const dIcon = document.getElementById('dashLeagueIcon');
    const dTitle = document.getElementById('dashLeagueTitle');
    const dTier = document.getElementById('dashLeagueTier');
    const dSub = document.getElementById('dashLeagueSub');
    const dBarFill = document.getElementById('dashLeagueBarFill');

    if (dIcon) dIcon.textContent = currentLeague.icon;
    if (dTitle) dTitle.textContent = `${currentLeague.name} • ${totalRP.toLocaleString()} RP`;
    if (dTier) dTier.textContent = currentLeague.tier;
    if (dSub) {
      dSub.innerHTML = nextLeague 
        ? `Earn <strong>${needed.toLocaleString()} RP</strong> more by logging meals & finishing workouts to rank up to <strong>${nextLeague.name}</strong>!`
        : `🏆 You have attained the <strong>Pinnacle Grandmaster Rank</strong>. Infinite prestige!`;
    }
    if (dBarFill) dBarFill.style.width = `${pct}%`;

    // Leagues Page Hero
    const aCrest = document.getElementById('activeLeagueCrest');
    const aBadge = document.getElementById('activeLeagueTierBadge');
    const aTitle = document.getElementById('activeLeagueMainTitle');
    const aDesc = document.getElementById('activeLeagueMainDesc');
    const xCurr = document.getElementById('leagueXpCurrent');
    const xNext = document.getElementById('leagueXpNext');
    const xFill = document.getElementById('leagueXpFill');

    if (aCrest) aCrest.textContent = currentLeague.icon;
    if (aBadge) aBadge.textContent = currentLeague.tier;
    if (aTitle) aTitle.textContent = currentLeague.name;
    if (aDesc) aDesc.textContent = `${currentLeague.perk} • Maintained through disciplined daily calorie and workout logging.`;
    if (xCurr) xCurr.textContent = `${totalRP.toLocaleString()} RP`;
    if (xNext) xNext.textContent = nextLeague ? `Next: ${nextLeague.name} (${nextLeague.minRP.toLocaleString()} RP)` : 'Maximum Tier Reached';
    if (xFill) xFill.style.width = `${pct}%`;

    // Ladder Cards
    document.querySelectorAll('.ladder-card').forEach(card => {
      const rankKey = card.dataset.rank;
      const targetRank = LEAGUES.find(l => l.id === rankKey);
      if (!targetRank) return;

      const isCurrent = targetRank.id === currentLeague.id;
      const isUnlocked = totalRP >= targetRank.minRP;

      card.classList.toggle('current-rank', isCurrent);
      card.classList.toggle('unlocked', isUnlocked && !isCurrent);
      card.classList.toggle('locked', !isUnlocked);

      const tag = card.querySelector('.ladder-tag');
      if (tag) {
        if (isCurrent) {
          tag.className = 'ladder-tag current-tag';
          tag.textContent = 'Active Tier';
        } else if (isUnlocked) {
          tag.className = 'ladder-tag unlocked-tag';
          tag.textContent = 'Unlocked';
        } else {
          tag.className = 'ladder-tag locked-tag';
          const neededRank = targetRank.minRP - totalRP;
          tag.textContent = `${neededRank.toLocaleString()} RP Needed`;
        }
      }
    });
  }

  // ===================================================================
  // WORKOUTS & EXERCISE RECOMMENDER
  // ===================================================================

  renderWorkouts(dayKey) {
    this.currentWorkoutDay = dayKey;
    const routine = WORKOUT_ROUTINES[dayKey] || WORKOUT_ROUTINES.push;

    const titleEl = document.getElementById('currentWorkoutDayTitle');
    const focusEl = document.getElementById('currentWorkoutFocus');
    const archText = document.getElementById('workoutArchetypeText');
    const container = document.getElementById('exercisesListContainer');

    if (titleEl) titleEl.textContent = routine.title;
    if (focusEl) focusEl.textContent = `Target Focus: ${routine.focus}`;
    if (archText) archText.textContent = this.profile.archetype.toUpperCase();

    // Update active tab button
    document.querySelectorAll('.workout-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.day === dayKey);
    });

    if (!container) return;

    container.innerHTML = routine.exercises.map((ex, exIdx) => {
      const setsArr = Array.from({ length: ex.sets }, (_, i) => i + 1);

      return `
        <div class="exercise-card" data-idx="${exIdx}">
          <div class="exercise-card-head">
            <div class="exercise-title-group">
              <span class="exercise-muscle-tag">${ex.muscle}</span>
              <h4 class="exercise-name">${ex.name}</h4>
            </div>
            <span class="exercise-scheme">${ex.sets} Sets × ${ex.reps} (RPE ${ex.rpe})</span>
          </div>

          <p class="exercise-cues-text">💡 <strong>Coach Form Cue:</strong> ${ex.cues}</p>

          <div class="exercise-sets-row">
            <div class="sets-check-group">
              <span style="font-size:0.75rem;color:var(--text-dim);font-weight:700;">SETS:</span>
              ${setsArr.map(sNum => {
                const isChecked = this.completedSets[`${dayKey}_${exIdx}_${sNum}`];
                return `
                  <button type="button" class="set-check-btn ${isChecked ? 'checked' : ''}" 
                    onclick="app.toggleSet('${dayKey}', ${exIdx}, ${sNum})">
                    ${isChecked ? '✓' : '○'} Set ${sNum}
                  </button>
                `;
              }).join('')}
            </div>

            <div class="set-inputs-group">
              <input type="number" class="custom-input set-input-box" placeholder="kg" title="Weight used (kg)">
              <button type="button" class="btn-secondary-sm btn-rest-trigger" onclick="app.startRestTimer(75)">⏱️ Rest 75s</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  toggleSet(dayKey, exIdx, setNum) {
    const key = `${dayKey}_${exIdx}_${setNum}`;
    this.completedSets[key] = !this.completedSets[key];
    this.saveStorage('aura_completed_sets', this.completedSets);
    this.renderWorkouts(dayKey);
    this.showToast(`Set ${setNum} marked ${this.completedSets[key] ? 'complete! Great form.' : 'pending.'}`);
  }

  startRestTimer(seconds) {
    const timerBar = document.getElementById('restTimerBar');
    const countdown = document.getElementById('timerCountdown');
    const fill = document.getElementById('timerFill');

    if (!timerBar || !countdown || !fill) return;

    if (this.restTimerInterval) clearInterval(this.restTimerInterval);

    timerBar.classList.remove('hidden');
    let timeLeft = seconds;
    countdown.textContent = `${timeLeft}s`;
    fill.style.width = '100%';

    this.restTimerInterval = setInterval(() => {
      timeLeft--;
      countdown.textContent = `${timeLeft}s`;
      fill.style.width = `${(timeLeft / seconds) * 100}%`;

      if (timeLeft <= 0) {
        clearInterval(this.restTimerInterval);
        this.restTimerInterval = null;
        timerBar.classList.add('hidden');
        this.showToast('⏱️ Rest interval finished! Time for your next set.');
      }
    }, 1000);
  }

  stopRestTimer() {
    if (this.restTimerInterval) {
      clearInterval(this.restTimerInterval);
      this.restTimerInterval = null;
    }
    const timerBar = document.getElementById('restTimerBar');
    if (timerBar) timerBar.classList.add('hidden');
  }

  claimWorkoutRP() {
    if (this.workoutClaimedToday) {
      alert('You have already claimed your +150 RP for today\'s workout! Keep recovering.');
      return;
    }

    this.workoutClaimedToday = true;
    this.saveStorage('aura_workout_claimed', true);
    this.addLeaguePoints(150, "Completed Today's Recommended Workout");
    this.showToast('🏆 Workout Completed! +150 RP added to your League Rank.');
  }

  // ===================================================================
  // 5. AI VISION MEAL SCANNER & PRESETS
  // ===================================================================

  loadPreset(key) {
    const preset = PRESET_MEALS[key];
    if (!preset) return;

    this.activePresetKey = key;
    this.currentDetectedMeal = JSON.parse(JSON.stringify(preset));

    // Update active preset styling
    document.querySelectorAll('.preset-card').forEach(el => {
      el.classList.toggle('active', el.dataset.preset === key);
    });

    // Display image in viewport
    const previewImg = document.getElementById('previewImage');
    const dropzoneEmpty = document.getElementById('dropzoneEmpty');
    const cameraVideo = document.getElementById('cameraVideo');

    if (cameraVideo) cameraVideo.classList.add('hidden');
    if (dropzoneEmpty) dropzoneEmpty.classList.add('hidden');

    if (previewImg) {
      previewImg.classList.remove('hidden');
      previewImg.src = preset.image;
      previewImg.onerror = () => {
        if (preset.fallbackImage) previewImg.src = preset.fallbackImage;
      };
    }

    // Trigger visual laser animation
    this.triggerLaserScan(() => {
      this.renderDetectedMealData();
      this.renderBoundingBoxes(preset.boxes);
    });
  }

  triggerLaserScan(callback) {
    const laser = document.getElementById('scanningLaser');
    if (laser) {
      laser.classList.remove('hidden');
      setTimeout(() => {
        laser.classList.add('hidden');
        if (callback) callback();
      }, 700);
    } else if (callback) {
      callback();
    }
  }

  renderDetectedMealData() {
    if (!this.currentDetectedMeal) return;
    const m = this.currentDetectedMeal;

    // Calculate dynamic totals from ingredients list
    let totalKcal = 0;
    let totalP = 0;
    let totalC = 0;
    let totalF = 0;

    m.ingredients.forEach(ing => {
      totalKcal += Number(ing.kcal) || 0;
      totalP += Number(ing.protein) || 0;
      totalC += Number(ing.carbs) || 0;
      totalF += Number(ing.fats) || 0;
    });

    m.totalCalories = Math.round(totalKcal);
    m.protein = Math.round(totalP);
    m.carbs = Math.round(totalC);
    m.fats = Math.round(totalF);

    // Update UI elements
    const detectedMealTitle = document.getElementById('detectedMealTitle');
    const mealScoreVal = document.getElementById('mealScoreVal');
    const detectedTotalKcal = document.getElementById('detectedTotalKcal');
    const detectedProtein = document.getElementById('detectedProtein');
    const detectedCarbs = document.getElementById('detectedCarbs');
    const detectedFats = document.getElementById('detectedFats');
    const aiVerdictText = document.getElementById('aiVerdictText');

    if (detectedMealTitle) detectedMealTitle.textContent = m.title;
    if (mealScoreVal) mealScoreVal.textContent = m.score || 94;
    if (detectedTotalKcal) detectedTotalKcal.textContent = m.totalCalories;
    if (detectedProtein) detectedProtein.textContent = `${m.protein}g`;
    if (detectedCarbs) detectedCarbs.textContent = `${m.carbs}g`;
    if (detectedFats) detectedFats.textContent = `${m.fats}g`;
    if (aiVerdictText) aiVerdictText.textContent = m.verdict;

    // Render editable ingredients
    const list = document.getElementById('detectedIngredientsList');
    if (list) {
      list.innerHTML = m.ingredients.map((ing, idx) => `
        <div class="ing-item-row" data-index="${idx}">
          <div class="ing-name-col">
            <span class="ing-item-name">${ing.name}</span>
            <span class="ing-item-sub">${ing.kcal} kcal • ${ing.protein}g P • ${ing.carbs}g C • ${ing.fats}g F</span>
          </div>
          <div class="ing-slider-col">
            <input type="range" class="ing-slider" min="20" max="400" value="${ing.weight}" 
              oninput="app.updateIngredientWeight(${idx}, this.value)">
            <span class="ing-weight-display">${ing.weight}g</span>
          </div>
        </div>
      `).join('');
    }
  }

  updateIngredientWeight(index, newWeight) {
    if (!this.currentDetectedMeal || !this.currentDetectedMeal.ingredients[index]) return;
    const ing = this.currentDetectedMeal.ingredients[index];
    const prevWeight = ing.weight || 100;
    const factor = Number(newWeight) / prevWeight;

    ing.weight = Math.round(Number(newWeight));
    ing.kcal = Math.round(ing.kcal * factor);
    ing.protein = Math.round(ing.protein * factor);
    ing.carbs = Math.round(ing.carbs * factor);
    ing.fats = Math.round(ing.fats * factor);

    this.renderDetectedMealData();
  }

  renderBoundingBoxes(boxes) {
    const overlay = document.getElementById('boundingOverlay');
    if (!overlay) return;

    overlay.innerHTML = '';
    if (!boxes || boxes.length === 0) return;

    boxes.forEach(b => {
      const boxEl = document.createElement('div');
      boxEl.className = 'food-box-tag';
      boxEl.style.top = `${b.top}%`;
      boxEl.style.left = `${b.left}%`;
      boxEl.style.width = `${b.width}%`;
      boxEl.style.height = `${b.height}%`;

      const labelEl = document.createElement('div');
      labelEl.className = 'food-box-label';
      labelEl.textContent = b.label;

      boxEl.appendChild(labelEl);
      overlay.appendChild(boxEl);
    });
  }

  // ===================================================================
  // 6. PHOTO UPLOAD & LIVE CAMERA HANDLERS
  // ===================================================================

  handleFileUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      this.displayCustomPhoto(dataUrl);

      // Check if Gemini API key exists
      if (this.settings.apiKey) {
        this.analyzeWithGeminiVision(dataUrl);
      } else {
        this.analyzeWithNeuralHeuristics(dataUrl, file.name);
      }
    };
    reader.readAsDataURL(file);
  }

  displayCustomPhoto(dataUrl) {
    const previewImg = document.getElementById('previewImage');
    const dropzoneEmpty = document.getElementById('dropzoneEmpty');
    const cameraVideo = document.getElementById('cameraVideo');

    if (cameraVideo) cameraVideo.classList.add('hidden');
    if (dropzoneEmpty) dropzoneEmpty.classList.add('hidden');
    if (previewImg) {
      previewImg.classList.remove('hidden');
      previewImg.src = dataUrl;
    }

    document.querySelectorAll('.preset-card').forEach(el => el.classList.remove('active'));
  }

  startCamera() {
    const video = document.getElementById('cameraVideo');
    const dropzoneEmpty = document.getElementById('dropzoneEmpty');
    const previewImg = document.getElementById('previewImage');
    const controls = document.getElementById('cameraControls');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera access is not supported by your browser in this context.');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.cameraStream = stream;
        if (video) {
          video.srcObject = stream;
          video.classList.remove('hidden');
        }
        if (dropzoneEmpty) dropzoneEmpty.classList.add('hidden');
        if (previewImg) previewImg.classList.add('hidden');
        if (controls) controls.classList.remove('hidden');
      })
      .catch(err => {
        console.warn('Camera error:', err);
        alert('Could not access camera: ' + err.message);
      });
  }

  stopCamera() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    const video = document.getElementById('cameraVideo');
    const controls = document.getElementById('cameraControls');
    if (video) video.classList.add('hidden');
    if (controls) controls.classList.add('hidden');
  }

  snapPhoto() {
    const video = document.getElementById('cameraVideo');
    if (!video || !this.cameraStream) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    this.stopCamera();
    this.displayCustomPhoto(dataUrl);

    if (this.settings.apiKey) {
      this.analyzeWithGeminiVision(dataUrl);
    } else {
      this.analyzeWithNeuralHeuristics(dataUrl, 'Live Camera Snapshot');
    }
  }

  // Dual AI Mode: Real Gemini API
  async analyzeWithGeminiVision(base64DataUrl) {
    this.triggerLaserScan();
    const engineBadge = document.getElementById('visionEngineLabel');
    if (engineBadge) engineBadge.textContent = 'Analyzing via Gemini Vision API...';

    const base64Content = base64DataUrl.split(',')[1];
    const apiKey = this.settings.apiKey;
    const model = this.settings.model || 'gemini-1.5-flash';

    const prompt = `Analyze this meal photo for a serious fitness/bodybuilding athlete.
Identify the food items, estimated gram weights, calories, protein, carbohydrates, fats, and an overall physique score (1-100).
Return ONLY a valid JSON object matching this exact schema, with no markdown fences, no code blocks:
{
  "title": "Descriptive Meal Name",
  "score": 92,
  "verdict": "Athletic nutrition appraisal and nutrient timing advice.",
  "ingredients": [
    { "name": "Item Name", "weight": 150, "kcal": 220, "protein": 30, "carbs": 10, "fats": 5 }
  ],
  "boxes": [
    { "top": 20, "left": 25, "width": 30, "height": 35, "label": "Food Item (150g)" }
  ]
}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: 'image/jpeg', data: base64Content } }
            ]
          }]
        })
      });

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      this.currentDetectedMeal = {
        title: parsed.title || 'AI Analyzed Meal',
        image: base64DataUrl,
        score: parsed.score || 90,
        verdict: parsed.verdict || 'Balanced fitness meal with quality macros.',
        ingredients: parsed.ingredients || [],
        boxes: parsed.boxes || []
      };

      if (engineBadge) engineBadge.textContent = 'Gemini Vision (Live)';
      this.renderDetectedMealData();
      this.renderBoundingBoxes(this.currentDetectedMeal.boxes);
      this.showToast('AI Meal Analysis Complete via Gemini!');
    } catch (err) {
      console.error('Gemini API call failed:', err);
      if (engineBadge) engineBadge.textContent = 'Neural Vision (Fallback)';
      this.analyzeWithNeuralHeuristics(base64DataUrl, 'Custom Meal');
      this.showToast('Using Neural Engine (API key check failed)');
    }
  }

  // Built-in intelligent heuristic engine (Offline/Demonstration)
  analyzeWithNeuralHeuristics(dataUrl, hintName) {
    this.triggerLaserScan(() => {
      const engineBadge = document.getElementById('visionEngineLabel');
      if (engineBadge) engineBadge.textContent = 'Neural Vision Engine';

      const customMeal = {
        title: hintName && !hintName.includes('Snapshot') ? `Custom Analyzed: ${hintName.replace(/\.[^/.]+$/, "")}` : 'Custom Athletic Nutrition Plate',
        image: dataUrl,
        score: 93,
        verdict: `High nutritional density aligned with your ${this.profile.archetype} protocol. High satiety index and complete amino acid profile.`,
        ingredients: [
          { name: 'Lean Protein Core (Poultry/Fish/Steak)', weight: 190, kcal: 340, protein: 44, carbs: 0, fats: 8 },
          { name: 'Complex Carbohydrate Base (Grains/Tuber)', weight: 160, kcal: 190, protein: 5, carbs: 40, fats: 2 },
          { name: 'Fibrous Greens & Healthy Lipids', weight: 80, kcal: 70, protein: 2, carbs: 6, fats: 5 }
        ],
        boxes: [
          { top: 25, left: 20, width: 35, height: 40, label: 'Protein Source (190g)' },
          { top: 35, left: 55, width: 30, height: 35, label: 'Carb Base (160g)' }
        ]
      };

      this.currentDetectedMeal = customMeal;
      this.renderDetectedMealData();
      this.renderBoundingBoxes(customMeal.boxes);
      this.showToast('Meal successfully analyzed by Neural Engine!');
    });
  }

  logDetectedMeal() {
    if (!this.currentDetectedMeal) return;

    const categorySelect = document.getElementById('mealCategorySelect');
    const category = categorySelect ? categorySelect.value : 'Lunch';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMeal = {
      id: 'meal_' + Date.now(),
      name: this.currentDetectedMeal.title,
      category: category,
      time: timeStr,
      calories: this.currentDetectedMeal.totalCalories,
      protein: this.currentDetectedMeal.protein,
      carbs: this.currentDetectedMeal.carbs,
      fats: this.currentDetectedMeal.fats,
      image: this.currentDetectedMeal.image,
      fallbackImage: this.currentDetectedMeal.fallbackImage || '',
      score: this.currentDetectedMeal.score
    };

    this.loggedMeals.push(newMeal);
    this.saveStorage('aura_meals', this.loggedMeals);

    // Award League Points for meal photo tracking!
    this.addLeaguePoints(50, `Whole Day Meal Logged (${category})`);

    this.renderDashboard();
    this.showToast(`Logged "${newMeal.name}" to ${category}! (+50 RP)`);

    // Switch view to dashboard so user sees updated progress
    this.switchTab('dashboard');
  }

  deleteMeal(id) {
    this.loggedMeals = this.loggedMeals.filter(m => m.id !== id);
    this.saveStorage('aura_meals', this.loggedMeals);
    this.renderDashboard();
    this.showToast('Meal deleted.');
  }

  addWater(ml) {
    const litersToAdd = ml / 1000;
    this.waterIntake = parseFloat((this.waterIntake + litersToAdd).toFixed(2));
    this.saveStorage('aura_water', this.waterIntake);
    this.renderDashboard();
    this.showToast(`Added +${ml}ml water. Keep hydrated!`);
  }

  // ===================================================================
  // 7. PHYSIQUE ARCHITECT CONTROLS
  // ===================================================================

  renderPhysiqueForm() {
    const p = this.profile;
    const genderEl = document.getElementById('bioGender');
    const ageEl = document.getElementById('bioAge');
    const heightEl = document.getElementById('bioHeight');
    const weightEl = document.getElementById('bioWeight');
    const targetWeightEl = document.getElementById('bioTargetWeight');
    const bodyFatEl = document.getElementById('bioBodyFat');
    const activityEl = document.getElementById('bioActivity');
    const splitEl = document.getElementById('bioWorkoutSplit');

    if (genderEl) genderEl.value = p.gender;
    if (ageEl) ageEl.value = p.age;
    if (heightEl) heightEl.value = p.height;
    if (weightEl) weightEl.value = p.weight;
    if (targetWeightEl) targetWeightEl.value = p.targetWeight;
    if (bodyFatEl) bodyFatEl.value = p.bodyFat;
    if (activityEl) activityEl.value = p.activity;
    if (splitEl) splitEl.value = p.split;

    // Set active archetype card
    document.querySelectorAll('.archetype-card').forEach(card => {
      const isAct = card.dataset.archetype === p.archetype;
      card.classList.toggle('active', isAct);
      const footerStatus = card.querySelector('.archetype-select-status');
      if (footerStatus) footerStatus.textContent = isAct ? 'Active Blueprint' : 'Select Blueprint';
    });

    this.updateBlueprintDisplay();
  }

  updateBlueprintDisplay() {
    const p = this.profile;
    const arch = ARCHETYPES_CONFIG[p.archetype] || ARCHETYPES_CONFIG.hypertrophy;

    const calcDailyCalories = document.getElementById('calcDailyCalories');
    const calcSurplusDeficitText = document.getElementById('calcSurplusDeficitText');
    const calcProtein = document.getElementById('calcProtein');
    const calcProteinPerKg = document.getElementById('calcProteinPerKg');
    const calcCarbs = document.getElementById('calcCarbs');
    const calcFats = document.getElementById('calcFats');
    const calcWater = document.getElementById('calcWater');
    const calcTimelineBox = document.getElementById('calcTimelineBox');
    const calcSplitAdvice = document.getElementById('calcSplitAdvice');

    if (calcDailyCalories) calcDailyCalories.textContent = p.targetCalories.toLocaleString();
    if (calcSurplusDeficitText) {
      const sign = arch.calorieDelta > 0 ? '+' : '';
      calcSurplusDeficitText.textContent = `${sign}${arch.calorieDelta} kcal ${arch.name} vs ${p.tdee} TDEE`;
    }
    if (calcProtein) calcProtein.textContent = `${p.targetProtein}g`;
    if (calcProteinPerKg) calcProteinPerKg.textContent = `${arch.proteinPerKg}g / kg`;
    if (calcCarbs) calcCarbs.textContent = `${p.targetCarbs}g`;
    if (calcFats) calcFats.textContent = `${p.targetFats}g`;
    if (calcWater) calcWater.textContent = `${p.targetWater} L`;

    // Projected Timeline calculation
    const weightDiff = p.targetWeight - p.weight;
    if (calcTimelineBox) {
      if (Math.abs(weightDiff) < 0.2) {
        calcTimelineBox.innerHTML = `You are currently at your target weight (${p.weight} kg). Focused on <strong>recomposition, neuromuscular strength, and muscle density</strong>.`;
      } else if (weightDiff > 0) {
        const weeks = Math.round(weightDiff / 0.3);
        calcTimelineBox.innerHTML = `Target: Gain <strong>${weightDiff.toFixed(1)} kg</strong> of lean muscle mass. At a controlled hypertrophy rate of ~0.3 kg/week, your projected timeline is <strong>${weeks} to ${weeks + 2} weeks</strong>.`;
      } else {
        const weeks = Math.round(Math.abs(weightDiff) / 0.6);
        calcTimelineBox.innerHTML = `Target: Lose <strong>${Math.abs(weightDiff).toFixed(1)} kg</strong> of fat tissue. At a safe preservation cut rate of ~0.6 kg/week, your projected timeline is <strong>${weeks} to ${weeks + 1} weeks</strong>.`;
      }
    }

    if (calcSplitAdvice) {
      calcSplitAdvice.innerHTML = `<strong>Physique Guidance:</strong> ${arch.advice} <br><strong>Routine Split:</strong> ${arch.splitTip}`;
    }
  }

  setArchetype(newArchetype) {
    if (!ARCHETYPES_CONFIG[newArchetype]) return;
    this.profile.archetype = newArchetype;
    this.calculateBiometrics();
    this.renderHeader();
    this.renderPhysiqueForm();
    this.renderDashboard();
    this.showToast(`Active Blueprint updated to ${ARCHETYPES_CONFIG[newArchetype].name}!`);
  }

  // ===================================================================
  // 8. PROGRESS CHARTS & COMPARISON SLIDER
  // ===================================================================

  renderWeightChart() {
    const svg = document.getElementById('weightTrendSvg');
    if (!svg) return;

    const data = this.weightTrend;
    const width = 600;
    const height = 240;
    const padding = { top: 30, right: 30, bottom: 40, left: 45 };

    const minWeight = Math.min(...data.map(d => d.weight)) - 1;
    const maxWeight = Math.max(...data.map(d => d.weight), this.profile.targetWeight) + 1;

    const getX = (idx) => padding.left + (idx / (data.length - 1)) * (width - padding.left - padding.right);
    const getY = (val) => height - padding.bottom - ((val - minWeight) / (maxWeight - minWeight)) * (height - padding.top - padding.bottom);

    // Build SVG Path
    let pathD = '';
    let areaD = '';

    data.forEach((pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.weight);
      if (idx === 0) {
        pathD += `M ${x} ${y}`;
        areaD += `M ${x} ${height - padding.bottom} L ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
        areaD += ` L ${x} ${y}`;
      }
    });

    areaD += ` L ${getX(data.length - 1)} ${height - padding.bottom} Z`;

    // Target Goal Line
    const targetY = getY(this.profile.targetWeight);

    svg.innerHTML = `
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#00F2FE" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Target Goal Line -->
      <line x1="${padding.left}" y1="${targetY}" x2="${width - padding.right}" y2="${targetY}" 
        stroke="#4FACFE" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6"/>
      <text x="${width - padding.right}" y="${targetY - 6}" fill="#4FACFE" font-size="11" text-anchor="end" font-weight="600">Goal: ${this.profile.targetWeight}kg</text>

      <!-- Grid lines -->
      <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(255,255,255,0.08)"/>

      <!-- Area fill -->
      <path d="${areaD}" fill="url(#chartGrad)"/>

      <!-- Trend line -->
      <path d="${pathD}" fill="none" stroke="#00F2FE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Data Dots -->
      ${data.map((pt, idx) => `
        <circle cx="${getX(idx)}" cy="${getY(pt.weight)}" r="4" fill="#07090E" stroke="#00F2FE" stroke-width="2.5"/>
        <text x="${getX(idx)}" y="${height - padding.bottom + 20}" fill="#9CA3AF" font-size="11" text-anchor="middle">${pt.day}</text>
        <text x="${getX(idx)}" y="${getY(pt.weight) - 8}" fill="#FFFFFF" font-size="10.5" font-weight="700" text-anchor="middle">${pt.weight}</text>
      `).join('')}
    `;

    const currentLoggedWeight = document.getElementById('currentLoggedWeight');
    const targetGoalWeight = document.getElementById('targetGoalWeight');
    if (currentLoggedWeight) currentLoggedWeight.textContent = `${this.profile.weight} kg`;
    if (targetGoalWeight) targetGoalWeight.textContent = `${this.profile.targetWeight} kg`;
  }

  logWeight(newWeight) {
    const val = parseFloat(newWeight);
    if (isNaN(val) || val <= 30) return;

    this.profile.weight = val;
    this.calculateBiometrics();

    // Append to trend
    this.weightTrend[this.weightTrend.length - 1].weight = val;
    this.saveStorage('aura_weight_trend', this.weightTrend);

    this.renderHeader();
    this.renderDashboard();
    this.renderPhysiqueForm();
    this.renderWeightChart();
    this.showToast(`Logged today's weight: ${val} kg`);
  }

  // ===================================================================
  // 9. AI PHYSIQUE COACH CHAT ENGINE
  // ===================================================================

  renderCoachWelcome() {
    const container = document.getElementById('coachMessagesContainer');
    if (!container) return;
    // Welcome message already in HTML
  }

  async sendCoachMessage(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    this.appendChatMessage('user', cleanText);

    const input = document.getElementById('coachInputText');
    if (input) input.value = '';

    // Generate response
    if (this.settings.apiKey) {
      await this.getGeminiCoachResponse(cleanText);
    } else {
      this.getSimulatedCoachResponse(cleanText);
    }
  }

  appendChatMessage(sender, text) {
    const container = document.getElementById('coachMessagesContainer');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    msgDiv.innerHTML = `
      <div class="message-bubble">
        <p>${text.replace(/\n/g, '<br>')}</p>
      </div>
      <span class="msg-timestamp">Just now</span>
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
  }

  getSimulatedCoachResponse(userQuery) {
    // Generate context-aware coaching response
    let consumedP = 0;
    this.loggedMeals.forEach(m => consumedP += Number(m.protein) || 0);
    const pRemaining = Math.max(0, this.profile.targetProtein - consumedP);
    const qLower = userQuery.toLowerCase();

    let reply = '';

    if (qLower.includes('protein') || qLower.includes('tonight') || qLower.includes('dinner')) {
      if (pRemaining > 0) {
        reply = `You currently need **${pRemaining}g more protein** to hit your daily hyper-growth target of ${this.profile.targetProtein}g.\n\nHere are top physique options for dinner tonight:\n• **200g Grilled Chicken Breast** (~46g Protein, 280 kcal)\n• **220g Sirloin Steak or Lean Ground Beef** (~48g Protein, 420 kcal)\n• **1.5 cups Low-Fat Greek Yogurt + Scoop Whey** (~45g Protein, 310 kcal)`;
      } else {
        reply = `You've already surpassed your protein target for today with **${consumedP}g consumed**! For dinner, keep it moderate in protein (~25g) and emphasize complex carbohydrates and cruciferous vegetables for muscle glycogen replenishment.`;
      }
    } else if (qLower.includes('pre-workout') || qLower.includes('pump') || qLower.includes('timing')) {
      reply = `For maximum workout power and cellular muscle swelling:\n\n1. **60-90 mins prior**: 40-50g easily digestible carbs (Cream of rice, oatmeal, or bananas) + 25-30g lean protein.\n2. **Hydration**: Drink 500-750ml water with a pinch of pink Himalayan sea salt to maximize muscular intracellular hydration and blood volumization.`;
    } else if (qLower.includes('plateau') || qLower.includes('hypertrophy') || qLower.includes('growth')) {
      reply = `To break an anabolic plateau on your **${this.profile.archetype}** blueprint:\n\n1. **Micro-Progressive Overload**: Aim for just 1 extra repetition or +1kg on compound lifts per week.\n2. **Caloric Audit**: Add +150-200 kcal clean carbohydrates on training days.\n3. **Sleep**: Prioritize 7.5 to 8.5 hours of uninterrupted sleep; that is when 80%+ of growth hormone is secreted.`;
    } else if (qLower.includes('evaluate') || qLower.includes('today') || qLower.includes('macros')) {
      let totalKcal = 0;
      this.loggedMeals.forEach(m => totalKcal += Number(m.calories) || 0);
      const kcalDiff = this.profile.targetCalories - totalKcal;
      reply = `**Today's Physique Nutrition Evaluation:**\n\n• **Energy Status**: ${totalKcal} kcal consumed out of ${this.profile.targetCalories} kcal (${kcalDiff} kcal remaining).\n• **Protein Consistency**: ${consumedP}g / ${this.profile.targetProtein}g.\n• **Readiness Verdict**: Excellent macro partition! You are on pace for clean tissue synthesis without excess adipose storage.`;
    } else {
      reply = `Under your **${this.profile.archetype}** blueprint, prioritize hitting your daily target of **${this.profile.targetCalories} kcal** and **${this.profile.targetProtein}g protein**.\n\nKeep logged meals consistent, stay hydrated with 3.5L of water, and ensure your training intensity reaches 1-3 Reps in Reserve (RIR). What other physique questions can I answer for you?`;
    }

    setTimeout(() => {
      this.appendChatMessage('coach', reply);
    }, 600);
  }

  async getGeminiCoachResponse(userQuery) {
    const apiKey = this.settings.apiKey;
    const model = this.settings.model || 'gemini-1.5-flash';

    let consumedKcal = 0;
    let consumedP = 0;
    this.loggedMeals.forEach(m => {
      consumedKcal += Number(m.calories) || 0;
      consumedP += Number(m.protein) || 0;
    });

    const systemPrompt = `You are Aura AI, an elite sports science nutritionist and physique transformation coach.
The user's stats:
- Archetype Goal: ${this.profile.archetype}
- Weight: ${this.profile.weight}kg, Target: ${this.profile.targetWeight}kg
- Target Calories: ${this.profile.targetCalories} kcal (Consumed today: ${consumedKcal} kcal)
- Target Protein: ${this.profile.targetProtein}g (Consumed today: ${consumedP}g)
- Target Carbs: ${this.profile.targetCarbs}g, Fats: ${this.profile.targetFats}g
Provide concise, science-backed, motivating advice tailored to their exact numbers.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userQuery}` }] }
          ]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Keep pushing towards your physique goals!';
      this.appendChatMessage('coach', reply);
    } catch (err) {
      console.warn('Gemini coach error:', err);
      this.getSimulatedCoachResponse(userQuery);
    }
  }

  // ===================================================================
  // 10. EVENT BINDINGS & UI CONTROLS
  // ===================================================================

  bindEvents() {
    // Desktop Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Mobile Bottom Navigation Tabs (Phones)
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Header League Pill Click
    const headerLeaguePill = document.getElementById('headerLeaguePill');
    if (headerLeaguePill) {
      headerLeaguePill.addEventListener('click', () => this.switchTab('leagues'));
    }

    // Workout Day Switcher Tabs
    document.querySelectorAll('.workout-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.renderWorkouts(btn.dataset.day);
      });
    });

    // Claim Workout RP Button
    const btnClaimWorkoutRP = document.getElementById('btnClaimWorkoutRP');
    if (btnClaimWorkoutRP) {
      btnClaimWorkoutRP.addEventListener('click', () => this.claimWorkoutRP());
    }

    // Stop Rest Timer Button
    const stopTimerBtn = document.getElementById('stopTimerBtn');
    if (stopTimerBtn) {
      stopTimerBtn.addEventListener('click', () => this.stopRestTimer());
    }

    // Header Quick Scan Button
    const quickScanHeaderBtn = document.getElementById('quickScanHeaderBtn');
    if (quickScanHeaderBtn) {
      quickScanHeaderBtn.addEventListener('click', () => this.switchTab('scanner'));
    }

    const btnOpenScanFromDash = document.getElementById('btnOpenScanFromDash');
    if (btnOpenScanFromDash) {
      btnOpenScanFromDash.addEventListener('click', () => this.switchTab('scanner'));
    }

    const activeArchetypeBadge = document.getElementById('activeArchetypeBadge');
    if (activeArchetypeBadge) {
      activeArchetypeBadge.addEventListener('click', () => this.switchTab('physique'));
    }

    // Presets Click
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        this.loadPreset(card.dataset.preset);
      });
    });

    // File Input & Drag and Drop
    const fileInput = document.getElementById('mealFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFileUpload(e.target.files[0]);
        }
      });
    }

    const dropArea = document.getElementById('imageDropArea');
    if (dropArea) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropArea.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropArea.classList.remove('drag-over');
        });
      });
      dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt.files && dt.files[0]) {
          this.handleFileUpload(dt.files[0]);
        }
      });
    }

    // Camera Buttons
    const startCameraBtn = document.getElementById('startCameraBtn');
    if (startCameraBtn) startCameraBtn.addEventListener('click', () => this.startCamera());

    const cancelCameraBtn = document.getElementById('cancelCameraBtn');
    if (cancelCameraBtn) cancelCameraBtn.addEventListener('click', () => this.stopCamera());

    const snapPhotoBtn = document.getElementById('snapPhotoBtn');
    if (snapPhotoBtn) snapPhotoBtn.addEventListener('click', () => this.snapPhoto());

    // Log Detected Meal Button
    const btnLogDetectedMeal = document.getElementById('btnLogDetectedMeal');
    if (btnLogDetectedMeal) {
      btnLogDetectedMeal.addEventListener('click', () => this.logDetectedMeal());
    }

    // Archetype Cards Click
    document.querySelectorAll('.archetype-card').forEach(card => {
      card.addEventListener('click', () => {
        this.setArchetype(card.dataset.archetype);
      });
    });

    // Biometrics Form Submit
    const physiqueForm = document.getElementById('physiqueForm');
    if (physiqueForm) {
      physiqueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.profile.gender = document.getElementById('bioGender').value;
        this.profile.age = Number(document.getElementById('bioAge').value);
        this.profile.height = Number(document.getElementById('bioHeight').value);
        this.profile.weight = Number(document.getElementById('bioWeight').value);
        this.profile.targetWeight = Number(document.getElementById('bioTargetWeight').value);
        this.profile.bodyFat = Number(document.getElementById('bioBodyFat').value);
        this.profile.activity = Number(document.getElementById('bioActivity').value);
        this.profile.split = document.getElementById('bioWorkoutSplit').value;

        this.calculateBiometrics();
        this.renderHeader();
        this.renderDashboard();
        this.renderPhysiqueForm();
        this.renderWeightChart();
        this.showToast('Physique targets recalculated and applied!');
      });
    }

    // Weight Measurement Form Submit
    const measurementForm = document.getElementById('measurementForm');
    if (measurementForm) {
      measurementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('logNewWeight');
        if (input && input.value) {
          this.logWeight(input.value);
          input.value = '';
        }
      });
    }

    // Photo Comparison Slider
    const compSlider = document.getElementById('comparisonSlider');
    const sliderAfter = document.getElementById('sliderAfter');
    const sliderHandle = document.getElementById('sliderHandle');
    if (compSlider && sliderAfter && sliderHandle) {
      compSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        sliderAfter.style.width = `${val}%`;
        sliderHandle.style.left = `${val}%`;
      });
    }

    // AI Coach Chat Submit
    const coachChatForm = document.getElementById('coachChatForm');
    if (coachChatForm) {
      coachChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('coachInputText');
        if (input) this.sendCoachMessage(input.value);
      });
    }

    // Coach Prompt Chips Click
    document.querySelectorAll('.coach-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.sendCoachMessage(chip.dataset.prompt);
      });
    });

    const btnAskCoachFast = document.getElementById('btnAskCoachFast');
    if (btnAskCoachFast) {
      btnAskCoachFast.addEventListener('click', () => {
        this.switchTab('coach');
        this.sendCoachMessage('What should I eat for dinner to hit my remaining protein target?');
      });
    }

    // Manual Meal Modal
    const btnLogManualMeal = document.getElementById('btnLogManualMeal');
    const manualMealModal = document.getElementById('manualMealModal');
    const closeManualMealBtn = document.getElementById('closeManualMealBtn');
    const manualMealForm = document.getElementById('manualMealForm');

    if (btnLogManualMeal && manualMealModal) {
      btnLogManualMeal.addEventListener('click', () => manualMealModal.classList.remove('hidden'));
    }
    if (closeManualMealBtn && manualMealModal) {
      closeManualMealBtn.addEventListener('click', () => manualMealModal.classList.add('hidden'));
    }
    if (manualMealForm) {
      manualMealForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('manualMealName').value;
        const cat = document.getElementById('manualMealCategory').value;
        const kcal = Number(document.getElementById('manualCalories').value);
        const p = Number(document.getElementById('manualProtein').value);
        const c = Number(document.getElementById('manualCarbs').value);
        const f = Number(document.getElementById('manualFats').value);

        const now = new Date();
        const newMeal = {
          id: 'manual_' + Date.now(),
          name,
          category: cat,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          calories: kcal,
          protein: p,
          carbs: c,
          fats: f,
          score: 90
        };

        this.loggedMeals.push(newMeal);
        this.saveStorage('aura_meals', this.loggedMeals);
        this.renderDashboard();
        manualMealModal.classList.add('hidden');
        manualMealForm.reset();
        this.showToast(`Logged "${name}" to today's tracker!`);
      });
    }

    // Reset Day Button
    const clearDemoDataBtn = document.getElementById('clearDemoDataBtn');
    if (clearDemoDataBtn) {
      clearDemoDataBtn.addEventListener('click', () => {
        if (confirm('Clear today\'s logged meals?')) {
          this.loggedMeals = [];
          this.waterIntake = 0;
          this.saveStorage('aura_meals', this.loggedMeals);
          this.saveStorage('aura_water', this.waterIntake);
          this.renderDashboard();
          this.showToast('Today\'s meals reset.');
        }
      });
    }

    // Settings Modal
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const apiKeyInput = document.getElementById('geminiApiKeyInput');
    const modelSelect = document.getElementById('geminiModelSelect');
    const toggleEye = document.getElementById('toggleApiKeyVisibility');
    const testApiBtn = document.getElementById('testApiConnectionBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    const resetAllDataBtn = document.getElementById('resetAllDataBtn');

    if (openSettingsBtn && settingsModal) {
      openSettingsBtn.addEventListener('click', () => {
        if (apiKeyInput) apiKeyInput.value = this.settings.apiKey || '';
        if (modelSelect) modelSelect.value = this.settings.model || 'gemini-1.5-flash';
        settingsModal.classList.remove('hidden');
      });
    }
    if (closeSettingsBtn && settingsModal) {
      closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    }
    if (toggleEye && apiKeyInput) {
      toggleEye.addEventListener('click', () => {
        apiKeyInput.type = apiKeyInput.type === 'password' ? 'text' : 'password';
      });
    }
    if (testApiBtn) {
      testApiBtn.addEventListener('click', async () => {
        const key = apiKeyInput ? apiKeyInput.value.trim() : '';
        const status = document.getElementById('apiStatusDisplay');
        if (!key) {
          if (status) status.textContent = 'Please enter an API key first.';
          return;
        }
        if (status) status.textContent = 'Verifying key with Gemini API...';
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
          if (res.ok) {
            if (status) status.innerHTML = '<span style="color:#10B981">✓ Valid API Key!</span>';
          } else {
            if (status) status.innerHTML = '<span style="color:#F43F5E">✕ Invalid API Key</span>';
          }
        } catch (e) {
          if (status) status.innerHTML = '<span style="color:#F43F5E">✕ Connection error</span>';
        }
      });
    }
    if (saveSettingsBtn && settingsModal) {
      saveSettingsBtn.addEventListener('click', () => {
        if (apiKeyInput) this.settings.apiKey = apiKeyInput.value.trim();
        if (modelSelect) this.settings.model = modelSelect.value;
        this.saveStorage('aura_settings', this.settings);
        settingsModal.classList.add('hidden');
        this.showToast('Settings saved successfully.');
      });
    }

    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => {
        const payload = {
          profile: this.profile,
          loggedMeals: this.loggedMeals,
          weightTrend: this.weightTrend
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AuraSculpt_Data_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
      });
    }

    if (resetAllDataBtn) {
      resetAllDataBtn.addEventListener('click', () => {
        if (confirm('Factory reset all data to default demonstration state?')) {
          localStorage.clear();
          window.location.reload();
        }
      });
    }
  }

  switchTab(tabId) {
    // Desktop Nav buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Mobile Bottom Nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `pane-${tabId}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const text = document.getElementById('toastMessage');
    if (!toast || !text) return;

    text.textContent = msg;
    toast.classList.remove('hidden');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }
}

// Global instance initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new AuraSculptApp();
});
