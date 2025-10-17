<!-- ============================================ -->
<!-- FILE: src/lib/components/OrangTuaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';
  import { dressColors } from '$lib/data/mockData.js';

  // Initialize orang tua data if not exists
  if (!$formData.orangTua) {
    $formData.orangTua = {
      orangTuaPengantin: {
        cpwBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        cpwIbu: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        cppBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        cppIbu: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
      },
      amongTamu: {
        pria: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
        ],
        wanita: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: 'Hijab', keterangan: '' }
        ]
      },
      penerimaBukuTamu: [
        { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: 'Hijab', keterangan: '' }
      ]
    };
  }

  function addAmongPria() {
    $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
    ];
  }

  function removeAmongPria(index) {
    if ($formData.orangTua.amongTamu.pria.length > 1) {
      $formData.orangTua.amongTamu.pria.splice(index, 1);
      $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria];
    }
  }

  function addAmongWanita() {
    $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: 'Hijab', keterangan: '' }
    ];
  }

  function removeAmongWanita(index) {
    if ($formData.orangTua.amongTamu.wanita.length > 1) {
      $formData.orangTua.amongTamu.wanita.splice(index, 1);
      $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita];
    }
  }

  function addPenerimaBukuTamu() {
    $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: 'Hijab', keterangan: '' }
    ];
  }

  function removePenerimaBukuTamu(index) {
    if ($formData.orangTua.penerimaBukuTamu.length > 1) {
      $formData.orangTua.penerimaBukuTamu.splice(index, 1);
      $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu];
    }
  }
</script>

<div class="space-y-8">
  <!-- Busana Orang Tua Pengantin Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">BUSANA ORANG TUA PENGANTIN</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
            <th class="px-4 py-2 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Orang Tua Pengantin -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300" colspan="7">Orang Tua Pengantin :</td>
          </tr>
          
          <!-- CPW Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-300 align-top" rowspan="2">CPW</td>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Bp.</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- CPW Ibu -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Ibu</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwIbu.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- CPP Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-300 align-top" rowspan="2">CPP</td>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Bp.</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- CPP Ibu -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Ibu</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap w-16">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppIbu.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Among Tamu / Pagar Ayu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">AMONG TAMU / PAGAR AYU</h3>

    <!-- Among Pria -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-800 mb-4">Among Pria</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.pria as pria, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongPria(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-3">
        <button type="button" on:click={addAmongPria} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
    </div>

    <!-- Among Wanita -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-4">Among Wanita</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.wanita as wanita, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <select bind:value={wanita.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                    <option value="Hijab">Hijab</option>
                    <option value="Hairdo">Hairdo</option>
                  </select>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongWanita(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-3">
        <button type="button" on:click={addAmongWanita} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
    </div>
  </div>

  <!-- Penerima Buku Tamu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">PENERIMA BUKU TAMU</h3>

    <h4 class="font-semibold text-gray-800 mb-4">Penerima Buku Tamu</h4>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.orangTua.penerimaBukuTamu as penerima, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <select bind:value={penerima.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                  <option value="Hijab">Hijab</option>
                  <option value="Hairdo">Hairdo</option>
                </select>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenerimaBukuTamu(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-3">
      <button type="button" on:click={addPenerimaBukuTamu} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Baris
      </button>
    </div>
  </div>
</div><!-- ============================================ -->
<!-- FILE: src/lib/components/OrangTuaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';
  import { dressColors } from '$lib/data/mockData.js';

  // Initialize orang tua data if not exists
  if (!$formData.orangTua) {
    $formData.orangTua = {
      orangTuaPengantin: {
        cpwBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        ibu: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', keterangan: '' },
        cppBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        ibuCpp: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', keterangan: '' }
      },
      amongTamu: {
        pria: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
        ],
        wanita: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
        ]
      },
      penerimaBukuTamu: [
        { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
      ]
    };
  }

  function addAmongPria() {
    $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
    ];
  }

  function removeAmongPria(index) {
    if ($formData.orangTua.amongTamu.pria.length > 1) {
      $formData.orangTua.amongTamu.pria.splice(index, 1);
      $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria];
    }
  }

  function addAmongWanita() {
    $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removeAmongWanita(index) {
    if ($formData.orangTua.amongTamu.wanita.length > 1) {
      $formData.orangTua.amongTamu.wanita.splice(index, 1);
      $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita];
    }
  }

  function addPenerimaBukuTamu() {
    $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removePenerimaBukuTamu(index) {
    if ($formData.orangTua.penerimaBukuTamu.length > 1) {
      $formData.orangTua.penerimaBukuTamu.splice(index, 1);
      $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu];
    }
  }
</script>

<div class="space-y-8">
  <!-- Busana Orang Tua Pengantin Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">BUSANA ORANG TUA PENGANTIN</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
            <th class="px-4 py-2 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Orang Tua Pengantin -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300" colspan="6">Orang Tua Pengantin :</td>
          </tr>
          
          <!-- CPW Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">CPW : Bp.</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- Ibu -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Ibu</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- CPP Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">CPP : Bp.</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>

          <!-- Ibu CPP -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">
              <div class="flex items-center gap-2">
                <span class="whitespace-nowrap">Ibu</span>
                <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.nama} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" placeholder="Nama..." />
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Akad:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.akad} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm whitespace-nowrap">Resepsi:</span>
                  <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.resepsi} class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </div>
              </div>
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Among Tamu / Pagar Ayu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">AMONG TAMU / PAGAR AYU</h3>

    <!-- Among Pria -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-800 mb-4">Among Pria</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.pria as pria, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongPria(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-3">
        <button type="button" on:click={addAmongPria} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
    </div>

    <!-- Among Wanita -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-4">Among Wanita</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.wanita as wanita, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongWanita(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-3">
        <button type="button" on:click={addAmongWanita} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
    </div>
  </div>

  <!-- Penerima Buku Tamu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">PENERIMA BUKU TAMU</h3>

    <h4 class="font-semibold text-gray-800 mb-4">Penerima Buku Tamu</h4>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.orangTua.penerimaBukuTamu as penerima, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenerimaBukuTamu(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-3">
      <button type="button" on:click={addPenerimaBukuTamu} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Baris
      </button>
    </div>
  </div>
</div>

<!-- ============================================ -->
<!-- FILE: src/lib/components/RincianBiayaForm.svelte -->
<!-- (REMAINS UNCHANGED FROM PREVIOUS VERSION) -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';

  // Initialize rincian biaya data if not exists
  if (!$formData.rincianBiaya) {
    $formData.rincianBiaya = {
      namaPengantin: '',
      tanggalAcara: '',
      pilihanPaket: '',
      perincianBiaya: {
        hargaPaket: { qty: 1, harga: 0, total: 0 },
        penambahan: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ],
        lainnya: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ]
      },
      perincianPembayaran: [
        { tanggal: '', cashTransfer: '', jumlah: 0 }
      ]
    };
  }

  $: {
    // Auto calculate total for harga paket
    if ($formData.rincianBiaya?.perincianBiaya?.hargaPaket) {
      $formData.rincianBiaya.perincianBiaya.hargaPaket.total = 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.qty * 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.harga;
    }

    // Auto calculate total for penambahan items
    if ($formData.rincianBiaya?.perincianBiaya?.penambahan) {
      $formData.rincianBiaya.perincianBiaya.penambahan = 
        $formData.rincianBiaya.perincianBiaya.penambahan.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }

    // Auto calculate total for lainnya items
    if ($formData.rincianBiaya?.perincianBiaya?.lainnya) {
      $formData.rincianBiaya.perincianBiaya.lainnya = 
        $formData.rincianBiaya.perincianBiaya.lainnya.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }
  }

  $: totalBiaya = calculateTotalBiaya();
  $: totalPembayaran = calculateTotalPembayaran();
  $: sisaPembayaran = totalBiaya - totalPembayaran;

  function calculateTotalBiaya() {
    if (!$formData.rincianBiaya?.perincianBiaya) return 0;
    
    let total = $formData.rincianBiaya.perincianBiaya.hargaPaket?.total || 0;
    
    $formData.rincianBiaya.perincianBiaya.penambahan?.forEach(item => {
      total += item.total || 0;
    });
    
    $formData.rincianBiaya.perincianBiaya.lainnya?.forEach(item => {
      total += item.total || 0;
    });
    
    return total;
  }

  function calculateTotalPembayaran() {
    if (!$formData.rincianBiaya?.perincianPembayaran) return 0;
    return $formData.rincianBiaya.perincianPembayaran.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  }

  function addPenambahan() {
    $formData.rincianBiaya.perincianBiaya.penambahan = [
      ...$formData.rincianBiaya.perincianBiaya.penambahan,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removePenambahan(index) {
    if ($formData.rincianBiaya.perincianBiaya.penambahan.length > 1) {
      $formData.rincianBiaya.perincianBiaya.penambahan.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.penambahan = [...$formData.rincianBiaya.perincianBiaya.penambahan];
    }
  }

  function addLainnya() {
    $formData.rincianBiaya.perincianBiaya.lainnya = [
      ...$formData.rincianBiaya.perincianBiaya.lainnya,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removeLainnya(index) {
    if ($formData.rincianBiaya.perincianBiaya.lainnya.length > 1) {
      $formData.rincianBiaya.perincianBiaya.lainnya.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.lainnya = [...$formData.rincianBiaya.perincianBiaya.lainnya];
    }
  }

  function addPembayaran() {
    $formData.rincianBiaya.perincianPembayaran = [
      ...$formData.rincianBiaya.perincianPembayaran,
      { tanggal: '', cashTransfer: '', jumlah: 0 }
    ];
  }

  function removePembayaran(index) {
    if ($formData.rincianBiaya.perincianPembayaran.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.splice(index, 1);
      $formData.rincianBiaya.perincianPembayaran = [...$formData.rincianBiaya.perincianPembayaran];
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  }
</script>

<div class="space-y-8">
  <!-- Header Information -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.namaPengantin} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
      <input 
        type="date" 
        bind:value={$formData.rincianBiaya.tanggalAcara} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Paket</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.pilihanPaket} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
  </div>

  <!-- Perincian Biaya Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Biaya</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Item</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Qty</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Harga</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Total Harga Items</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Harga Paket -->
          <tr>
            <td class="px-4 py-2 text-center text-sm border border-gray-300">1</td>
            <td class="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300">Harga Paket</td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.qty}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.harga}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
              {formatCurrency($formData.rincianBiaya.perincianBiaya.hargaPaket.total)}
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
          </tr>

          <!-- Penambahan Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">2</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">Penambahan</td>
          </tr>

          <!-- Penambahan Items -->
          {#each $formData.rincianBiaya.perincianBiaya.penambahan as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="text" 
                  bind:value={item.item}
                  placeholder="Nama item..."
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.qty}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.harga}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                {formatCurrency(item.total)}
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenambahan(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Lainnya Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">3</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">Lainnya</td>
          </tr>

          <!-- Lainnya Items -->
          {#each $formData.rincianBiaya.perincianBiaya.lainnya as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="text" 
                  bind:value={item.item}
                  placeholder="Nama item..."
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.qty}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.harga}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                {formatCurrency(item.total)}
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removeLainnya(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Biaya -->
          <tr class="bg-rose-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="4"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Biaya</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalBiaya)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end gap-3 mt-3">
      <button type="button" on:click={addPenambahan} class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm rounded transition duration-200">
        Tambah Penambahan
      </button>
      <button type="button" on:click={addLainnya} class="px-4 py-2 bg-green-400 hover:bg-green-500 text-white text-sm rounded transition duration-200">
        Tambah Lainnya
      </button>
    </div>
  </div>

  <!-- Perincian Pembayaran Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Pembayaran</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Tanggal Pembayaran</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Cash/Transfer</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Jumlah</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.rincianBiaya.perincianPembayaran as pembayaran, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="date" 
                  bind:value={pembayaran.tanggal}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <select 
                  bind:value={pembayaran.cashTransfer}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih</option>
                  <option value="Cash">Cash</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={pembayaran.jumlah}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePembayaran(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Pembayaran -->
          <tr class="bg-blue-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="3"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Pembayaran</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalPembayaran)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-3">
      <button type="button" on:click={addPembayaran} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Pembayaran
      </button>
    </div>
  </div>

  <!-- Summary Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Biaya</h4>
      <p class="text-2xl font-bold text-rose-600">{formatCurrency(totalBiaya)}</p>
    </div>
    
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Pembayaran</h4>
      <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalPembayaran)}</p>
    </div>
    
    <div class="bg-{sisaPembayaran > 0 ? 'yellow' : 'green'}-50 border-2 border-{sisaPembayaran > 0 ? 'yellow' : 'green'}-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Sisa Pembayaran</h4>
      <p class="text-2xl font-bold text-{sisaPembayaran > 0 ? 'yellow' : 'green'}-600">{formatCurrency(sisaPembayaran)}</p>
    </div>
  </div>

  <!-- Footer Signature -->
  <div class="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Pengantin</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( {$formData.rincianBiaya.namaPengantin || '_______________'} )</p>
      </div>
    </div>
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Griya Aristy</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( _______________ )</p>
      </div>
    </div>
  </div>
</div><!-- ============================================ -->
<!-- FILE: src/lib/components/OrangTuaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';
  import { dressColors } from '$lib/data/mockData.js';

  // Initialize orang tua data if not exists
  if (!$formData.orangTua) {
    $formData.orangTua = {
      orangTuaPengantin: {
        cpwBapak: { akad: '', resepsi: '' },
        ibu: { akad: '', resepsi: '' },
        cppBapak: { akad: '', resepsi: '' },
        ibuCpp: { akad: '', resepsi: '' }
      },
      amongTamu: {
        pria: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
        ],
        wanita: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
        ]
      },
      penerimaBukuTamu: [
        { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
      ]
    };
  }

  function addAmongPria() {
    $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
    ];
  }

  function removeAmongPria(index) {
    if ($formData.orangTua.amongTamu.pria.length > 1) {
      $formData.orangTua.amongTamu.pria.splice(index, 1);
      $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria];
    }
  }

  function addAmongWanita() {
    $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removeAmongWanita(index) {
    if ($formData.orangTua.amongTamu.wanita.length > 1) {
      $formData.orangTua.amongTamu.wanita.splice(index, 1);
      $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita];
    }
  }

  function addPenerimaBukuTamu() {
    $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removePenerimaBukuTamu(index) {
    if ($formData.orangTua.penerimaBukuTamu.length > 1) {
      $formData.orangTua.penerimaBukuTamu.splice(index, 1);
      $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu];
    }
  }
</script>

<div class="space-y-8">
  <!-- Busana Orang Tua Pengantin Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">BUSANA ORANG TUA PENGANTIN</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Akad</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Resepsi</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
            <th class="px-4 py-2 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Orang Tua Pengantin -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300" colspan="7">Orang Tua Pengantin :</td>
          </tr>
          
          <!-- CPW Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">CPW : Bp.</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- Ibu -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">Ibu</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- CPP Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">CPP : Bp.</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- Ibu CPP -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">Ibu</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Among Tamu / Pagar Ayu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">AMONG TAMU / PAGAR AYU</h3>

    <!-- Among Pria -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-semibold text-gray-800">Among Pria</h4>
        <button type="button" on:click={addAmongPria} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.pria as pria, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={pria.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenerimaBukuTamu(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>-300">
                  <button type="button" on:click={() => removeAmongPria(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Among Wanita -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-semibold text-gray-800">Among Wanita</h4>
        <button type="button" on:click={addAmongWanita} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.wanita as wanita, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <textarea bind:value={wanita.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongWanita(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Penerima Buku Tamu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">PENERIMA BUKU TAMU</h3>

    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-gray-600">Penerima Buku Tamu</span>
      <button type="button" on:click={addPenerimaBukuTamu} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Baris
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.orangTua.penerimaBukuTamu as penerima, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.warnaKode} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <textarea bind:value={penerima.keterangan} rows="2" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm resize-none"></textarea>
              </td>
              <td class="px-4 py-2 text-center border border-gray<!-- ============================================ -->
<!-- FILE: src/lib/components/OrangTuaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';
  import { dressColors } from '$lib/data/mockData.js';

  // Initialize orang tua data if not exists
  if (!$formData.orangTua) {
    $formData.orangTua = {
      orangTuaPengantin: {
        cpwBapak: { akad: '', resepsi: '' },
        ibu: { akad: '', resepsi: '' },
        cppBapak: { akad: '', resepsi: '' },
        ibuCpp: { akad: '', resepsi: '' }
      },
      amongTamu: {
        pria: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
        ],
        wanita: [
          { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
        ]
      },
      penerimaBukuTamu: [
        { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
      ]
    };
  }

  function addAmongPria() {
    $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' }
    ];
  }

  function removeAmongPria(index) {
    if ($formData.orangTua.amongTamu.pria.length > 1) {
      $formData.orangTua.amongTamu.pria.splice(index, 1);
      $formData.orangTua.amongTamu.pria = [...$formData.orangTua.amongTamu.pria];
    }
  }

  function addAmongWanita() {
    $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranSelop: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removeAmongWanita(index) {
    if ($formData.orangTua.amongTamu.wanita.length > 1) {
      $formData.orangTua.amongTamu.wanita.splice(index, 1);
      $formData.orangTua.amongTamu.wanita = [...$formData.orangTua.amongTamu.wanita];
    }
  }

  function addPenerimaBukuTamu() {
    $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu, 
      { nama: '', warnaKode: '', ukuranBusana: '', ukuranHijabHairdo: '', keterangan: '' }
    ];
  }

  function removePenerimaBukuTamu(index) {
    if ($formData.orangTua.penerimaBukuTamu.length > 1) {
      $formData.orangTua.penerimaBukuTamu.splice(index, 1);
      $formData.orangTua.penerimaBukuTamu = [...$formData.orangTua.penerimaBukuTamu];
    }
  }
</script>

<div class="space-y-8">
  <!-- Busana Orang Tua Pengantin Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">BUSANA ORANG TUA PENGANTIN</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Akad</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Resepsi</th>
            <th class="px-4 py-2 border border-gray-300"></th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
            <th class="px-4 py-2 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Orang Tua Pengantin -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300" colspan="8">Orang Tua Pengantin :</td>
          </tr>
          
          <!-- CPW Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">CPW : Bp.</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cpwBapak.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- Ibu -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">Ibu</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- CPP Bapak -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">CPP : Bp.</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.cppBapak.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>

          <!-- Ibu CPP -->
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">Ibu</td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.akad} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.resepsi} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
            <td class="px-4 py-2 border border-gray-300"></td>
            <td class="px-4 py-2 border border-gray-300"><input type="text" class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Among Tamu / Pagar Ayu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">AMONG TAMU / PAGAR AYU</h3>

    <!-- Among Pria -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-semibold text-gray-800">Among Pria</h4>
        <button type="button" on:click={addAmongPria} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="3">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300" colspan="2">Busana</th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Kepala</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.pria as pria, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300" colspan="2">
                  <input type="text" bind:value={pria.warnaKode} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="border border-gray-300"></td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={pria.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongPria(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Among Wanita -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-semibold text-gray-800">Among Wanita</h4>
        <button type="button" on:click={addAmongWanita} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
          Tambah Baris
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">WARNA & KODE BUSANA</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">UKURAN</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300" colspan="2">Busana</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Selop</th>
              <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
              <th class="border border-gray-300"></th>
              <th class="border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {#each $formData.orangTua.amongTamu.wanita as wanita, idx}
              <tr>
                <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300" colspan="2">
                  <input type="text" bind:value={wanita.warnaKode} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranSelop} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 border border-gray-300">
                  <input type="text" bind:value={wanita.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                </td>
                <td class="px-4 py-2 text-center border border-gray-300">
                  <button type="button" on:click={() => removeAmongWanita(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                    Hapus
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Penerima Buku Tamu Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">PENERIMA BUKU TAMU</h3>

    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-gray-600">Penerima Buku Tamu</span>
      <button type="button" on:click={addPenerimaBukuTamu} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Baris
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">NAMA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">WARNA & KODE BUSANA</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300" colspan="2">UKURAN</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">KET</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
          <tr class="bg-gray-50">
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Busana</th>
            <th class="px-2 py-2 text-center text-xs font-medium text-gray-700 border border-gray-300">Hijab / Hairdo</th>
            <th class="border border-gray-300"></th>
            <th class="border border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.orangTua.penerimaBukuTamu as penerima, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.nama} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.warnaKode} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranBusana} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.ukuranHijabHairdo} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input type="text" bind:value={penerima.keterangan} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenerimaBukuTamu(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ============================================ -->
<!-- FILE: src/lib/components/RincianBiayaForm.svelte -->
<!-- ============================================ -->
<script>
  import { formData } from '$lib/stores/formStore.js';

  // Initialize rincian biaya data if not exists
  if (!$formData.rincianBiaya) {
    $formData.rincianBiaya = {
      namaPengantin: '',
      tanggalAcara: '',
      pilihanPaket: '',
      perincianBiaya: {
        hargaPaket: { qty: 1, harga: 0, total: 0 },
        penambahan: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ],
        lainnya: [
          { item: '', qty: 0, harga: 0, total: 0 }
        ]
      },
      perincianPembayaran: [
        { tanggal: '', cashTransfer: '', jumlah: 0 }
      ]
    };
  }

  $: {
    // Auto calculate total for harga paket
    if ($formData.rincianBiaya?.perincianBiaya?.hargaPaket) {
      $formData.rincianBiaya.perincianBiaya.hargaPaket.total = 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.qty * 
        $formData.rincianBiaya.perincianBiaya.hargaPaket.harga;
    }

    // Auto calculate total for penambahan items
    if ($formData.rincianBiaya?.perincianBiaya?.penambahan) {
      $formData.rincianBiaya.perincianBiaya.penambahan = 
        $formData.rincianBiaya.perincianBiaya.penambahan.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }

    // Auto calculate total for lainnya items
    if ($formData.rincianBiaya?.perincianBiaya?.lainnya) {
      $formData.rincianBiaya.perincianBiaya.lainnya = 
        $formData.rincianBiaya.perincianBiaya.lainnya.map(item => ({
          ...item,
          total: item.qty * item.harga
        }));
    }
  }

  $: totalBiaya = calculateTotalBiaya();
  $: totalPembayaran = calculateTotalPembayaran();
  $: sisaPembayaran = totalBiaya - totalPembayaran;

  function calculateTotalBiaya() {
    if (!$formData.rincianBiaya?.perincianBiaya) return 0;
    
    let total = $formData.rincianBiaya.perincianBiaya.hargaPaket?.total || 0;
    
    $formData.rincianBiaya.perincianBiaya.penambahan?.forEach(item => {
      total += item.total || 0;
    });
    
    $formData.rincianBiaya.perincianBiaya.lainnya?.forEach(item => {
      total += item.total || 0;
    });
    
    return total;
  }

  function calculateTotalPembayaran() {
    if (!$formData.rincianBiaya?.perincianPembayaran) return 0;
    return $formData.rincianBiaya.perincianPembayaran.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  }

  function addPenambahan() {
    $formData.rincianBiaya.perincianBiaya.penambahan = [
      ...$formData.rincianBiaya.perincianBiaya.penambahan,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removePenambahan(index) {
    if ($formData.rincianBiaya.perincianBiaya.penambahan.length > 1) {
      $formData.rincianBiaya.perincianBiaya.penambahan.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.penambahan = [...$formData.rincianBiaya.perincianBiaya.penambahan];
    }
  }

  function addLainnya() {
    $formData.rincianBiaya.perincianBiaya.lainnya = [
      ...$formData.rincianBiaya.perincianBiaya.lainnya,
      { item: '', qty: 0, harga: 0, total: 0 }
    ];
  }

  function removeLainnya(index) {
    if ($formData.rincianBiaya.perincianBiaya.lainnya.length > 1) {
      $formData.rincianBiaya.perincianBiaya.lainnya.splice(index, 1);
      $formData.rincianBiaya.perincianBiaya.lainnya = [...$formData.rincianBiaya.perincianBiaya.lainnya];
    }
  }

  function addPembayaran() {
    $formData.rincianBiaya.perincianPembayaran = [
      ...$formData.rincianBiaya.perincianPembayaran,
      { tanggal: '', cashTransfer: '', jumlah: 0 }
    ];
  }

  function removePembayaran(index) {
    if ($formData.rincianBiaya.perincianPembayaran.length > 1) {
      $formData.rincianBiaya.perincianPembayaran.splice(index, 1);
      $formData.rincianBiaya.perincianPembayaran = [...$formData.rincianBiaya.perincianPembayaran];
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  }
</script>

<div class="space-y-8">
  <!-- Header Information -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.namaPengantin} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Acara</label>
      <input 
        type="date" 
        bind:value={$formData.rincianBiaya.tanggalAcara} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Paket</label>
      <input 
        type="text" 
        bind:value={$formData.rincianBiaya.pilihanPaket} 
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" 
      />
    </div>
  </div>

  <!-- Perincian Biaya Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Biaya</h3>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Item</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Qty</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Harga</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-40">Total Harga Items</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Harga Paket -->
          <tr>
            <td class="px-4 py-2 text-center text-sm border border-gray-300">1</td>
            <td class="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300">Harga Paket</td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.qty}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300">
              <input 
                type="number" 
                bind:value={$formData.rincianBiaya.perincianBiaya.hargaPaket.harga}
                class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
              />
            </td>
            <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
              {formatCurrency($formData.rincianBiaya.perincianBiaya.hargaPaket.total)}
            </td>
            <td class="px-4 py-2 border border-gray-300"></td>
          </tr>

          <!-- Penambahan Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">2</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">
              <div class="flex items-center justify-between">
                <span>Penambahan</span>
                <button type="button" on:click={addPenambahan} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Tambah Item
                </button>
              </div>
            </td>
          </tr>

          <!-- Penambahan Items -->
          {#each $formData.rincianBiaya.perincianBiaya.penambahan as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="text" 
                  bind:value={item.item}
                  placeholder="Nama item..."
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.qty}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.harga}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                {formatCurrency(item.total)}
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePenambahan(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Lainnya Header -->
          <tr class="bg-gray-100">
            <td class="px-4 py-2 text-center text-sm border border-gray-300">3</td>
            <td class="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-300" colspan="5">
              <div class="flex items-center justify-between">
                <span>Lainnya</span>
                <button type="button" on:click={addLainnya} class="px-3 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Tambah Item
                </button>
              </div>
            </td>
          </tr>

          <!-- Lainnya Items -->
          {#each $formData.rincianBiaya.perincianBiaya.lainnya as item, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300"></td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="text" 
                  bind:value={item.item}
                  placeholder="Nama item..."
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.qty}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-center" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={item.harga}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300 text-right text-sm font-medium">
                {formatCurrency(item.total)}
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removeLainnya(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Biaya -->
          <tr class="bg-rose-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="4"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Biaya</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalBiaya)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Perincian Pembayaran Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 -mx-6 -mt-6 rounded-t-lg">Perincian Pembayaran</h3>

    <div class="flex items-center justify-end mb-4">
      <button type="button" on:click={addPembayaran} class="px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
        Tambah Pembayaran
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300 w-8">No</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Tanggal Pembayaran</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Cash/Transfer</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">Jumlah</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-16">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each $formData.rincianBiaya.perincianPembayaran as pembayaran, idx}
            <tr>
              <td class="px-4 py-2 text-center text-sm border border-gray-300">{idx + 1}</td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="date" 
                  bind:value={pembayaran.tanggal}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" 
                />
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <select 
                  bind:value={pembayaran.cashTransfer}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih</option>
                  <option value="Cash">Cash</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </td>
              <td class="px-4 py-2 border border-gray-300">
                <input 
                  type="number" 
                  bind:value={pembayaran.jumlah}
                  class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right" 
                />
              </td>
              <td class="px-4 py-2 text-center border border-gray-300">
                <button type="button" on:click={() => removePembayaran(idx)} class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}

          <!-- Total Pembayaran -->
          <tr class="bg-blue-50 font-semibold">
            <td class="px-4 py-3 border border-gray-300" colspan="3"></td>
            <td class="px-4 py-3 text-sm text-gray-800 border border-gray-300">Total Pembayaran</td>
            <td class="px-4 py-3 text-right text-sm text-gray-800 border border-gray-300">{formatCurrency(totalPembayaran)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Summary Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-rose-50 border-2 border-rose-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Biaya</h4>
      <p class="text-2xl font-bold text-rose-600">{formatCurrency(totalBiaya)}</p>
    </div>
    
    <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Total Pembayaran</h4>
      <p class="text-2xl font-bold text-blue-600">{formatCurrency(totalPembayaran)}</p>
    </div>
    
    <div class="bg-{sisaPembayaran > 0 ? 'yellow' : 'green'}-50 border-2 border-{sisaPembayaran > 0 ? 'yellow' : 'green'}-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Sisa Pembayaran</h4>
      <p class="text-2xl font-bold text-{sisaPembayaran > 0 ? 'yellow' : 'green'}-600">{formatCurrency(sisaPembayaran)}</p>
    </div>
  </div>

  <!-- Footer Signature -->
  <div class="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Pengantin</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( {$formData.rincianBiaya.namaPengantin || '_______________'} )</p>
      </div>
    </div>
    <div class="text-center">
      <p class="text-sm font-medium text-gray-700 mb-16">Griya Aristy</p>
      <div class="border-t-2 border-gray-400 pt-2 mx-12">
        <p class="text-sm text-gray-600">( _______________ )</p>
      </div>
    </div>
  </div>
</div>