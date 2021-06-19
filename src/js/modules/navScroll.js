// appear nav bg when user scrolls more than 100px if more than 500 appears top elem

const navScroll = (top) => {
    const nav = $('nav');
    
    $(window).scroll(() => {
        if ($(window).scrollTop() > 100) {
            nav.addClass('scroll');
        } else {
            nav.removeClass('scroll');
        }

        if ($(window).scrollTop() > 500) {
            top.addClass('top_active');
        } else {
            top.removeClass('top_active');
        }
    });
};

export default navScroll;