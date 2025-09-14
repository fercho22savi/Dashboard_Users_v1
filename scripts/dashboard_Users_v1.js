// --- Buscar usuario ---
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toLowerCase();
    let rows = document.querySelectorAll("#userTable tbody tr");
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// --- Copiar tabla ---
const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
    let range = document.createRange();
    range.selectNode(document.getElementById("userTable"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("📋 Tabla copiada al portapapeles!");
});

// --- Exportar CSV ---
const csvBtn = document.getElementById("csvBtn");
csvBtn.addEventListener("click", () => {
    let rows = document.querySelectorAll("table tr");
    let csv = [];
    rows.forEach(row => {
        let cols = row.querySelectorAll("td, th");
        let rowData = [];
        cols.forEach(col => rowData.push(col.innerText));
        csv.push(rowData.join(","));
    });
    let csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
    let link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// --- Ver detalles de usuario ---
const rows = document.querySelectorAll("#userTable tbody tr");
const modal = document.getElementById("userModal");
const modalInfo = document.getElementById("modalInfo");
const closeModal = document.getElementById("closeModal");

rows.forEach(row => {
    row.addEventListener("click", () => {
        let data = Array.from(row.children).map(td => td.innerText);
        modalInfo.innerHTML = `
      <b>Usuario:</b> ${data[0]}<br>
      <b>Nombre:</b> ${data[1]}<br>
      <b>Email:</b> ${data[2]}<br>
      <b>Email verificado:</b> ${data[3]}<br>
      <b>Última actividad:</b> ${data[4]}<br>
      <b>Última actualización:</b> ${data[5]}<br>
      <b>Admin:</b> ${data[6]}
    `;
        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});
