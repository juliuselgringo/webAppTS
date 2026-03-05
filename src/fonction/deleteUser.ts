export async function deleteUser(userId: string) {
  if (!confirm('Are you sure you want to delete this user?')) {
    return;
  }else {
    try {
      const response = await fetch(`http://localhost:3000/deleteuser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (response.ok) {
        alert('User deleted successfully.');
        // Optionally, you can remove the user row from the table
        const userRow = document.getElementById(userId)?.closest('tr');
        if (userRow) {
          userRow.remove();
        }
      } else {
        const data = await response.json();
        alert('Failed to delete user. Response: ' + JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  }
}