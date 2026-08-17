# Jadual Harian (Local-First PWA) 📝

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![IndexedDB](https://img.shields.io/badge/IndexedDB-4F46E5?style=for-the-badge&logo=database&logoColor=white)

Sebuah Aplikasi Web Progresif (PWA) ringkas dan modular untuk pengurusan senarai tugas (To-Do List). Direka berasaskan konsep **"Local-First"**, aplikasi ini menggunakan IndexedDB untuk menyimpan data terus ke dalam peranti pengguna tanpa sebarang pautan ke pangkalan data luaran (Cloud). 

Sangat ringan, pantas, dan menjamin 100% privasi data.

---

## 🌟 Ciri-ciri Utama

- **Local-First & Offline Ready:** Berfungsi sepenuhnya walaupun tanpa sambungan internet.
- **Penyimpanan Asli (Native DB):** Menggunakan IndexedDB untuk menyimpan, membaca, dan mengemaskini data pada pelayar (browser).
- **Struktur Modular:** Kod JavaScript dipecahkan kepada modul (`db.js`, `ui.js`, `app.js`) agar mudah diurus dan dikembangkan.
- **Progressive Web App (PWA):** Boleh dipasang (install) terus ke peranti mudah alih (iOS/Android) atau komputer meja melalui butang *Add to Home Screen*.
- **Mesra Pengguna (UI/UX):** Antara muka yang bersih, moden (konsep Vibe-Code), dan responsif.

---

## 📂 Struktur Projek

Projek ini dibina tanpa bergantung kepada kerangka kerja pihak ketiga (Zero Dependencies) bagi memastikan kepantasan yang maksimum.

```text
📦 jadual-harian-pwa
 ┣ 📂 js
 ┃ ┣ 📜 app.js       # Logik utama & Pendaftaran Service Worker
 ┃ ┣ 📜 db.js        # Logik Pangkalan Data (IndexedDB CRUD)
 ┃ ┗ 📜 ui.js        # Modul Manipulasi DOM (Render data ke skrin)
 ┣ 📜 index.html     # Fail struktur antaramuka utama
 ┣ 📜 style.css      # Pemformatan gaya moden
 ┣ 📜 manifest.json  # Konfigurasi PWA
 ┣ 📜 sw.js          # Skrip Service Worker untuk cache luar talian
 ┗ 📜 README.md      # Dokumentasi projek
