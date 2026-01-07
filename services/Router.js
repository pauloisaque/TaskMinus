const navBottom = document.getElementById('bottom-nav');
const allSectionsPagesById = document.querySelectorAll('section')

export function openPage(id) {
  allSectionsPagesById.forEach(section => { 
    if(section.id === id) {
      if(id !== 'login-page') {
        navBottom.removeAttribute('hidden');
      } else {
        navBottom.setAttribute('hidden', '');
      }
      section.removeAttribute('hidden');
    } else {
      section.setAttribute('hidden', '');
    }
  });
  window.history.pushState({ pageId: id }, '', `#${id}`);
}

window.addEventListener('popstate', (event) => {
  const pageId = event.state ? event.state.pageId : 'login-page';
  openPage(pageId);
});

export default { openPage }