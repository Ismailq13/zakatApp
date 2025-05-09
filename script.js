function hitungSemuaZakat() {
  let hasil = "";
  let totalZakat = 0; // Variabel untuk menyimpan total zakat

  // Fitrah
  const hargaBeras = parseFloat(document.getElementById("hargaBeras").value);
  if (!isNaN(hargaBeras)) {
    const zakatFitrah = 2.8 * hargaBeras;
    hasil += `✅ Zakat Fitrah: Rp ${zakatFitrah.toLocaleString()}<br>`;
    totalZakat += zakatFitrah;
  }

  // Maal
  const hartaMaal = parseFloat(document.getElementById("hartaMaal").value);
  if (!isNaN(hartaMaal)) {
    const zakatMaal = hartaMaal * 0.025;
    hasil += `✅ Zakat Maal: Rp ${zakatMaal.toLocaleString()}<br>`;
    totalZakat += zakatMaal;
  }

  // Emas
  const gramEmas = parseFloat(document.getElementById("gramEmas").value);
  const hargaEmas = parseFloat(document.getElementById("hargaEmas").value);
  if (!isNaN(gramEmas) && !isNaN(hargaEmas)) {
    const zakatEmas = gramEmas * hargaEmas * 0.025;
    hasil += `✅ Zakat Emas/Perak: Rp ${zakatEmas.toLocaleString()}<br>`;
    totalZakat += zakatEmas;
  }

  // Ternak
  const jumlahSapi = parseInt(document.getElementById("jumlahSapi").value);
  if (!isNaN(jumlahSapi)) {
    if (jumlahSapi >= 30) {
      hasil += `✅ Zakat Ternak: 1 ekor anak sapi (umur 1 tahun)<br>`;
    } else {
      hasil += `ℹ️ Zakat Ternak: Belum mencapai nisab<br>`;
    }
  }

  // Perdagangan
  const nilaiDagang = parseFloat(document.getElementById("nilaiDagang").value);
  if (!isNaN(nilaiDagang)) {
    const zakatDagangan = nilaiDagang * 0.025;
    hasil += `✅ Zakat Perdagangan: Rp ${zakatDagangan.toLocaleString()}<br>`;
    totalZakat += zakatDagangan;
  }

  if (hasil === "") {
    hasil = "⚠️ Silakan isi minimal satu data zakat yang ingin dihitung.";
  }

  // Menampilkan total zakat
  hasil += `<br><strong>Total Zakat yang harus dibayar: Rp ${totalZakat.toLocaleString()}</strong>`;

  document.getElementById("zakat-result").innerHTML = hasil;
}

function kirimPesan() {
    const input = document.getElementById("chat-input");
    const chatBox = document.getElementById("chat-box");
    const userMessage = input.value.trim();
    
    if (userMessage === "") return;

    // Tampilkan pesan user
    const userMsg = document.createElement("div");
    userMsg.className = "message";
    userMsg.textContent = "Anda: " + userMessage;
    chatBox.appendChild(userMsg);

    // Tampilkan loading dari bot
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = "Bot: Menunggu jawaban...";
    chatBox.appendChild(botMsg);

    // Kirim pertanyaan ke backend Flask
    fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        botMsg.textContent = "Bot: " + data.answer;
    })
    .catch(error => {
        botMsg.textContent = "Bot: Terjadi kesalahan.";
        console.error("Error:", error);
    });

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
