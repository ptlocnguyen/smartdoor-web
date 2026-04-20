function showTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
    document.getElementById(id).style.display = "block";
}

function showResult(data) {
    const box = document.getElementById("resultBox");

    if (!data) return;

    if (data.result === "success") {
        box.innerHTML = `
            <div class="success">
                Nhận diện: ${data.user_id} <br>
                Score: ${data.score.toFixed(3)}
            </div>
        `;
    } else {
        box.innerHTML = `<div class="fail">Không nhận diện được</div>`;
    }
}