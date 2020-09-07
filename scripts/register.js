import { registerUser } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export async function registerGet() {

    this.partials = {
        header: await this.load('../views/common/header.hbs'),
        footer: await this.load('../views/common/footer.hbs')
    }

    this.partial('../views/users/register.hbs', this.app.userData);
}

export async function registerPost() {

    const { username, password, repeatPassword, firstName, lastName } = this.params;

    try {

        if (firstName.length === 0) {
            throw new Error('First name can not be empty!');
        }

        if (lastName.length === 0) {
            throw new Error('Last name can not be empty!');
        }

        if (username.length < 3) {
            throw new Error('Username should be more than 3 characters!');
        }

        if (password.length < 6) {
            throw new Error('Password should be more than 6 characters!');
        }

        if (password !== repeatPassword) {
            throw new Error('Password and repeat password do not match!');
        }

        showLoading();

        const response = await registerUser({ username, password, firstName, lastName });

        if (response.hasOwnProperty('message')) {
            throw new Error(response.message);
        }

        showNotification('infoEl', 'User registration successful!');
        this.redirect('#/login');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}