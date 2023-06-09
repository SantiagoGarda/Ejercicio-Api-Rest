const BASE_URL= "https://647dd4d6af984710854a6fcc.mockapi.io/users"
//capturo modal para poder abrirlo y cerrarlo
const modal = document.getElementById("modal");
//capturo formulario para escuchar su imput submit
const form = document.getElementById("form");
//capturo boton closeModal
const closeModal = document.getElementById("closeModal")
//capturo input del modal
let nuevoName = document.getElementById("nombre");
let nuevoEmail = document.getElementById("emails");
let nuevoPhone = document.getElementById("telefono");
function getUsers() {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
         data.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));//metodo sort para ordenar "es" y sensitivy son opcionales
        const table = document.getElementById("usersTable");
        table.innerHTML = ""; // Limpiar la tabla antes de volver a cargar los datos
        data.forEach(user => {
          const row = table.insertRow();
          row.insertCell().textContent = user.id;
          row.insertCell().textContent = user.name;
          row.insertCell().textContent = user.email;
          row.insertCell().textContent = user.phone;
          row.insertCell().innerHTML = `<button onclick="deleteOne(${user.id})">Eliminar</button>`;
          row.insertCell().innerHTML = `<button onclick="upDateOne(${user.id})">Modificar</button>`;
        });
      })
      .catch(err => console.error(err));
  }
  function createUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const user = {
      name: name,
      email: email,
      phone: phone,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        getUsers();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
      })
      .catch((error) => console.error(error));
  }
  
  function deleteOne(id) {
    fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getUsers();
      })
      .catch((err) => console.error(err));
  }
  
  function upDateOne(id) {
    let user1 = undefined;
    modal.showModal();
    closeModal.addEventListener("click", () => {
      modal.close();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      user1 = userModified();
      modifier(id, user1);
    });
  }
  
  function userModified() {
    const user = {
      name: nuevoName.value,
      email: nuevoEmail.value,
      phone: nuevoPhone.value,
    };
    return user;
  }
  
  function modifier(id, usuario) {
    fetch(BASE_URL + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then(() => {
        getUsers();
        modal.close();
      })
      .catch((err) => console.error(err));
  }
  
  getUsers();