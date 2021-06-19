//hide loader when all elements loaded

const loader = () => {
    $(window).on('load', () => {
        const loader = document.querySelector('.loader');
        loader.style.cssText = `visibility: hidden; 
            opacity: 0
        `;
        document.body.style.overflow = 'visible';
    });
}
export default loader;