import { getRecipeById } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export default async function recipeDetails() {

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

        const isOwner = recipe.ownerId === localStorage.getItem('userId');
        const context = Object.assign({ recipe, isOwner }, this.app.userData);
        this.partial('../views/recipes/details.hbs', context);
        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}