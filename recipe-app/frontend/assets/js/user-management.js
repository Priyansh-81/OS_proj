document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.querySelector('#userTable tbody');

    // Fetch Users from Backend
    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:5001/api/users');
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Render Users in the Table
    function renderUsers(users) {
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = `<tr>
                <td>${user.UserID}</td>
                <td>${user.Name}</td>
                <td>${user.Email}</td>
                <td>
                    <button onclick="editUser(${user.UserID})">Edit</button>
                    <button onclick="deleteUser(${user.UserID})">Delete</button>
                </td>
            </tr>`;
            userTable.innerHTML += row;
        });
    }

    // Handle Form Submission
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userID = document.getElementById('userID').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const endpoint = userID ? `/api/users/${userID}` : '/api/register';
        const method = userID ? 'PUT' : 'POST';

        try {
            const response = await fetch(`http://localhost:5001${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) throw new Error('Error saving user');

            userForm.reset();
            document.getElementById('userID').value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    });

    // Edit User
    window.editUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/${id}`);
            const user = await response.json();

            document.getElementById('userID').value = user.UserID;
            document.getElementById('name').value = user.Name;
            document.getElementById('email').value = user.Email;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // Delete User
    window.deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:5001/api/users/${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Initial Fetch
    fetchUsers();
});