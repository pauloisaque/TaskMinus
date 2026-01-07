import { openPage } from '../services/router.js';

function $(selector) {
  return document.getElementById(selector);
}

function linkTo(element, id) {
  element.addEventListener('click', () => {
    openPage(id);
    console.log(`Navigated to ${id}`);
  });
}

export { $, linkTo };