import { tambahTugas } from './db.js';
import { muatSenaraiUI } from './ui.js';

const form = document.getElementById('form-tugas');
const input = document.getElementById('input-tugas');

// Init sistem apabila fail dimuatkan
document.addEventListener('DOMContentLoaded', () => {
    muatSenaraiUI();
    daftarServiceWorker();
});

// Proses borang
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const teks = input.value.trim();
    
    if (teks !== '') {
        await tambahTugas(teks);
        input.value = '';
        muatSenaraiUI(); // Refresh UI selepas tambah
    }
});

// Pendaftaran PWA (Service Worker)
function daftarServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker Didaftarkan!', reg.scope))
                .catch(err => console.log('Gagal daftar Service Worker:', err));
        });
    }
}
