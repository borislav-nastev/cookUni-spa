import home from './scripts/home.js';
import { loginGet, loginPost } from './scripts/login.js';
import { registerGet, registerPost } from './scripts/register.js';
import logout from './scripts/logout.js';
import { createRecipeGet, createRecipePost } from './scripts/createRecipe.js';
import recipeDetails from './scripts/recipeDetails.js';
import { editRecipeGet, editRecipePost } from './scripts/editRecipe.js';
import deleteRecipe from './scripts/deleteRecipe.js';
import likeRecipe from './scripts/likeRecipe.js';

window.addEventListener('load', function () {

    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: localStorage.getItem('username') ? true : false,
            username: localStorage.getItem('username') || '',
            fullName: localStorage.getItem('fullName') || '',
        };

        this.get('index.html', home);
        this.get('/', home);
        this.get('#/home', home);

        this.get('#/register', registerGet);
        this.post('#/register', ctx => { registerPost.call(ctx) });

        this.get('#/login', loginGet);
        this.post('#/login', ctx => { loginPost.call(ctx) });

        this.get('#/logout', logout);

        this.get('#/create', createRecipeGet);
        this.post('#/create', ctx => { createRecipePost.call(ctx) });

        this.get('#/details/:id', recipeDetails);

        this.get('#/edit/:id', editRecipeGet);
        this.post('#/edit/:id', ctx => { editRecipePost.call(ctx) });

        this.get('#/delete/:id', deleteRecipe);

        this.get('#/like/:id', likeRecipe);
    });

    app.run();
});