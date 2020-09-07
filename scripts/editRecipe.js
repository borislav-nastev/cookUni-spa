import { updateRecipe, getRecipeById } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';
import categories from './createRecipe.js';

export async function editRecipeGet() {

    this.partials = {
        header: await this.load('../views/common/header.hbs'),
        footer: await this.load('../views/common/footer.hbs')
    }

    try {

        showLoading();

        const recipe = await getRecipeById(this.params.id);

        if (recipe.hasOwnProperty('errorData')) {
            throw new Error(recipe.message);
        }

        const context = Object.assign({ recipe }, this.app.userData);
        this.partial('../views/recipes/edit.hbs', context);
        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}

export async function editRecipePost() {

    let { meal, ingredients, prepMethod, description, foodImageURL, category } = this.params;
    ingredients = ingredients.split(',').map(e => e.trim());

    const categoryImageURL = categories[category];

    try {

        if (meal.length < 4) {
            throw new Error('Meal should be more than 4 characters long!');
        }

        if (ingredients.length === 0) {
            throw new Error('Ingredients is required!');
        }

        if (prepMethod.length < 10) {
            throw new Error('Prepend method should be more than 10 characters long!');
        }

        if (!foodImageURL.startsWith('http://') && !foodImageURL.startsWith('https://')) {
            throw new Error('Invalid image URL!');
        }

        showLoading();

        const recipe = await updateRecipe(this.params.id, { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL });

        if (recipe.hasOwnProperty('errorData')) {
            throw new Error(recipe.message);
        }

        showNotification('infoEl', 'Recipe edited successfully!');
        this.redirect(`#/details/${recipe.objectId}`);

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}