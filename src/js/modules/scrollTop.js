// Scroll top animation

const scrollTop = (top) => {
    const logo = $('.logo');

    function scrollTop(e) {
        e.preventDefault();
        $('html, body').animate({ 
          scrollTop: $('#top').offset().top 
        }, 'slow');
    }
    logo.click((e) => {
        scrollTop(e);
    }) 
    top.click((e) => {
        scrollTop(e);
    });
}

export default scrollTop;