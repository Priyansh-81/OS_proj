document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.querySelector('#userTable tbody');

    // Sample Data (Replace with data from your database)
    let users = [
        { userID: 1, name: 'John Doe', email: 'john@example.com' },
        { userID: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    // Render Users in the Table
    function renderUsers() {
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = `<tr>
                <td>${user.userID}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.userID})">Edit</button>
                    <button onclick="deleteUser(${user.userID})">Delete</button>
                </td>
            </tr>`;
            userTable.innerHTML += row;
        });
    }

    // Handle Form Submission
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userID = document.getElementById('userID').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (userID) {
            // Update User
            const user = users.find(u => u.userID == userID);
            if (user) {
                user.name = name;
                user.email = email;
            }
        } else {
            // Add User (Simulate auto-increment ID)
            const newUser = {
                userID: users.length ? users[users.length - 1].userID + 1 : 1,
                name,
                email
            };
            users.push(newUser);
        }

        userForm.reset();
        document.getElementById('userID').value = '';
        renderUsers();
    });

    // Edit User
    window.editUser = (id) => {
        const user = users.find(u => u.userID == id);
        if (user) {
            document.getElementById('userID').value = user.userID;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
        }
    };

    // Delete User
    window.deleteUser = (id) => {
        users = users.filter(user => user.userID !== id);
        renderUsers();
    };

    // Initial Render
    renderUsers();
});
