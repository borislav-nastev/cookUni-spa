import { loginUser } from '../requester.js';
import { showLoading, showNotification } from '../notification.js';

export async function loginGet() {

    this.partials = {
        header: await this.load('../views/common/header.hbs'),
        footer: await this.load('../views/common/footer.hbs')
    }

    this.partial('../views/users/login.hbs', this.app.userData);
}

export async function loginPost() {

    const username = this.params.username;
    const password = this.params.password;

    try {

        showLoading();

        const response = await loginUser({ 'login': username, password });

        if (response.hasOwnProperty('message')) {
            throw new Error(response.message);
        }

        localStorage.setItem('username', response.username);
        localStorage.setItem('userToken', response['user-token']);
        localStorage.setItem('userId', response.objectId);
        localStorage.setItem('fullName', `${response.firstName} ${response.lastName}`);

        this.app.userData.loggedIn = true;
        this.app.userData.username = localStorage.getItem('username');
        this.app.userData.fullName = `${response.firstName} ${response.lastName}`;

        showNotification('infoEl', 'Login successful!');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}