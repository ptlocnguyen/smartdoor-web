const BASE_URL = "https://face-api-z57y.onrender.com";

// =========================
// REGISTER FACE
// =========================
async function registerFace() {
    const userCode = document.getElementById("user_code").value;
    const files = document.getElementById("files").files;

    let formData = new FormData();
    formData.append("user_code", userCode);

    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }

    try {
        let res = await fetch(`${BASE_URL}/register-face`, {
            method: "POST",
            body: formData
        });

        let data = await res.json();

        document.getElementById("register_result").innerText =
            JSON.stringify(data, null, 2);

    } catch (err) {
        document.getElementById("register_result").innerText =
            "Lỗi: " + err;
    }
}

// =========================
// RECOGNIZE
// =========================
async function recognize() {
    const file = document.getElementById("test_file").files[0];

    let formData = new FormData();
    formData.append("file", file);

    try {
        let res = await fetch(`${BASE_URL}/recognize`, {
            method: "POST",
            body: formData
        });

        let data = await res.json();

        document.getElementById("recognize_result").innerText =
            JSON.stringify(data, null, 2);

    } catch (err) {
        document.getElementById("recognize_result").innerText =
            "Lỗi: " + err;
    }
}
