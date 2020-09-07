const appId = '29D059B3-8277-A6F9-FF57-ECBF3728D000';
const apiKey = '9977FF22-A082-4B83-8100-EB10ABC2DB94';

const host = function (endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    RECIPES: 'data/recipes'
}

function createHeaders(method, data) {

    const userToken = localStorage.getItem('userToken');
    let headers;

    if (method === 'POST' || method === 'PUT') {
        headers = {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
        return { method, headers, body: JSON.stringify(data) };
    }

    headers = {
        'user-token': userToken
    }

    return { method, headers };
}

async function makeRequest(url, method, data) {
    const response = await fetch(url, createHeaders(method, data));
    return response.json();
}

async function registerUser(data) {
    const response = await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function loginUser(data) {
    const response = await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function logoutUser() {
    const response = await fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': localStorage.getItem('userToken')
        }
    });
    return response;
}

async function addRecipe(recipe) {
    const response = await makeRequest(host(endpoints.RECIPES), 'POST', recipe);
    return response;
}

async function getRecipes() {
    const response = await makeRequest(host(endpoints.RECIPES), 'GET');
    return response;
}

async function getRecipeById(id) {
    const response = await makeRequest(host(endpoints.RECIPES + `/${id}`), 'GET');
    return response;
}

async function deleteRecipe(id) {
    return await makeRequest(host(endpoints.RECIPES + `/${id}`), 'DELETE');
}

async function updateRecipe(id, updatedRecipe) {
    const response = await makeRequest(host(endpoints.RECIPES + `/${id}`), 'PUT', updatedRecipe);
    return response;
}

export {
    registerUser,
    loginUser,
    logoutUser,
    addRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
}