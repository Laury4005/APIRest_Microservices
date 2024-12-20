// Función para obtener los comentarios de un usuario por su ID
async function viewComments(userId) {
  try {
      // Obtener los comentarios del usuario desde la API
      const response = await fetch(`http://localhost:4000/api/comments/userId/${userId}`);
      const comments = await response.json();

      // Llenar el contenedor con los comentarios
      const commentsContainer = document.getElementById('commentsContainer');
      commentsContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los comentarios

      if (comments.length === 0) {
          commentsContainer.innerHTML = "<p>No hay comentarios para este usuario.</p>";
      } else {
          comments.forEach(comment => {
              const commentDiv = document.createElement('div');
              commentDiv.classList.add('comment');
              commentDiv.innerHTML = `<p><strong>Comentario:</strong> ${comment.comment}</p>`;
              commentsContainer.appendChild(commentDiv);
          });
      }

      // Mostrar el modal con los comentarios
      $('#viewCommentsModal').modal('show');
  } catch (error) {
      console.error("Error al cargar los comentarios:", error);
  }
}

// Función para cargar los usuarios cuando se haga clic en el botón
async function getUsers() {
  const userTableBody = document.getElementById('userTableBody');

  if (!userTableBody) {
      console.error("No se encontró el elemento 'userTableBody'");
      return;
  }

  try {
      // Realizar una solicitud GET para obtener los usuarios
      const response = await fetch('http://localhost:5000/api/users');

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
          throw new Error('No se pudo obtener la lista de usuarios');
      }

      const users = await response.json();

      // Limpiar el contenido actual de la tabla
      userTableBody.innerHTML = '';

      // Llenar la tabla con los usuarios obtenidos
      users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${user._id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>
                  <button class="btn btn-secondary" onclick="viewComments('${user._id}')">Ver Comentarios</button>
                  <button class="btn btn-warning" onclick="editUser('${user._id}')">Editar</button>
                  <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Eliminar</button>
              </td>
          `;
          userTableBody.appendChild(row);
      });

  } catch (error) {
      console.error('Error al cargar los usuarios:', error);
  }
}

// Función para eliminar un usuario por su ID
async function deleteUser(userId) {
  try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE'
      });

      if (response.ok) {
          alert('Usuario eliminado');
          window.location.reload(); // Recargar la página para actualizar la lista de usuarios
      } else {
          alert('Error al eliminar el usuario');
      }
  } catch (error) {
      console.error('Error al eliminar el usuario:', error);
  }
}

// Función para editar un usuario por su ID
async function editUser(userId) {
  // Mostrar el modal
  $('#editUserModal').modal('show');

  try {
      // Obtener los datos del usuario
      const response = await fetch(`http://localhost:5000/api/users/userId/${userId}`);
      const user = await response.json();

      // Llenar el formulario con los datos del usuario
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('password').value = ''; // La contraseña se deja vacía por seguridad
  } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
  }

  // Guardar cambios al hacer clic en el botón "Guardar cambios"
  document.getElementById('saveChangesBtn').onclick = async () => {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch(`http://localhost:5000/api/users/userId/${userId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, password })
          });

          if (response.ok) {
              alert('Usuario actualizado');
              $('#editUserModal').modal('hide');
              window.location.reload(); // Recargar la página para actualizar la lista de usuarios
          } else {
              alert('Error al actualizar el usuario');
          }
      } catch (error) {
          console.error('Error al actualizar el usuario:', error);
      }
  };
}

// Agregar el evento al botón para cargar los usuarios
const getUsersBtn = document.getElementById('getUsersBtn');
if (getUsersBtn) {
  getUsersBtn.addEventListener("click", getUsers);
} else {
  console.error("No se encontró el botón 'getUsersBtn'");
}
