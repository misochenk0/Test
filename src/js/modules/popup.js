const popup = () => {
    const   modal = document.querySelector('.popup'),
            btn = document.querySelectorAll('[data-modal]'),
            overflow = document.querySelector('.overflow'),
            close = document.querySelector('.popup__close'),
            login = document.querySelector('#login'),
            register = document.querySelector('#register'),
            contactPopup = document.querySelector('.popup-contact'),
            registerPopup = document.querySelector('.popup-register'),
            loginPopup = document.querySelector('.popup-login'),
            thanksPopup = document.querySelector('.popup-thanks');

    function hideAllPopups() {
        contactPopup.style.display = 'none';
        registerPopup.style.display = 'none';
        loginPopup.style.display = 'none';
        thanksPopup.style.display = 'none';
    }

    // Popup with overflow appears on click 
    btn.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.id === 'register-btn') {
                hideAllPopups();
                registerPopup.style.display = 'block';
            } else if (e.target.id === 'contact-btn') {
                hideAllPopups();
                contactPopup.style.display = 'block';
            } else {
                hideAllPopups();
                loginPopup.style.display = 'block';
            }
            modal.classList.add('popup_active');
            overflow.classList.add('overflow_active');
            document.body.style.overflow = 'hidden';
        })
    })
    
    //close popup when click on X / on overflow / press Escape btn

    close.addEventListener('click', () => {
         closeModal();
    })
    overflow.addEventListener('click', () => {
        closeModal();
    })
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    })

    // Swap form inside popup to popup-login or to popup-register
    login.addEventListener('click', (e) => {
        e.preventDefault();
        login.parentElement.parentElement.style.display = 'none';
        register.parentElement.parentElement.style.display = 'block';
    })
    register.addEventListener('click', (e) => {
        e.preventDefault();
        register.parentElement.parentElement.style.display = 'none';
        login.parentElement.parentElement.style.display = 'block';
    })
}

// Close popup
function closeModal(form) {
    const   modal = document.querySelector('.popup'),
            overflow = document.querySelector('.overflow'),
            thanksPopup = document.querySelector('.popup-thanks');

    if (form && form.classList.contains('popup-contact__form')) {
        form.parentNode.style.display = 'none';
        thanksPopup.style.display = 'block';
    } else {
        modal.classList.remove('popup_active');
        overflow.classList.remove('overflow_active');
        document.body.style.overflow = 'visible';
    }

}

export {popup, closeModal}