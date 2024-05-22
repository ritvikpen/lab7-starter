// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem("recipes")) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	const mainElement = document.querySelector("main");
	recipes.forEach(recipe => {
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipe;
		mainElement.appendChild(recipeCard);
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	const formElement = document.querySelector("form");
	formElement.addEventListener("submit", event => {
		event.preventDefault();
		const formData = new FormData(formElement);
		const recipeObject = {};
		for (let [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipeObject;
		document.querySelector("main").appendChild(recipeCard);
		let recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
		formElement.reset();
	});

	const clearStorageButton = document.querySelector(".danger");
	clearStorageButton.addEventListener("click", () => {
		localStorage.clear();
		document.querySelector("main").innerHTML = "";
	});
}
