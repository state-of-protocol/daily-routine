import { dapatkanSemuaTugas, tambahTugas, kemaskiniTugas, padamTugas } from './db.js';

const senaraiTugas = document.getElementById('senarai-tugas');

// Fungsi untuk masukkan jadual automatik jika pangkalan data masih kosong
async function initJadual() {
    const tugas = await dapatkanSemuaTugas();
    if (tugas.length === 0) { 
        const jadualDefault = [
            "Hantar adik ke USIM (6:46 AM)",
            "Tugas Masjid / Zikir Pagi",
            "Fasa Produktif: Bina Modul/Web",
            "Ambil adik dari USIM (3:45 PM)",
            "Sesi Luahan / Refleksi Diri"
        ];
        for (const item of jadualDefault) {
            await tambahTugas(item);
        }
        location.reload(); // Muat semula untuk paparkan data terkini
    }
}

// Render senarai ke skrin
export async function muatSenaraiUI() {
    await initJadual(); // Semak dan isi jadual default jika kosong
    senaraiTugas.innerHTML = ''; 
    const tugasArray = await dapatkanSemuaTugas();

    tugasArray.forEach(tugas => {
        const li = document.createElement('li');
        if (tugas.selesai) li.classList.add('selesai');

        li.innerHTML = `
            <div class="aksi-tugas">
                <input type="checkbox" class="checkbox-bulat" data-id="${tugas.id}" ${tugas.selesai ? 'checked' : ''}>
                <span>${tugas.teks}</span>
            </div>
            <button class="btn-padam" data-id="${tugas.id}">Padam</button>
        `;
        senaraiTugas.appendChild(li);
    });

    pasangListener();
}

// Pasang event listener untuk butang tick dan padam
function pasangListener() {
    // Tick Checkbox
    document.querySelectorAll('.checkbox-bulat').forEach(box => {
        box.addEventListener('change', async (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            await kemaskiniTugas(id, e.target.checked);
            muatSenaraiUI(); // Refresh UI
        });
    });

    // Butang Padam
    document.querySelectorAll('.btn-padam').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            await padamTugas(id);
            muatSenaraiUI(); // Refresh UI
        });
    });
}
