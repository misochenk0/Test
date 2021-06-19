//Lang menu scripts
const langMenu = () => {
    
    const lang = $('#lang');

    $(lang).click(() => {
        lang.next().toggleClass('language_active');
    }) 
    document.addEventListener('click', (e) => {
        if (e.target.parentNode.parentNode.classList.contains('language') || e.target.id == 'lang' || e.target.parentNode.id == 'lang') {
        } else {
            lang.next().removeClass('language_active');
        }
    })

    
    lang.next().children().click((e) => {
        e.preventDefault();
        if (e.target.classList.contains('russian')) {
            lang.next().removeClass('language_active');
        } else if (e.target.classList.contains('english')) {
            lang.next().removeClass('language_active');
        }
    })
};

export default langMenu;