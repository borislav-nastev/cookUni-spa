import { addRecipe } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

const categories = {
    'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
    'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
    'Grain Food': 'https://snackymatz.com/wp-content/uploads/2017/03/corn-syrup-563796__340-300x200.jpg',
    'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
};

export default categories;

export async function createRecipeGet() {

    this.partials = {
        header: await this.load('../views/common/header.hbs'),
        footer: await this.load('../views/common/footer.hbs')
    }

    this.partial('../views/recipes/create.hbs', this.app.userData);
}

export async function createRecipePost() {

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

        if (ingredients.length < 2) {
            throw new Error('Please add more ingredients!');
        }

        showLoading();

        const recipe = await addRecipe({ meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL });

        if (recipe.hasOwnProperty('errorData')) {
            throw new Error(recipe.message);
        }

        showNotification('infoEl', 'Recipe created successfully!');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}