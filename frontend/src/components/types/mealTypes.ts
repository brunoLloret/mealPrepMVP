export type DayOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Meal {
  mealId: string;
  name: string;
  recipes: Recipe[];
}

export interface Recipe {
  name: string;
  URL?: string;
  instructions: string[];
  notes: string;
  servings: number;
  RecipeIngredients: RecipeIngredient[];
}

export interface Ingredient {
  name: string;
  category: Category;
  notes?: string; // Make notes optional
}

export interface RecipeIngredient {
  ingredient?: {
    name?: string;
    category?: Category;
  };
  notes?: string;
  amount: number;
  unit: string;
}

export type Category =
  'Fruit' | 'Vegetable' | 'Meat' | 'Fish' | 'Dairy' | 'Grain' | 'Spice' |
  'Herb' | 'Fats and Oils' | 'Eggs' | 'Flour' | 'Sugar' | 'Liquid' | 'Other';

export interface Day {
  dayOfTheWeek: DayOfTheWeek;
  Meals: Meal[];
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



export interface Cart {
  recipeIngredients: (RecipeIngredient | undefined)[];
}


// The sampleDay object needs to be updated to match the new structure
export const sampleDay: Day = {
  dayOfTheWeek: "Monday",
  Meals: [
    {
      mealId: "1",
      name: "Norman's Breakfast",
      recipes: [
        {
          name: "Scrambles",
          RecipeIngredients: [
            {
              ingredient: { name: "Eggs", category: "Eggs" },
              amount: 2,
              notes: "",
              unit: "piece"
            },
            {
              ingredient: { name: "Milk", category: "Dairy" },
              amount: 1,
              notes: "",
              unit: "cup"
            },
          ],
          instructions: ["Scramble the eggs", "Add milk", "Serve"],
          notes: "This is a scrambles recipe",
          URL: "https://www.google.com",
          servings: 1
        },
      ],
    },
    {
      mealId: "2",
      name: "Lunch",
      recipes: [
        {
          name: "Pancakes",
          RecipeIngredients: [
            {
              ingredient: { name: "Flour", category: "Flour" },
              amount: 2,
              notes: "",
              unit: "cup"
            },
          ],
          instructions: ["Mix the flour", "Add milk", "Serve"],
          notes: "This is a pancakes recipe",
          URL: "https://www.google.com",
          servings: 2
        },
      ],
    },
    {
      mealId: "3",
      name: "Dinner",
      recipes: [
        {
          name: "Steak",
          RecipeIngredients: [
            {
              ingredient: { name: "Steak", category: "Meat" },
              amount: 2,
              notes: "",
              unit: "piece"
            },
          ],
          instructions: ["Cook the steak", "Serve"],
          notes: "This is a steak recipe",
          URL: "https://www.google.com",
          servings: 2
        },
      ],
    },
  ],
};


