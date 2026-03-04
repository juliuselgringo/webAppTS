import { loginFct } from './login.js';

export function inscriptionFct(name: string, email: string, password: string, confirmPassword: string) {
     

  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
  if (!passwordRegex.test(password)) {
    alert("Le mot de passe doit contenir au moins 4 caractères, une majuscule, une minuscule et un chiffre.");
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  fetch('http://localhost:3000/newuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(async (response) => {
    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'User registered successfully!');
      // login automatique après inscription
      loginFct(email, password);
      
      return;
    }

    throw new Error(data.message || 'Erreur lors de la création de l\'utilisateur.');
  })
  .catch(error => {
    alert('Error registering user: ' + error.message);
  });
}