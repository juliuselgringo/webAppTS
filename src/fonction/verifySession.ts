// Vérifier la session auprès du serveur
export async function verifySession() {
  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;
  
  if (!logoutBtn) {
    console.error('Logout button not found');
    return;
  }
  
  logoutBtn.style.display = 'none'; // Masquer le bouton par défaut

  try {
    // Récupérer le token du localStorage
    const token = localStorage.getItem('sessionToken');
    
    if (!token) {
      console.error('Aucun token trouvé dans localStorage');
      alert('Session invalide. Veuillez vous reconnecter.');
      window.location.href = '../index.html';
      return;
    }

    const response = await fetch('http://localhost:3000/verify-session', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      // Session valide - afficher le bouton de déconnexion
      logoutBtn.style.display = 'block';
      
      console.log('Session valide');
    } else {
      // Pas de session valide
      console.error('Session invalide:', response.status);
      alert('Session invalide. Veuillez vous reconnecter.');
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Erreur de vérification:', error);
    alert('Erreur de vérification de la session. Veuillez vous reconnecter.');
    window.location.href = '../index.html';
  }
}
