import { verifySession } from '../fonction/verifySession.js';
import { logoutFct } from '../fonction/logout.js';

// Vérifier la session au chargement de la page
verifySession();

const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;

logoutBtn.addEventListener('click', () => {
        logoutFct();
      });