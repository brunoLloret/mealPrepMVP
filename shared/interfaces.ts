

export interface Recipe {
    name: string;
    URL?: string;
    instructions: string[];
    notes: string;
    servings: number;
    RecipeIngredients: RecipeIngredient[];
}

export interface Meal {
    mealId: string;
    name: string;
    recipes: Recipe[];
}

export interface Ingredient {
    name: string;
    category: Category;
    // notes: string;
}

export type Category = 'Fruit' | 'Vegetable' | 'Meat' | 'Fish' | 'Dairy' | 'Grain' | 'Spice' | 'Herb' | 'Fats and Oils' | 'Eggs' | 'Flour' | 'Sugar' | 'Liquid' | 'Other';

export interface RecipeIngredient {
    ingredient: Ingredient;
    notes: string;
    amount: number;
    unit: string;
}

export interface Recipes {
    recipes: Recipe[];
}

export interface ShoppingList {
    ingredients: Ingredient[];
}

export type ShoppingListProps = {
    lists: ShoppingList[];
};


// export const RECIPE_CATEGORIES = [
//     ‘BREAKFAST’,
//     ‘LUNCH’,
//     ‘DINNER’,
//     ‘SNACK’,
//   ] as const
//   /**Matches prisma enum */
//   export const CATEGORIES = [
//       ‘PRODUCE’,
//       ‘MEAT’,
//       ‘FISH’,
//       ‘INTERNATIONAL’,
//       ‘DAIRY’,
//       ‘BAKING’,
//       ‘FROZEN’,
//       ‘BEVERAGES’,
//       ‘SNACKS’,
//       ‘CANNED_GOODS’,
//       ‘CONDIMENTS’,
//     ‘PASTA_AND_RICE’,
//     ‘BREAD_AND_BAKERY’,
//     ‘BREAKFAST_AND_CEREAL’,
//     ‘SOUPS_AND_BROTHS’,
//     ‘SPICES_AND_SEASONINGS’,
//     ‘SAUCES_AND_MARINADES’,
//     ‘HEALTH_AND_WELLNESS’,
//     ‘HOUSEHOLD_SUPPLIES’,
//     ‘PERSONAL_CARE’,
//     ‘MISC’,
// ] as const


// export const UNITS = [
//     ‘GRAMS’,
//     ‘KILOGRAMS’,
//     ‘OUNCES’,
//     ‘POUNDS’,
//     ‘TONS’,
//     ‘CUPS’,
//     ‘PINTS’,
//     ‘FLUID_OUNCES’,
//     ‘FLUID_DRAMS’,
//     ‘TABLESPOONS’,
//     ‘TEASPOONS’,
// ] as const
// export type Category = (typeof CATEGORIES)[number]
// export type Unit = (typeof UNITS)[number]
// export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number]
// export const CATEGORY_DETAILS: Record<Category, string> = {
//     PRODUCE: ‘Produce’,
//     MEAT: ‘Meat’,
//     FISH: ‘Fish’,
//     INTERNATIONAL: ‘International’,
//     DAIRY: ‘Dairy’,
//     BAKING: ‘Baking’,
//     FROZEN: ‘Frozen’,
//     BEVERAGES: ‘Beverages’,
//     SNACKS: ‘Snacks’,
//     CANNED_GOODS: ‘Canned Goods’,
//     CONDIMENTS: ‘Condiments’,
//     PASTA_AND_RICE: ‘Pasta and Rice’,
//     BREAD_AND_BAKERY: ‘Bread and Bakery’,
//     BREAKFAST_AND_CEREAL: ‘Breakfast and Cereal’,
//     SOUPS_AND_BROTHS: ‘Soups and Broths’,
//     SPICES_AND_SEASONINGS: ‘Spices and Seasonings’,
//     SAUCES_AND_MARINADES: ‘Sauces and Marinades’,
//     HEALTH_AND_WELLNESS: ‘Health and Wellness’,
//     HOUSEHOLD_SUPPLIES: ‘Household Supplies’,
//     PERSONAL_CARE: ‘Personal Care’,
//     MISC: ‘Misc’,
// }
// export const UNIT_DETAILS: Record<Unit, string> = {
//     GRAMS: ‘grams’,
//     KILOGRAMS: ‘kilograms’,
//     OUNCES: ‘ounces’,
//     POUNDS: ‘pounds’,
//     TONS: ‘tons’,
//     CUPS: ‘cups’,
//     PINTS: ‘pints’,
//     FLUID_OUNCES: ‘fluid ounces’,
//     FLUID_DRAMS: ‘fluid drams’,
//     TABLESPOONS: ‘tablespoons’,
//     TEASPOONS: ‘teaspoons’,
// }
// export const RECIPE_CATEGORY_DETAILS: Record<RecipeCategory, string> = {
//     BREAKFAST: ‘Breakfast’,
//     LUNCH: ‘Lunch’,
//     DINNER: ‘Dinner’,
//     SNACK: ‘Snack’,
// }