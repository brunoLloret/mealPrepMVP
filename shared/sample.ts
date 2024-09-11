// Define the types and interfaces

export interface Recipe {
    name: string;
    URL?: string;
    instructions: string[];
    notes: string;
    RecipeIngredients: RecipeIngredient[];
}

export interface Ingredient {
    name: string;
    category: Category;
}

export type Category = 'Fruit' | 'Vegetable' | 'Meat' | 'Fish' | 'Dairy' | 'Grain' | 'Spice' | 'Herb' | 'Fats and Oils' | 'Eggs' | 'Flour' | 'Sugar' | 'Liquid' | 'Other';


export interface Recipes {
    recipes: Recipe[];
}


export interface RecipeIngredient {
    ingredient: Ingredient;
    notes?: string; // Notes specific to the recipe
    amount: number;
    unit: string;
}


export interface ShoppingList {
    ingredients: RecipeIngredient[];
}

export type ShoppingListProps = {
    lists: ShoppingList[];
};

// Define the recipes array

export const recipes: Recipe[] = [
    {
        name: "Spaghetti Carbonara",
        URL: "http://example.com/spaghetti-carbonara",
        instructions: [
            "Cook spaghetti according to package instructions.",
            "Fry pancetta until crispy.",
            "Beat eggs and mix with Parmesan cheese.",
            "Toss spaghetti with pancetta and egg mixture.",
            "Season with black pepper."
        ],
        notes: "Serve immediately with extra Parmesan.",
        RecipeIngredients: [
            { ingredient: { name: "Pancetta", category: 'Meat' }, notes: "Fry until crispy", amount: 150, unit: "grams" },
            { ingredient: { name: "Spaghetti", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" },
            { ingredient: { name: "Eggs", category: 'Eggs' }, notes: "Beaten and mixed with cheese", amount: 3, unit: "" },
            { ingredient: { name: "Parmesan cheese", category: 'Dairy' }, notes: "Grated", amount: 100, unit: "grams" },
            { ingredient: { name: "Black pepper", category: 'Spice' }, notes: "Season to taste", amount: 0, unit: "to taste" }
        ]
    },
    {
        name: "Chicken Curry",
        URL: "http://example.com/chicken-curry",
        instructions: [
            "Sauté onions, garlic, and ginger.",
            "Add chicken pieces and cook until browned.",
            "Stir in curry powder and cook briefly.",
            "Add tomatoes and coconut milk, simmer until chicken is cooked.",
            "Garnish with cilantro."
        ],
        notes: "Adjust spice levels according to preference.",
        RecipeIngredients: [
            { ingredient: { name: "Chicken breast", category: 'Meat' }, notes: "Cut into pieces", amount: 500, unit: "grams" },
            { ingredient: { name: "Onion", category: 'Vegetable' }, notes: "Sauté until translucent", amount: 1, unit: "" },
            { ingredient: { name: "Garlic", category: 'Vegetable' }, notes: "Minced", amount: 3, unit: "cloves" },
            { ingredient: { name: "Ginger", category: 'Vegetable' }, notes: "Minced", amount: 1, unit: "inch" },
            { ingredient: { name: "Curry powder", category: 'Spice' }, notes: "Adjust according to taste", amount: 2, unit: "tablespoons" },
            { ingredient: { name: "Tomatoes", category: 'Vegetable' }, notes: "Chopped", amount: 2, unit: "" },
            { ingredient: { name: "Coconut milk", category: 'Liquid' }, notes: "Full-fat for richer flavor", amount: 400, unit: "ml" },
            { ingredient: { name: "Cilantro", category: 'Herb' }, notes: "Chop for garnish", amount: 1, unit: "handful" }
        ]
    },
    {
        name: "Beef Stroganoff",
        URL: "http://example.com/beef-stroganoff",
        instructions: [
            "Sauté onions and garlic in butter.",
            "Add beef strips and cook until browned.",
            "Stir in mushrooms and cook until tender.",
            "Add beef broth and simmer.",
            "Mix in sour cream and cook until heated through.",
            "Serve over egg noodles or rice."
        ],
        notes: "Top with fresh parsley for extra flavor.",
        RecipeIngredients: [
            { ingredient: { name: "Beef strips", category: 'Meat' }, notes: "Tender cuts like sirloin work best", amount: 500, unit: "grams" },
            { ingredient: { name: "Onion", category: 'Vegetable' }, notes: "Chopped", amount: 1, unit: "" },
            { ingredient: { name: "Garlic", category: 'Vegetable' }, notes: "Minced", amount: 3, unit: "cloves" },
            { ingredient: { name: "Mushrooms", category: 'Vegetable' }, notes: "Sliced", amount: 200, unit: "grams" },
            { ingredient: { name: "Beef broth", category: 'Liquid' }, notes: "Low sodium preferred", amount: 250, unit: "ml" },
            { ingredient: { name: "Sour cream", category: 'Dairy' }, notes: "Full-fat for creamier texture", amount: 200, unit: "ml" },
            { ingredient: { name: "Butter", category: 'Fats and Oils' }, notes: "For sautéing", amount: 2, unit: "tablespoons" },
            { ingredient: { name: "Egg noodles", category: 'Grain' }, notes: "Cook according to package instructions", amount: 250, unit: "grams" },
            { ingredient: { name: "Parsley", category: 'Herb' }, notes: "Chopped, for garnish", amount: 1, unit: "handful" }
        ]
    },
    {
        name: "Greek Salad",
        URL: "http://example.com/greek-salad",
        instructions: [
            "Combine cucumbers, tomatoes, and red onions in a bowl.",
            "Add Kalamata olives and feta cheese.",
            "Drizzle with olive oil and lemon juice.",
            "Season with salt, pepper, and oregano.",
            "Toss gently and serve chilled."
        ],
        notes: "Add grilled chicken for a protein boost.",
        RecipeIngredients: [
            { ingredient: { name: "Cucumbers", category: 'Vegetable' }, notes: "Diced", amount: 1, unit: "" },
            { ingredient: { name: "Tomatoes", category: 'Vegetable' }, notes: "Diced", amount: 2, unit: "" },
            { ingredient: { name: "Red onion", category: 'Vegetable' }, notes: "Thinly sliced", amount: 1, unit: "" },
            { ingredient: { name: "Kalamata olives", category: 'Vegetable' }, notes: "Pitted", amount: 100, unit: "grams" },
            { ingredient: { name: "Feta cheese", category: 'Dairy' }, notes: "Crumbled", amount: 100, unit: "grams" },
            { ingredient: { name: "Olive oil", category: 'Fats and Oils' }, notes: "Extra virgin", amount: 3, unit: "tablespoons" },
            { ingredient: { name: "Lemon juice", category: 'Liquid' }, notes: "Freshly squeezed", amount: 2, unit: "tablespoons" },
            { ingredient: { name: "Oregano", category: 'Spice' }, notes: "Dried", amount: 1, unit: "teaspoon" },
            { ingredient: { name: "Salt", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" },
            { ingredient: { name: "Black pepper", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" }
        ]
    },
    {
        name: "Vegetable Stir-Fry",
        URL: "http://example.com/vegetable-stir-fry",
        instructions: [
            "Heat oil in a large skillet or wok.",
            "Add chopped vegetables and stir-fry until tender-crisp.",
            "Add soy sauce and stir to coat vegetables.",
            "Serve over steamed rice."
        ],
        notes: "Use a mix of your favorite vegetables.",
        RecipeIngredients: [
            { ingredient: { name: "Bell peppers", category: 'Vegetable' }, notes: "Chopped", amount: 2, unit: "" },
            { ingredient: { name: "Broccoli", category: 'Vegetable' }, notes: "Cut into florets", amount: 1, unit: "head" },
            { ingredient: { name: "Carrots", category: 'Vegetable' }, notes: "Sliced", amount: 2, unit: "" },
            { ingredient: { name: "Snap peas", category: 'Vegetable' }, notes: "Trimmed", amount: 100, unit: "grams" },
            { ingredient: { name: "Soy sauce", category: 'Liquid' }, notes: "Low sodium preferred", amount: 3, unit: "tablespoons" },
            { ingredient: { name: "Olive oil", category: 'Fats and Oils' }, notes: "For stir-frying", amount: 2, unit: "tablespoons" },
            { ingredient: { name: "Rice", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" }
        ]
    },
    {
        name: "Quiche Lorraine",
        URL: "http://example.com/quiche-lorraine",
        instructions: [
            "Preheat oven to 375°F (190°C).",
            "Blind bake the pie crust for 10 minutes.",
            "Cook bacon until crispy, then crumble.",
            "In a bowl, whisk together eggs, cream, and cheese.",
            "Spread bacon in the pie crust, pour egg mixture over.",
            "Bake for 35-40 minutes until set and golden."
        ],
        notes: "Let cool for 10 minutes before slicing.",
        RecipeIngredients: [
            { ingredient: { name: "Pie crust", category: 'Grain' }, notes: "Store-bought or homemade", amount: 1, unit: "" },
            { ingredient: { name: "Bacon", category: 'Meat' }, notes: "Cooked and crumbled", amount: 150, unit: "grams" },
            { ingredient: { name: "Eggs", category: 'Eggs' }, notes: "Beaten", amount: 4, unit: "" },
            { ingredient: { name: "Heavy cream", category: 'Dairy' }, notes: "Full-fat", amount: 250, unit: "ml" },
            { ingredient: { name: "Gruyère cheese", category: 'Dairy' }, notes: "Shredded", amount: 150, unit: "grams" },
            { ingredient: { name: "Salt", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" },
            { ingredient: { name: "Black pepper", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" }
        ]
    },
    {
        name: "Chicken Caesar Salad",
        URL: "http://example.com/chicken-caesar-salad",
        instructions: [
            "Grill or pan-fry chicken breasts until cooked through.",
            "Slice chicken and place on top of romaine lettuce.",
            "Add croutons and shaved Parmesan cheese.",
            "Drizzle with Caesar dressing and toss gently."
        ],
        notes: "Use homemade croutons for best flavor.",
        RecipeIngredients: [
            { ingredient: { name: "Chicken breasts", category: 'Meat' }, notes: "Grilled or pan-fried", amount: 2, unit: "" },
            { ingredient: { name: "Romaine lettuce", category: 'Vegetable' }, notes: "Chopped", amount: 1, unit: "head" },
            { ingredient: { name: "Croutons", category: 'Grain' }, notes: "Store-bought or homemade", amount: 100, unit: "grams" },
            { ingredient: { name: "Parmesan cheese", category: 'Dairy' }, notes: "Shaved", amount: 50, unit: "grams" },
            { ingredient: { name: "Caesar dressing", category: 'Liquid' }, notes: "Store-bought or homemade", amount: 4, unit: "tablespoons" }
        ]
    },
    {
        name: "Pancakes",
        URL: "http://example.com/pancakes",
        instructions: [
            "Mix flour, sugar, baking powder, and salt in a bowl.",
            "In another bowl, whisk together milk, eggs, and melted butter.",
            "Combine wet and dry ingredients until just mixed.",
            "Pour batter onto a hot griddle and cook until bubbles form, then flip."
        ],
        notes: "Serve with maple syrup and fresh berries.",
        RecipeIngredients: [
            { ingredient: { name: "Flour", category: 'Flour' }, notes: "All-purpose", amount: 200, unit: "grams" },
            { ingredient: { name: "Sugar", category: 'Sugar' }, notes: "Granulated", amount: 2, unit: "tablespoons" },
            { ingredient: { name: "Baking powder", category: 'Other' }, notes: "Leavening agent", amount: 2, unit: "teaspoons" },
            { ingredient: { name: "Salt", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" },
            { ingredient: { name: "Milk", category: 'Liquid' }, notes: "Whole milk preferred", amount: 250, unit: "ml" },
            { ingredient: { name: "Eggs", category: 'Eggs' }, notes: "Beaten", amount: 2, unit: "" },
            { ingredient: { name: "Butter", category: 'Fats and Oils' }, notes: "Melted", amount: 50, unit: "grams" }
        ]
    },
    {
        name: "Beef Tacos",
        URL: "http://example.com/beef-tacos",
        instructions: [
            "Cook ground beef with taco seasoning.",
            "Warm taco shells in the oven.",
            "Fill taco shells with seasoned beef.",
            "Top with lettuce, tomatoes, cheese, and salsa."
        ],
        notes: "Customize toppings to your liking.",
        RecipeIngredients: [
            { ingredient: { name: "Ground beef", category: 'Meat' }, notes: "Cooked with seasoning", amount: 500, unit: "grams" },
            { ingredient: { name: "Taco shells", category: 'Grain' }, notes: "Warm before filling", amount: 8, unit: "shells" },
            { ingredient: { name: "Lettuce", category: 'Vegetable' }, notes: "Shredded", amount: 1, unit: "cup" },
            { ingredient: { name: "Tomatoes", category: 'Vegetable' }, notes: "Diced", amount: 1, unit: "" },
            { ingredient: { name: "Cheddar cheese", category: 'Dairy' }, notes: "Shredded", amount: 100, unit: "grams" },
            { ingredient: { name: "Salsa", category: 'Liquid' }, notes: "For topping", amount: 100, unit: "grams" },
            { ingredient: { name: "Taco seasoning", category: 'Spice' }, notes: "Adjust to taste", amount: 1, unit: "packet" }
        ]
    },
    {
        name: "Chocolate Chip Cookies",
        URL: "http://example.com/chocolate-chip-cookies",
        instructions: [
            "Preheat oven to 350°F (175°C).",
            "Cream together butter and sugars.",
            "Beat in eggs and vanilla.",
            "Combine flour, baking soda, and salt, then mix into the butter mixture.",
            "Stir in chocolate chips.",
            "Drop spoonfuls of dough onto a baking sheet and bake for 10-12 minutes."
        ],
        notes: "Cool on wire racks before storing.",
        RecipeIngredients: [
            { ingredient: { name: "Butter", category: 'Fats and Oils' }, notes: "Softened", amount: 115, unit: "grams" },
            { ingredient: { name: "Sugar", category: 'Sugar' }, notes: "Granulated", amount: 100, unit: "grams" },
            { ingredient: { name: "Brown sugar", category: 'Sugar' }, notes: "Packed", amount: 100, unit: "grams" },
            { ingredient: { name: "Eggs", category: 'Eggs' }, notes: "Beaten", amount: 1, unit: "" },
            { ingredient: { name: "Vanilla extract", category: 'Liquid' }, notes: "For flavor", amount: 1, unit: "teaspoon" },
            { ingredient: { name: "Flour", category: 'Flour' }, notes: "All-purpose", amount: 150, unit: "grams" },
            { ingredient: { name: "Baking soda", category: 'Other' }, notes: "Leavening agent", amount: 1, unit: "teaspoon" },
            { ingredient: { name: "Salt", category: 'Spice' }, notes: "To taste", amount: 0, unit: "to taste" },
            { ingredient: { name: "Chocolate chips", category: 'Other' }, notes: "Semi-sweet", amount: 150, unit: "grams" }
        ]
    }
];

// Define the shopping list

const shoppingList: ShoppingList = {
    ingredients: [
        { name: "Pancetta", category: 'Meat' },
        { name: "Spaghetti", category: 'Grain' },
        { name: "Eggs", category: 'Eggs' },
        { name: "Parmesan cheese", category: 'Dairy' },
        { name: "Black pepper", category: 'Spice' },
        { name: "Chicken breast", category: 'Meat' },
        { name: "Onion", category: 'Vegetable' },
        { name: "Garlic", category: 'Vegetable' },
        { name: "Ginger", category: 'Vegetable' },
        { name: "Curry powder", category: 'Spice' },
        { name: "Tomatoes", category: 'Vegetable' },
        { name: "Coconut milk", category: 'Liquid' },
        { name: "Cilantro", category: 'Herb' }
        // Additional ingredients can be added here
    ]
};



const shoppingList1: ShoppingList = {
    ingredients: [
        { ingredient: { name: "Pancetta", category: 'Meat' }, notes: "Fry until crispy", amount: 150, unit: "grams" },
        { ingredient: { name: "Spaghetti", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" },
        { ingredient: { name: "Parmesan cheese", category: 'Dairy' }, notes: "Grated", amount: 100, unit: "grams" },
        { ingredient: { name: "Chicken breast", category: 'Meat' }, notes: "Cut into pieces", amount: 500, unit: "grams" },
        { ingredient: { name: "Onion", category: 'Vegetable' }, notes: "Sauté until translucent", amount: 1, unit: "" },
        { ingredient: { name: "Garlic", category: 'Vegetable' }, notes: "Minced", amount: 3, unit: "cloves" }
    ]
};

const shoppingList2: ShoppingList = {
    ingredients: [
        { ingredient: { name: "Beef strips", category: 'Meat' }, notes: "Tender cuts like sirloin work best", amount: 500, unit: "grams" },
        { ingredient: { name: "Mushrooms", category: 'Vegetable' }, notes: "Sliced", amount: 200, unit: "grams" },
        { ingredient: { name: "Sour cream", category: 'Dairy' }, notes: "Full-fat for creamier texture", amount: 200, unit: "ml" },
        { ingredient: { name: "Cucumbers", category: 'Vegetable' }, notes: "Diced", amount: 1, unit: "" },
        { ingredient: { name: "Feta cheese", category: 'Dairy' }, notes: "Crumbled", amount: 100, unit: "grams" },
        { ingredient: { name: "Olive oil", category: 'Fats and Oils' }, notes: "Extra virgin", amount: 3, unit: "tablespoons" }
    ]
};

const shoppingList3: ShoppingList = {
    ingredients: [
        { ingredient: { name: "Bell peppers", category: 'Vegetable' }, notes: "Chopped", amount: 2, unit: "" },
        { ingredient: { name: "Soy sauce", category: 'Liquid' }, notes: "Low sodium preferred", amount: 3, unit: "tablespoons" },
        { ingredient: { name: "Rice", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" },
        { ingredient: { name: "Pie crust", category: 'Grain' }, notes: "Store-bought or homemade", amount: 1, unit: "" },
        { ingredient: { name: "Bacon", category: 'Meat' }, notes: "Cooked and crumbled", amount: 150, unit: "grams" },
        { ingredient: { name: "Heavy cream", category: 'Dairy' }, notes: "Full-fat", amount: 250, unit: "ml" }
    ]
};

const shoppingList4: ShoppingList = {
    ingredients: [
        { ingredient: { name: "Ground beef", category: 'Meat' }, notes: "Cooked with seasoning", amount: 500, unit: "grams" },
        { ingredient: { name: "Taco shells", category: 'Grain' }, notes: "Warm before filling", amount: 8, unit: "shells" },
        { ingredient: { name: "Cheddar cheese", category: 'Dairy' }, notes: "Shredded", amount: 100, unit: "grams" },
        { ingredient: { name: "Flour", category: 'Flour' }, notes: "All-purpose", amount: 200, unit: "grams" },
        { ingredient: { name: "Sugar", category: 'Sugar' }, notes: "Granulated", amount: 2, unit: "tablespoons" },
        { ingredient: { name: "Chocolate chips", category: 'Other' }, notes: "Semi-sweet", amount: 150, unit: "grams" }
    ]
};




export const listOfShoppingLists = {
    list1: [
        { ingredient: { name: "Pancetta", category: 'Meat' }, notes: "Fry until crispy", amount: 150, unit: "grams" },
        { ingredient: { name: "Spaghetti", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" },
        { ingredient: { name: "Parmesan cheese", category: 'Dairy' }, notes: "Grated", amount: 100, unit: "grams" },
        { ingredient: { name: "Chicken breast", category: 'Meat' }, notes: "Cut into pieces", amount: 500, unit: "grams" },
        { ingredient: { name: "Onion", category: 'Vegetable' }, notes: "Sauté until translucent", amount: 1, unit: "" },
        { ingredient: { name: "Garlic", category: 'Vegetable' }, notes: "Minced", amount: 3, unit: "cloves" }
    ],
    list2:
        [
            { ingredient: { name: "Beef strips", category: 'Meat' }, notes: "Tender cuts like sirloin work best", amount: 500, unit: "grams" },
            { ingredient: { name: "Mushrooms", category: 'Vegetable' }, notes: "Sliced", amount: 200, unit: "grams" },
            { ingredient: { name: "Sour cream", category: 'Dairy' }, notes: "Full-fat for creamier texture", amount: 200, unit: "ml" },
            { ingredient: { name: "Cucumbers", category: 'Vegetable' }, notes: "Diced", amount: 1, unit: "" },
            { ingredient: { name: "Feta cheese", category: 'Dairy' }, notes: "Crumbled", amount: 100, unit: "grams" },
            { ingredient: { name: "Olive oil", category: 'Fats and Oils' }, notes: "Extra virgin", amount: 3, unit: "tablespoons" }
        ],
    list3: [
        { ingredient: { name: "Bell peppers", category: 'Vegetable' }, notes: "Chopped", amount: 2, unit: "" },
        { ingredient: { name: "Soy sauce", category: 'Liquid' }, notes: "Low sodium preferred", amount: 3, unit: "tablespoons" },
        { ingredient: { name: "Rice", category: 'Grain' }, notes: "Cook according to package instructions", amount: 200, unit: "grams" },
        { ingredient: { name: "Pie crust", category: 'Grain' }, notes: "Store-bought or homemade", amount: 1, unit: "" },
        { ingredient: { name: "Bacon", category: 'Meat' }, notes: "Cooked and crumbled", amount: 150, unit: "grams" },
        { ingredient: { name: "Heavy cream", category: 'Dairy' }, notes: "Full-fat", amount: 250, unit: "ml" }
    ],
    list4: [
        { ingredient: { name: "Ground beef", category: 'Meat' }, notes: "Cooked with seasoning", amount: 500, unit: "grams" },
        { ingredient: { name: "Taco shells", category: 'Grain' }, notes: "Warm before filling", amount: 8, unit: "shells" },
        { ingredient: { name: "Cheddar cheese", category: 'Dairy' }, notes: "Shredded", amount: 100, unit: "grams" },
        { ingredient: { name: "Flour", category: 'Flour' }, notes: "All-purpose", amount: 200, unit: "grams" },
        { ingredient: { name: "Sugar", category: 'Sugar' }, notes: "Granulated", amount: 2, unit: "tablespoons" },
        { ingredient: { name: "Chocolate chips", category: 'Other' }, notes: "Semi-sweet", amount: 150, unit: "grams" }
    ]


}