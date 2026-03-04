import { inscriptionFct } from '../fonction/inscription.js';
import { loginFct } from '../fonction/login.js';

// _________________________variables globales________________________
// DOMPurify chargé depuis CDN dans index.html
declare const DOMPurify: any;

// input inscription
const nameInput = document.getElementById('name-input') as HTMLInputElement;
const emailInput = document.getElementById('email-input') as HTMLInputElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('confirm-password-input') as HTMLInputElement;

// input login
const emailInputLogin = document.getElementById('email-input-login') as HTMLInputElement;
const passwordInputLogin = document.getElementById('password-input-login') as HTMLInputElement;

// small help
const passwordHelp = document.getElementById('password-help') as HTMLDivElement;
const confirmPasswordHelp = document.getElementById('confirm-password-help') as HTMLDivElement;

// buttons
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const displayPasswordBtn = document.getElementById('display-password') as HTMLButtonElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
const displayPasswordLoginBtn = document.getElementById('display-password-login') as HTMLButtonElement;

// ____________________________events_______________________________
// affichage saisie password inscription
displayPasswordBtn.addEventListener('click', (tog) => {
  tog.preventDefault();
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  confirmPasswordInput.type = type;
  displayPasswordBtn.textContent = type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe';
});

// affichage saisie password login
displayPasswordLoginBtn.addEventListener('click', (tog) => {
  tog.preventDefault();
  const type = passwordInputLogin.type === 'password' ? 'text' : 'password';
  passwordInputLogin.type = type;
  displayPasswordLoginBtn.textContent = type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe';
});

// aide sécurité password
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
  if (!passwordRegex.test(password)) {
    passwordHelp.style.color = 'red';
    return;
  }else {
    passwordHelp.style.color = 'green';
  }
});

// aide confirmation password
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    if (password !== confirmPassword) {
        confirmPasswordHelp.style.color = 'red';
        return;
    } else {
        confirmPasswordHelp.style.color = 'green';
    }
});

// validation form inscription et login automatique
submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const name = DOMPurify.sanitize(nameInput.value.trim());
  const email = DOMPurify.sanitize(emailInput.value.trim());
  const password = DOMPurify.sanitize(passwordInput.value.trim());
  const confirmPassword = DOMPurify.sanitize(confirmPasswordInput.value.trim());
  inscriptionFct(name, email, password, confirmPassword);
});

// login
loginBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const email = DOMPurify.sanitize(emailInputLogin.value.trim());
  const password = DOMPurify.sanitize(passwordInputLogin.value.trim());
  loginFct(email, password);
});




// ___________________________accessibilité_______________________________
// Correction du problème aria-hidden pour les modals
// Déplacer le focus avant que le modal ne soit caché
const inscriptionModal = document.getElementById('inscription');
const loginModal = document.getElementById('login');

if (inscriptionModal) {
  inscriptionModal.addEventListener('hide.bs.modal', () => {
    // Déplacer le focus vers le body avant de cacher le modal
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
}

if (loginModal) {
  loginModal.addEventListener('hide.bs.modal', () => {
    // Déplacer le focus vers le body avant de cacher le modal
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
}

