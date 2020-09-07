const elements = {
    loadingEl: document.querySelector('#loadingBox'),
    errorEl: document.querySelector('#errorBox'),
    infoEl: document.querySelector('#successBox')
}

function showLoading() {
    elements.loadingEl.style.display = 'block';
}

function hideLoading() {
    elements.loadingEl.style.display = 'none';
}

function showNotification(el, message) {
    hideLoading();

    elements[el].textContent = message;

    setTimeout(function () {
        elements[el].style.display = 'block';
    }, 500);

    setTimeout(function () {
        elements[el].style.display = 'none';
    }, 3000);
}

export {
    showLoading,
    hideLoading,
    showNotification
}