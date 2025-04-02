document.addEventListener("DOMContentLoaded", function () {
    const ingredientForm = document.getElementById("ingredient-form");
    const ingredientList = document.getElementById("ingredient-list");

    // Fetch ingredients from backend
    async function fetchIngredients() {
        try {
            const response = await fetch("http://localhost:5001/api/ingredients");
            const ingredients = await response.json();
            renderIngredients(ingredients);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    }

    // Render ingredients in table
    function renderIngredients(ingredients) {
        ingredientList.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Nutritional Value</th>
                <th>Actions</th>
            </tr>`;

        ingredients.forEach((ingredient) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${ingredient.Name}</td>
                <td>${ingredient.NutritionalValue}</td>
                <td>
                    <button onclick="editIngredient(${ingredient.IngredientID}, '${ingredient.Name}', ${ingredient.NutritionalValue})">Edit</button>
                    <button onclick="deleteIngredient(${ingredient.IngredientID})">Delete</button>
                </td>`;
            ingredientList.appendChild(row);
        });
    }

    // Handle form submission (Add or Update ingredient)
    ingredientForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(ingredientForm);
        const newIngredient = {
            name: formData.get("name"),
            nutritionalValue: parseFloat(formData.get("nutritionalValue")),
        };

        const editId = ingredientForm.dataset.editId;

        try {
            if (editId) {
                // Update existing ingredient
                await fetch(`http://localhost:5001/api/ingredients/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newIngredient),
                });
                delete ingredientForm.dataset.editId;
            } else {
                // Add new ingredient
                await fetch("http://localhost:5001/api/ingredients", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newIngredient),
                });
            }
            ingredientForm.reset();
            fetchIngredients(); // Refresh ingredient list
        } catch (error) {
            console.error("Error saving ingredient:", error);
        }
    });

    // Populate form for editing
    window.editIngredient = function (id, name, nutritionalValue) {
        document.getElementById("name").value = name;
        document.getElementById("nutritionalValue").value = nutritionalValue;
        ingredientForm.dataset.editId = id;
    };

    // Delete ingredient
    window.deleteIngredient = async function (id) {
        try {
            await fetch(`http://localhost:5001/api/ingredients/${id}`, { method: "DELETE" });
            fetchIngredients(); // Refresh list
        } catch (error) {
            console.error("Error deleting ingredient:", error);
        }
    };

    // Initial load
    fetchIngredients();
});