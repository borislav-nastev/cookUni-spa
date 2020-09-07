export default async function userInfo() {

    this.partials = {
        header: await this.load('../../views/common/header.hbs'),
        footer: await this.load('../../views/common/footer.hbs')
    }

    const myEvents = this.app.userData.userEvents.length;
    const context = Object.assign({ myEvents }, this.app.userData);
    this.partial('../../views/users/user-page.hbs', context);
}