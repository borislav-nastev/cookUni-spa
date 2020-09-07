import { updateRecipe, getRecipeById } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export default async function likeRecipe() {

    try {

        showLoading();

        const recipe = await getRecipeById(this.params.id);

        if (recipe.hasOwnProperty('errorData')) {
            throw new Error(recipe.message);
        }

        let likesCounter = recipe.likesCounter;
        likesCounter++;

        const response = await updateRecipe(this.params.id, { likesCounter });

        if (response.hasOwnProperty('errorData')) {
            throw new Error(response.message);
        }

        showNotification('infoEl', 'You like this recipe successfully.');
        this.redirect(`#/details/${response.objectId}`);

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}