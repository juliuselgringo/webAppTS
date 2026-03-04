export function logoutFct() {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async response => {
        const data = await response.json();
        if (response.ok) {
            // Supprimer le token du localStorage
            localStorage.removeItem('sessionToken');
            console.log('Token supprimé du localStorage');
            
            // redirection vers l'accueil après déconnexion
            window.location.href = '../index.html';
            alert(data.message);
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}