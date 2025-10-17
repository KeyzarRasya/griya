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
  },

  // 👇 Tambahkan ini
  orangTua: {
    orangTuaPengantin: {
      cpwBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
      ibu: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
      cppBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
      ibuCpp: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
    },
    amongTamu: {
      pria: [{ nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }],
      wanita: [{ nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }]
    },
    penerimaBukuTamu: [
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
    ]
  }
};


export const formData = writable(initialFormData);

export function resetForm() {
  formData.set(JSON.parse(JSON.stringify(initialFormData)));
}