import { deleteRecipe as apiDeleteRecipe } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export default async function deleteRecipe() {

    try {

        showLoading();

        await apiDeleteRecipe(this.params.id);

        showNotification('infoEl', 'Recipe deleted successfully.');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}