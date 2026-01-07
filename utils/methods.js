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

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export { $, linkTo, generateId };