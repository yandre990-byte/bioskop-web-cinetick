// detail-film.js

// Ambil elemen
const filmSelect   = document.getElementById("film");
const tanggalInput = document.getElementById("tanggal");
const jamSelect    = document.getElementById("jam");
const seatButtons  = document.querySelectorAll(".seat");

const tFilm   = document.getElementById("t-film");
const tTanggal= document.getElementById("t-tanggal");
const tJam    = document.getElementById("t-jam");
const tKursi  = document.getElementById("t-kursi");
const tJumlah = document.getElementById("t-jumlah");
const tTotal  = document.getElementById("t-total");

let selectedSeats = [];

// Format ke rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// Update isi e-ticket
function updateTicket() {
    const filmText = filmSelect.value;
    const price = Number(filmSelect.selectedOptions[0].dataset.price || 0);
    const tanggalVal = tanggalInput.value;
    const jamVal = jamSelect.value;
    const jumlah = selectedSeats.length;
    const total = price * jumlah;

    tFilm.textContent = filmText || "-";
    tJam.textContent  = jamVal || "-";

    if (tanggalVal) {
        const t = new Date(tanggalVal);
        const opt = { day: "2-digit", month: "2-digit", year: "numeric" };
        tTanggal.textContent = t.toLocaleDateString("id-ID", opt);
    } else {
        tTanggal.textContent = "-";
    }

    tKursi.textContent = jumlah > 0 ? selectedSeats.join(", ") : "Belum dipilih";
    tJumlah.textContent = jumlah;
    tTotal.textContent  = total > 0 ? formatRupiah(total) : "Rp0";
}

// Klik kursi
seatButtons.forEach(btn => {
    if (btn.classList.contains("occupied")) return;

    btn.addEventListener("click", () => {
        const seatCode = btn.dataset.seat;

        if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
            selectedSeats = selectedSeats.filter(s => s !== seatCode);
        } else {
            btn.classList.add("selected");
            selectedSeats.push(seatCode);
        }

        updateTicket();
    });
});

// Perubahan pilihan film / tanggal / jam
filmSelect.addEventListener("change", updateTicket);
tanggalInput.addEventListener("change", updateTicket);
jamSelect.addEventListener("change", updateTicket);

// Tombol "Lanjut ke Pembayaran"
function lanjutPembayaran() {
    if (selectedSeats.length === 0) {
        alert("Pilih minimal satu kursi dulu ya.");
        return;
    }
    window.location.href = "pembayaran.html";
}

// Daftar event ke tombol bayar
const btnBayar = document.querySelector(".btn-bayar");
if (btnBayar) {
    btnBayar.addEventListener("click", lanjutPembayaran);
}

// Set default tanggal = hari ini + update awal
window.addEventListener("DOMContentLoaded", () => {
    if (tanggalInput) {
        const today = new Date().toISOString().split("T")[0];
        tanggalInput.value = today;
    }
    updateTicket();
});
