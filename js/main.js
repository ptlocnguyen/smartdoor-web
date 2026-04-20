function showTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// ===== USER =====
async function createUser() {
    const name = document.getElementById("u_name").value;
    const phone = document.getElementById("u_phone").value;

    const res = await post("/users/create", { name, phone });

    document.getElementById("createdUser").innerHTML =
        "User ID: " + res.user_id;

    loadUsers();
}

async function loadUsers() {
    const users = await get("/users");

    document.getElementById("userList").innerHTML =
        users.map(u => `<div>${u.name}</div>`).join("");

    document.getElementById("userSelect").innerHTML =
        users.map(u => `<option value="${u.user_id}">${u.name}</option>`).join("");
}

// ===== FACE REGISTER =====
async function registerFaceUI() {
    const user_id = document.getElementById("userSelect").value;
    const files = document.getElementById("faceFiles").files;

    for (let f of files) {
        const form = new FormData();
        form.append("file", f);

        await fetch(API + `/face/register?user_id=${user_id}`, {
            method: "POST",
            body: form
        });
    }

    alert("Done");
}

// ===== RECOGNIZE =====
async function recognize() {
    const file = document.getElementById("recognizeFile").files[0];
    const form = new FormData();
    form.append("file", file);

    const res = await post("/face/recognize", form, true);

    document.getElementById("result").innerHTML =
        JSON.stringify(res);
}

// ===== WEBCAM =====
let video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
    video.srcObject = s;
});

async function capture() {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 240;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 240, 240);

    canvas.toBlob(async blob => {
        const res = await post("/face/recognize", (() => {
            const f = new FormData();
            f.append("file", blob);
            return f;
        })(), true);

        document.getElementById("result").innerHTML =
            JSON.stringify(res);
    }, "image/jpeg", 0.7);
}

// ===== LOG =====
async function loadLogs() {
    const logs = await get("/logs");

    document.getElementById("logList").innerHTML =
        logs.map(l =>
            `<div>${l.time} | ${l.user_id} | ${l.method} | ${l.result}</div>`
        ).join("");
}

// init
loadUsers();