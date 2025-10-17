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
        ibu: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', keterangan: '', ukuranKepala: '' },
        cppBapak: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', ukuranKepala: '', keterangan: '' },
        ibuCpp: { nama: '', akad: '', resepsi: '', ukuranBusana: '', ukuranSelop: '', keterangan: '', ukuranKepala: '' }
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
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibu.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
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
            <td class="px-4 py-2 border border-gray-300">
              <input type="text" bind:value={$formData.orangTua.orangTuaPengantin.ibuCpp.ukuranKepala} class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
            </td>
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