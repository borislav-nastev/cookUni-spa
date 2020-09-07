import { logoutUser } from '../../requester.js';
import { showLoading, showNotification } from '../../notification.js';

export default async function logout() {

    try {

        showLoading();
        await logoutUser();

        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('fullName');

        this.app.userData.loggedIn = false;
        this.app.userData.username = '';
        this.app.userData.fullName = '';

        showNotification('infoEl', 'Logout successful!');
        this.redirect('#/home');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
} 