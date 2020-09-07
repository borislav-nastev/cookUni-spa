import { getRecipes } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export default async function home() {

    this.partials = {
        header: await this.load('../views/common/header.hbs'),
        footer: await this.load('../views/common/footer.hbs'),
        recipe: await this.load('../views/recipes/recipe.hbs')
    }

    try {

        if (this.app.userData.loggedIn) {
            showLoading();

            const recipes = await getRecipes();

            if (recipes.hasOwnProperty('errorData')) {
                throw new Error(recipes.message);
            }

            const context = Object.assign({ recipes }, this.app.userData);
            this.partial('../views/home.hbs', context);
            hideLoading();

        } else {
            this.partial('../views/home.hbs', this.app.userData);
        }

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}