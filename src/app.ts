// DOMPurify chargé depuis CDN dans index.html
declare const DOMPurify: any;

// input
const nameInput = document.getElementById('name-input') as HTMLInputElement;
const emailInput = document.getElementById('email-input') as HTMLInputElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('confirm-password-input') as HTMLInputElement;

// small help
const passwordHelp = document.getElementById('password-help') as HTMLDivElement;
const confirmPasswordHelp = document.getElementById('confirm-password-help') as HTMLDivElement;

// buttons
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const displayPasswordBtn = document.getElementById('display-password') as HTMLButtonElement;

// events
// affichage saisie password
displayPasswordBtn.addEventListener('click', (tog) => {
  tog.preventDefault();
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  confirmPasswordInput.type = type;
  displayPasswordBtn.textContent = type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe';
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

// validation form
submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const name = DOMPurify.sanitize(nameInput.value.trim());
  const email = DOMPurify.sanitize(emailInput.value.trim());
  const password = DOMPurify.sanitize(passwordInput.value.trim());
  const confirmPassword = DOMPurify.sanitize(confirmPasswordInput.value.trim());

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
      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
      // rediriger vers login
      window.location.href = '/login.html';
      return;
    }

    throw new Error(data.message || 'Erreur lors de la création de l\'utilisateur.');
  })
  .catch(error => {
    alert('Error registering user: ' + error.message);
  });

});

