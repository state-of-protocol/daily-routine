const DB_NAME = 'JadualHarianDB';
const STORE_NAME = 'tugas';
const DB_VERSION = 1;

// Buka sambungan pangkalan data
export function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('tarikh', 'tarikh', { unique: false });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Tambah tugas baru
export async function tambahTugas(teks) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const tugas = { teks, selesai: false, tarikh: new Date().getTime() };
        
        const request = store.add(tugas);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Dapatkan semua tugas
export async function dapatkanSemuaTugas() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Kemaskini status tugas (tick)
export async function kemaskiniTugas(id, selesai) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        
        const reqAmbil = store.get(id);
        reqAmbil.onsuccess = () => {
            const data = reqAmbil.result;
            data.selesai = selesai;
            const reqKemaskini = store.put(data);
            reqKemaskini.onsuccess = () => resolve();
        };
        reqAmbil.onerror = () => reject();
    });
}

// Padam tugas
export async function padamTugas(id) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}
