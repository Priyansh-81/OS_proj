document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipe-form");
    const recipeList = document.getElementById("recipe-list");

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Function to render recipes from localStorage
    function renderRecipes() {
        recipeList.innerHTML = "";
        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement("div");
            recipeItem.classList.add("recipe-item");
            recipeItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>Cuisine: ${recipe.cuisine}</p>
                <p>Diet Type: ${recipe.dietType}</p>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Cooking Time: ${recipe.cookingTime} mins</p>
                <button onclick="editRecipe(${index})">Edit</button>
                <button onclick="deleteRecipe(${index})">Delete</button>
            `;
            recipeList.appendChild(recipeItem);
        });
    }

    // Save recipes to localStorage
    function saveRecipes() {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    // Handle form submission to add a new recipe
    recipeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(recipeForm);
        const newRecipe = {
            name: formData.get("name"),
            cuisine: formData.get("cuisine"),
            dietType: formData.get("dietType"),
            difficulty: formData.get("difficulty"),
            cookingTime: formData.get("cookingTime"),
        };

        // If there's an id to update, it's an edit; otherwise, it's a new recipe
        if (recipeForm.dataset.editIndex) {
            const index = recipeForm.dataset.editIndex;
            recipes[index] = newRecipe;
            delete recipeForm.dataset.editIndex; // Clear the edit index
        } else {
            recipes.push(newRecipe);
        }

        saveRecipes();
        renderRecipes();
        recipeForm.reset(); // Reset the form after submit
    });

    // Edit recipe function
    window.editRecipe = function (index) {
        const recipe = recipes[index];
        document.getElementById("name").value = recipe.name;
        document.getElementById("cuisine").value = recipe.cuisine;
        document.getElementById("dietType").value = recipe.dietType;
        document.getElementById("difficulty").value = recipe.difficulty;
        document.getElementById("cookingTime").value = recipe.cookingTime;

        // Store the index in the form for later editing
        recipeForm.dataset.editIndex = index;
    };

    // Delete recipe function
    window.deleteRecipe = function (index) {
        recipes.splice(index, 1);
        saveRecipes();
        renderRecipes();
    };

    // Render the recipes when the page loads
    renderRecipes();
});