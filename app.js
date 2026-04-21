const BASE = "https://your-app.onrender.com";

// TAB
function showTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// INIT
window.onload = () => {
    showTab("users");
    loadUsers();
};

// ================= USERS =================
async function loadUsers() {
    let res = await fetch(BASE + "/users");
    let data = await res.json();

    let table = document.getElementById("user_table");
    let select = document.getElementById("face_user");

    table.innerHTML = "";
    select.innerHTML = "";

    data.forEach(u => {
        table.innerHTML += `
        <tr onclick="selectUser('${u.user_code}', '${u.full_name}')">
            <td>${u.user_code}</td>
            <td>${u.full_name}</td>
        </tr>`;

        select.innerHTML += `<option value="${u.user_code}">${u.full_name}</option>`;
    });
}

function selectUser(code, name) {
    document.getElementById("code").value = code;
    document.getElementById("name").value = name;
}

// CREATE
async function createUser() {
    let form = new FormData();
    form.append("user_code", code.value);
    form.append("full_name", name.value);

    await fetch(BASE + "/users", { method: "POST", body: form });
    loadUsers();
}

// UPDATE
async function updateUser() {
    let form = new FormData();
    form.append("user_code", code.value);
    form.append("full_name", name.value);

    await fetch(BASE + "/users/update", { method: "POST", body: form });
    loadUsers();
}

// DELETE
async function deleteUser() {
    await fetch(BASE + `/users/delete?user_code=${code.value}`, {
        method: "DELETE"
    });
    loadUsers();
}

// ================= FACE =================
async function registerFace() {
    let form = new FormData();
    form.append("user_code", face_user.value);

    for (let f of face_files.files) {
        form.append("files", f);
    }

    let res = await fetch(BASE + "/register-face", {
        method: "POST",
        body: form
    });

    face_result.innerText = JSON.stringify(await res.json(), null, 2);
}

// DELETE FACE
async function deleteFace() {
    await fetch(BASE + `/face/delete?user_code=${face_user.value}`, {
        method: "DELETE"
    });

    face_result.innerText = "Đã xóa embedding";
}

// ================= LOG =================
async function loadLogs() {
    let res = await fetch(BASE + "/logs");
    let data = await res.json();

    let table = document.getElementById("log_table");
    table.innerHTML = "";

    data.forEach(l => {
        table.innerHTML += `
        <tr>
            <td>${l.full_name_snapshot}</td>
            <td>${l.identify_method}</td>
            <td>${l.result}</td>
            <td>${l.time}</td>
        </tr>`;
    });
}
