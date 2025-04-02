document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();
    setupFilters();
});

// 🟢 Fetch Recipes from Backend
async function fetchRecipes() {
    try {
        const response = await fetch("http://localhost:5001/api/recipes"); 
        if (!response.ok) throw new Error("Failed to fetch recipes");

        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.querySelector("#recipeContainer");

    if (!recipeContainer) {
        console.error("Error: recipeContainer element not found!");
        return;
    }

    recipeContainer.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeItem = document.createElement("div");
        recipeItem.classList.add("recipe-item");
        recipeItem.innerHTML = `
            <h3>${recipe.Name}</h3> <!-- Fix: Changed 'name' to 'Name' -->
            <p><strong>Cuisine:</strong> ${recipe.Cuisine}</p>
            <p><strong>Diet:</strong> ${recipe.DietType}</p>
            <p><strong>Difficulty:</strong> ${recipe.Difficulty || "N/A"}</p>
            <p><strong>Cooking Time:</strong> ${recipe.CookingTime || "Unknown"} mins</p>
            <p><strong>Instructions:</strong> ${recipe.Instructions || "No instructions provided."}</p>
            <button onclick="expand('${recipe.RecipeID}')">View</button>
        `;
        recipeContainer.appendChild(recipeItem);
    });
}

function exapnd(recipeID){

}


function setupFilters() {
    document.querySelectorAll("select").forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });
}

function applyFilters() {
    const cuisineFilter = document.querySelector("#cuisine").value;
    const dietFilter = document.querySelector("#diet").value;
    const difficultyFilter = document.querySelector("#difficulty").value;
    
    fetchRecipes().then(recipes => {
        let filteredRecipes = recipes;

        if(cuisineFilter == "all"){
            filteredRecipes = recipes;
        }
        
        if (cuisineFilter !== "all") {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine === cuisineFilter);
        }
        if (dietFilter !== "all") {
            filteredRecipes = filteredRecipes.filter(recipe => recipe && recipe.dietType && recipe.dietType === dietFilter);
        }
        if (difficultyFilter !== "all") {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficultyFilter);
        }
        
        displayRecipes(filteredRecipes);
    });
}

const searchBar = document.querySelector("#searchBar");
if (searchBar) {
    searchBar.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const recipes = document.querySelectorAll(".recipe-item");

        recipes.forEach(recipe => {
            const name = recipe.querySelector("h3").textContent.toLowerCase();
            recipe.style.display = name.includes(query) ? "block" : "none";
        });
    });
}
