import { verifySession } from '../fonction/verifySession.js';
import { logoutFct } from '../fonction/logout.js';
import { deleteUser } from '../fonction/deleteUser.js';

// Vérifier la session au chargement de la page
verifySession();



document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;

  logoutBtn.addEventListener('click', () => {
          logoutFct();
        });

  const usersDisplay = document.getElementById('users-display') as HTMLDivElement;

  // Récupérer les utilisateurs depuis le backend
  fetch('http://localhost:3000/allusers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then (async response => {
    const data = await response.json();
    if(response.ok) {
      data.users.forEach((user: { id: number; name: string; email: string }) => {
        usersDisplay.innerHTML += `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><button class="btn btn-danger delete-btn" id="${user.id}">Supprimer</button></td>
        </tr>`;
      });

      // Ajouter les événements de suppression après avoir ajouté les utilisateurs
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const userId = button.id;
          // Appeler la fonction de suppression avec l'ID de l'utilisateur
          deleteUser(userId);
        });
      });

    } else {
      alert('Failed to fetch users. Response: ' + JSON.stringify(data));
    }
  })
  .catch(error => {
    console.error('Error fetching users:', error);
    alert('An error occurred while fetching users.');
  });
});
