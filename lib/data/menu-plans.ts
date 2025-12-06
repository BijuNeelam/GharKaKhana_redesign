/**
 * Menu Plans Data
 * Professional menu plan definitions with pricing and features
 */

import { MenuPlan } from '@/lib/types/payment';

export const MENU_PLANS: MenuPlan[] = [
  {
    id: 'veg-normal',
    name: 'Veg Normal',
    type: 'veg',
    category: 'normal',
    description: 'Complete vegetarian meal with chapati, rice, bhaji, dal/kadi, and salad',
    pricePerMeal: 79,
    weeklyPrice: 474,
    monthlyPrice: 1925,
    features: [
      'Chapathis',
      'Rice',
      'Bhaji',
      'Dal/Kadi',
      'Salad'
    ],
    isAvailable: true,
    imageUrl: '/images/veg-normal.jpg'
  },
  {
    id: 'veg-special',
    name: 'Veg Special',
    type: 'veg',
    category: 'special',
    description: 'Premium vegetarian meal with additional dessert, sweets, or double salad',
    pricePerMeal: 89,
    weeklyPrice: 534,
    monthlyPrice: 2175,
    features: [
      'Chapathis (May be combined)',
      'Rice',
      'Bhaji',
      'Dal/Kadi',
      'Dessert-Sweets/Double-Salad/Papad-Or-Pickle',
      'Compliment'
    ],
    isPopular: true,
    isAvailable: true,
    imageUrl: '/images/veg-special.jpg'
  },
  {
    id: 'combo-normal',
    name: 'Combo Normal',
    type: 'combo',
    category: 'normal',
    description: 'Mixed meal plan with 2 days chicken (Wed & Fri) and 4 days vegetarian',
    pricePerMeal: 84,
    // Updated as per latest pricing sheet
    weeklyPrice: 546,
    monthlyPrice: 2205,
    features: [
      'Chapathi',
      'Rice',
      'Wednesday & Friday - Chicken Masala Curry',
      'Remaining Days - Veg Curry',
      'Salad'
    ],
    isAvailable: true,
    imageUrl: '/images/combo-normal.jpg'
  },
  {
    id: 'combo-special',
    name: 'Combo Special',
    type: 'combo',
    category: 'special',
    description: 'Premium mixed meal plan with additional dessert and compliments',
    pricePerMeal: 94,
    // Updated as per latest pricing sheet
    weeklyPrice: 606,
    monthlyPrice: 2455,
    features: [
      'Chapathi',
      'Rice',
      'Wednesday & Friday - Chicken Masala Curry',
      'Remaining Days - Veg Curry',
      'Dessert-Sweets/Double-Salad/Papad-Or-Pickle',
      'Compliment'
    ],
    isPopular: true,
    isAvailable: true,
    imageUrl: '/images/combo-special.jpg'
  },
  {
    id: 'non-veg-normal',
    name: 'Non-Veg Normal',
    type: 'non-veg',
    category: 'normal',
    description: 'Non-vegetarian meal with chicken curry, chapati, rice, and salad',
    pricePerMeal: 115,
    weeklyPrice: 690,
    monthlyPrice: 2875,
    features: [
      'Chapathi',
      'Rice',
      'Chicken Curry',
      'Salad'
    ],
    isAvailable: true,
    imageUrl: '/images/non-veg-normal.jpg'
  },
  {
    id: 'non-veg-special',
    name: 'Non-Veg Special',
    type: 'non-veg',
    category: 'special',
    description: 'Premium non-vegetarian meal with additional dessert and compliments',
    pricePerMeal: 125,
    weeklyPrice: 750,
    monthlyPrice: 3125,
    features: [
      'Chapathi',
      'Rice',
      'Chicken Curry',
      'Dessert-Sweets/Double-Salad/Papad-Or-Pickle',
      'Compliment'
    ],
    isAvailable: true,
    imageUrl: '/images/non-veg-special.jpg'
  }
];

/**
 * Get menu plan by ID
 */
export function getMenuPlanById(id: string): MenuPlan | undefined {
  return MENU_PLANS.find(plan => plan.id === id);
}

/**
 * Get menu plans by type
 */
export function getMenuPlansByType(type: 'veg' | 'non-veg' | 'combo'): MenuPlan[] {
  return MENU_PLANS.filter(plan => plan.type === type);
}

/**
 * Get popular menu plans
 */
export function getPopularMenuPlans(): MenuPlan[] {
  return MENU_PLANS.filter(plan => plan.isPopular);
}

/**
 * Get available menu plans
 */
export function getAvailableMenuPlans(): MenuPlan[] {
  return MENU_PLANS.filter(plan => plan.isAvailable);
}

/**
 * Calculate plan pricing
 */
export function calculatePlanPricing(planId: string, duration: 'weekly' | 'monthly'): {
  unitPrice: number;
  totalPrice: number;
  savings: number;
} {
  const plan = getMenuPlanById(planId);
  if (!plan) {
    throw new Error('Plan not found');
  }

  const unitPrice = plan.pricePerMeal;
  const totalPrice = duration === 'weekly' ? plan.weeklyPrice : plan.monthlyPrice;
  const regularPrice = duration === 'weekly' ? unitPrice * 6 : unitPrice * 25;
  const savings = regularPrice - totalPrice;

  return {
    unitPrice,
    totalPrice,
    savings: Math.max(0, savings)
  };
}

/**
 * Get plan features by category
 */
export function getPlanFeatures(planId: string): string[] {
  const plan = getMenuPlanById(planId);
  return plan?.features || [];
}

/**
 * Validate plan availability
 */
export function isPlanAvailable(planId: string): boolean {
  const plan = getMenuPlanById(planId);
  return plan?.isAvailable || false;
}

/**
 * Get plan recommendations based on preferences
 */
export function getPlanRecommendations(preferences: {
  isVegetarian?: boolean;
  budget?: 'low' | 'medium' | 'high';
  duration?: 'weekly' | 'monthly';
}): MenuPlan[] {
  let recommendations = MENU_PLANS.filter(plan => plan.isAvailable);

  // Filter by dietary preferences
  if (preferences.isVegetarian !== undefined) {
    if (preferences.isVegetarian) {
      recommendations = recommendations.filter(plan => plan.type === 'veg');
    } else {
      recommendations = recommendations.filter(plan => plan.type !== 'veg');
    }
  }

  // Filter by budget
  if (preferences.budget) {
    const budgetRanges = {
      low: { min: 0, max: 100 },
      medium: { min: 100, max: 150 },
      high: { min: 150, max: Infinity }
    };

    const range = budgetRanges[preferences.budget];
    recommendations = recommendations.filter(plan => 
      plan.pricePerMeal >= range.min && plan.pricePerMeal <= range.max
    );
  }

  // Sort by popularity and price
  return recommendations.sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return a.pricePerMeal - b.pricePerMeal;
  });
}

/**
 * Plan comparison utilities
 */
export function comparePlans(planIds: string[]): {
  plans: MenuPlan[];
  comparison: {
    cheapest: MenuPlan;
    mostPopular: MenuPlan;
    bestValue: MenuPlan;
  };
} {
  const plans = planIds.map(id => getMenuPlanById(id)).filter(Boolean) as MenuPlan[];
  
  const cheapest = plans.reduce((min, plan) => 
    plan.pricePerMeal < min.pricePerMeal ? plan : min
  );
  
  const mostPopular = plans.find(plan => plan.isPopular) || plans[0];
  
  const bestValue = plans.reduce((best, plan) => {
    const currentValue = plan.features.length / plan.pricePerMeal;
    const bestValue = best.features.length / best.pricePerMeal;
    return currentValue > bestValue ? plan : best;
  });

  return {
    plans,
    comparison: {
      cheapest,
      mostPopular,
      bestValue
    }
  };
}
