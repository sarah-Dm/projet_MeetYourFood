document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

//tout le formulaire est affiché, aller chercher les éléments HTML
document.onload = () => {
  const createAccountForm = document.querySelector('#createAccountForm');
  let userForm;
  let hostForm;
  let visitorOption;
  let hostOption;
  const profileSelection = document.querySelector('#profileSelection');
};

//option: au début de la partie host est caché

//lié le selected au changement du form
function changeForm() {
  if (profileSelection.selectedIndex === 1) {
    //aller chercher les éléments html
    userForm = document.querySelector('#user-form');
    hostForm = document.querySelector('#host-form');
    visitorOption = document.querySelector('#visitor-option');
    hostOption = document.querySelector('#host-option');
    //si l'option visiteur est séléctionnée, supprimer la partie host du questionnaire
    visitorOption.setAttribute('selected', 'selected');
    hostOption.removeAttribute('selected');
    createAccountForm.removeChild(hostForm);
  } else {
    //si l'option visiteur n'est pas séléctionnée
    visitorOption.removeAttribute('selected');
    hostOption.setAttribute('selected', 'selected');
    createAccountForm.appendChild(hostForm);
  }
  console.log('changed');
}

//vérifier que les champs required fonctionnent en formulaire restreint

//modifier le formulaire selon l'option séléctionnée (setTimeout pour que s'active une fois que variables liées)
setTimeout(() => {
  profileSelection.addEventListener('change', changeForm);
}, 500);
