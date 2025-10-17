import { writable } from 'svelte/store';

const initialFormData = {
  namaMarketing: '',
  namaPengantin: '',
  hari: '',
  gedung: '',
  noTelp: '',
  alamat: '',
  adatAkad: '',
  resepsi: '',
  warnaHandbouquet: '',
  pilihanMua: '',
  pengantinWanita: {
    akad: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: [] },
    resepsi: { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: [] }
  },
  pengantinPria: {
    akad: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: [] },
    resepsi: { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: []}
  }
};

export const formData = writable(initialFormData);

export function resetForm() {
  formData.set(JSON.parse(JSON.stringify(initialFormData)));
}