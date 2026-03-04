export function loginFct(email: string, password: string) {
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then(async response => {
      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response data:', data);
      
      if (response.ok) {
        // Stocker le token reçu du serveur dans localStorage
        localStorage.setItem('sessionToken', data.token);
        console.log('Token reçu et stocké dans localStorage:', data.token);
        
        // redirection vers dashboard si utilisateur normal, vers admin si admin
        if(data.isAdmin) {
          window.location.href = 'view/admin.html';
        } else {
          window.location.href = 'view/dashboard.html';
        }

        alert('Login successful!');
      } else {
        alert('Login failed. Response: ' + JSON.stringify(data));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}