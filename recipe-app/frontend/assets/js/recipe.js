 // recipe.js

document.addEventListener("DOMContentLoaded", () => {
    displayRecipes();
    setupRecipeForm();
});

// 🟢 1. Add a New Recipe
function setupRecipeForm() {
    const recipeForm = document.querySelector("#recipe-form");
    if (recipeForm) {
        recipeForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.querySelector("#recipe-name").value.trim();
            const cuisine = document.querySelector("#recipe-cuisine").value.trim();
            const diet = document.querySelector("#recipe-diet").value.trim();
            const difficulty = document.querySelector("#recipe-difficulty").value.trim();
            const cookingTime = document.querySelector("#recipe-time").value.trim();
            const instructions = document.querySelector("#recipe-instructions").value.trim();

            let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
            const newRecipe = { id: Date.now(), name, cuisine, diet, difficulty, cookingTime, instructions };
            recipes.push(newRecipe);

            localStorage.setItem("recipes", JSON.stringify(recipes));
            alert("Recipe added successfully!");
            displayRecipes();
            recipeForm.reset();
        });
    }
}

// 🟢 2. Display Recipes
function displayRecipes() {
    const recipeList = document.querySelector("#recipe-list");
    if (recipeList) {
        recipeList.innerHTML = "";
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        recipes.forEach((recipe) => {
            const recipeItem = document.createElement("div");
            recipeItem.classList.add("recipe-item");
            recipeItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                <p><strong>Diet:</strong> ${recipe.diet}</p>
                <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                <button onclick="addToFavorites(${recipe.id})">Favorite</button>
            `;
            recipeList.appendChild(recipeItem);
        });
    }
}

// 🟢 3. Delete a Recipe
function deleteRecipe(id) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    alert("Recipe deleted!");
    displayRecipes();
}

// 🟢 4. Add to Favorites
function addToFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to Favorites!");
    } else {
        alert("Already in Favorites!");
    }
}

// 🟢 5. Filter Recipes
document.querySelector("#search-bar")?.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const recipes = document.querySelectorAll(".recipe-item");

    recipes.forEach(recipe => {
        const name = recipe.querySelector("h3").textContent.toLowerCase();
        recipe.style.display = name.includes(query) ? "block" : "none";
    });
});