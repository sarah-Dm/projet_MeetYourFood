document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

//ADAPTATIVE FORM CREATE USER/HOST
//tout le formulaire est affiché, aller chercher les éléments HTML
const createAccountForm = document.querySelector('#createAccountForm');
//aller chercher les éléments html
const userForm = document.querySelector('#user-form');
const hostForm = document.querySelector('#host-form');
const visitorOption = document.querySelector('#visitor-option');
const hostOption = document.querySelector('#host-option');
const profileSelection = document.querySelector('#profileSelection');
const loginBtn = document.querySelector('#login-btn');

//option: au début de la partie host est caché

//lié le selected au changement du form
function changeForm(event) {
  console.log('event', event);
  const value = event.target.value; // "visitor" / "host"
  if (value === 'visitor') {
    //si l'option index1 (visiteur) est séléctionnée, supprimer la partie host du questionnaire
    createAccountForm.classList.remove('host');
  } else {
    //si l'option visiteur n'est pas séléctionnée
    createAccountForm.classList.add('host');
  }
  console.log('changed');
}
//vérifier que les champs required fonctionnent en formulaire restreint

//modifier le formulaire selon l'option séléctionnée (setTimeout pour que s'active une fois que variables liées)
profileSelection.addEventListener('change', changeForm);

//changement bouton login quand user logué
// function changeLoginBtn(logged) {
//   console.log('event', logged);
//   loginBtn.innerText = `${user.firstname} ${user.lastname}`;
// }

// document.addEventListener('click',changeLoginBtn);

//quand clique sur login et que url contient "profile"
// doc.addEventListener('popstate', function () {
//   loginBtn.innerText = 'Logout';
// });
