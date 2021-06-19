'use strict'
import navScroll from './modules/navScroll';
import langMenu from './modules/langMenu';
import scrollTop from './modules/scrollTop';
import formData from './modules/formData';
import {popup, closeModal} from './modules/popup';
import loader from './modules/loader';

loader();

$(document).ready(() => {
    const top = $('.top');
    navScroll(top);
    langMenu();
    scrollTop(top);
    formData();
    popup();
    closeModal();
});