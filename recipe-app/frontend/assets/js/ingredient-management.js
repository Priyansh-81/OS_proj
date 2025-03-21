document.addEventListener("DOMContentLoaded", function () {
    const ingredientForm = document.getElementById("ingredient-form");
    const ingredientList = document.getElementById("ingredient-list");

    let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

    // Function to render ingredients in the table
    function renderIngredients() {
        ingredientList.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Nutritional Value</th>
                <th>Actions</th>
            </tr>`;
        
        ingredients.forEach((ingredient, index) => {
            const ingredientRow = document.createElement("tr");
            ingredientRow.innerHTML = `
                <td>${ingredient.name}</td>
                <td>${ingredient.nutritionalValue}</td>
                <td><button onclick="editIngredient(${index})">Edit</button> <button onclick="deleteIngredient(${index})">Delete</button></td>
            `;
            ingredientList.appendChild(ingredientRow);
        });
    }

    // Save ingredients to localStorage
    function saveIngredients() {
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }

    // Handle form submission to add or edit an ingredient
    ingredientForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(ingredientForm);
        const newIngredient = {
            name: formData.get("name"),
            nutritionalValue: parseFloat(formData.get("nutritionalValue")),
        };

        // If editing an existing ingredient, update it
        if (ingredientForm.dataset.editIndex) {
            const index = ingredientForm.dataset.editIndex;
            ingredients[index] = newIngredient;
            delete ingredientForm.dataset.editIndex; // Clear the edit index
        } else {
            ingredients.push(newIngredient);
        }

        saveIngredients();
        renderIngredients();
        ingredientForm.reset(); // Reset the form after submission
    });

    // Function to edit an ingredient
    window.editIngredient = function (index) {
        const ingredient = ingredients[index];
        document.getElementById("name").value = ingredient.name;
        document.getElementById("nutritionalValue").value = ingredient.nutritionalValue;
        
        // Store the index in the form for later editing
        ingredientForm.dataset.editIndex = index;
    };

    // Function to delete an ingredient
    window.deleteIngredient = function (index) {
        ingredients.splice(index, 1);
        saveIngredients();
        renderIngredients();
    };

    // Initial render of ingredients
    renderIngredients();
});