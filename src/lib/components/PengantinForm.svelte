<script>
  import { formData } from '$lib/stores/formStore.js';
  import { marketingStaff, dressColors, traditions, handbouquetColors, muaList } from '$lib/data/mockData.js';
  import RequestModal from './RequestModal.svelte';
  import KainModal from './KainModal.svelte';
  import FittingModal from './FittingModal.svelte';
  import { onMount } from 'svelte';

  export let adatOptions = [];
  const defaultEventTypes = ['Akad', 'Resepsi'];
  const eventTypes = adatOptions.length > 0 ? adatOptions : defaultEventTypes;

  onMount(() => {
    eventTypes.forEach(eventType => {
      const key = eventType.toLowerCase();
      if (!$formData.pengantinWanita[key]) {
        $formData.pengantinWanita[key] = { warnaKodeBusana: '', ukuranSelop: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: [] };
      }
      if (!$formData.pengantinPria[key]) {
        $formData.pengantinPria[key] = { warnaKodeBusana: '', ukuranSelop: '', ukuranKepala: '', adat: '', kain: null, requests: [], fittingNotes: '', fittings: [] };
      }
    });
  });

  let showRequestModal = false;
  let showKainModal = false;
  let showFittingModal = false;
  let currentModalContext = null;

  function openRequestModal(section, category) {
    currentModalContext = { section, category };
    showRequestModal = true;
  }

  function saveRequest(requestData) {
    if (currentModalContext) {
      const { section, category } = currentModalContext;
      const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
      target.requests = [...target.requests, requestData];
      $formData = $formData;
      closeRequestModal();
    }
  }

  function closeRequestModal() {
    showRequestModal = false;
    currentModalContext = null;
  }

  function removeRequest(section, category, index) {
    const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
    target.requests.splice(index, 1);
    $formData = $formData;
  }

  function openKainModal(section, category) {
    currentModalContext = { section, category };
    showKainModal = true;
  }

  function selectKain(kain) {
    if (currentModalContext) {
      const { section, category } = currentModalContext;
      const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
      target.kain = kain;
      $formData = $formData;
      closeKainModal();
    }
  }

  function closeKainModal() {
    showKainModal = false;
    currentModalContext = null;
  }

  function removeKain(section, category) {
    const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
    target.kain = null;
    $formData = $formData;
  }

  function openFittingModal(section, category) {
    currentModalContext = { section, category };
    showFittingModal = true;
  }

  function saveFitting(fittingData) {
    if (currentModalContext) {
      const { section, category } = currentModalContext;
      const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
      target.fittings = JSON.parse(JSON.stringify(fittingData));
      $formData = $formData;
      closeFittingModal();
    }
  }

  function closeFittingModal() {
    showFittingModal = false;
    currentModalContext = null;
  }

  function removeFitting(section, category, index) {
    const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
    target.fittings[index].ukuran = '';
    $formData = $formData;
  }

  function getCurrentFittings() {
    if (!currentModalContext) return [];
    const { section, category } = currentModalContext;
    const target = section === 'wanita' ? $formData.pengantinWanita[category] : $formData.pengantinPria[category];
    return target.fittings || [];
  }
</script>

<div class="space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div><label class="block text-sm font-medium text-gray-700 mb-2">Nama Marketing Griya Aristy</label><select bind:value={$formData.namaMarketing} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"><option value="">Pilih Marketing</option>{#each marketingStaff as staff}<option value={staff}>{staff}</option>{/each}</select></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-2">Pilihan Vendor</label><select bind:value={$formData.pilihanVendor} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"><option value="">Pilih Vendor</option><option value="Vendor A">Vendor A</option><option value="Vendor B">Vendor B</option></select></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-2">Paket Rias</label><input bind:value={$formData.paketRias} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div><label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label><input bind:value={$formData.namaPengantin} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>
    <div><label class="block text-sm font-medium text-gray-700 mb-2">Hari/Tanggal/Tahun</label><input bind:value={$formData.hari} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>
  </div>

  <div><label class="block text-sm font-medium text-gray-700 mb-2">Gedung</label><input bind:value={$formData.gedung} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>
  <div><label class="block text-sm font-medium text-gray-700 mb-2">No. Telp</label><input bind:value={$formData.noTelp} type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>
  <div><label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label><input bind:value={$formData.alamat} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" /></div>

  <div class="border border-gray-300 rounded-lg p-6">
    <h4 class="font-semibold text-gray-800 mb-4">Adat</h4>
    <div class="space-y-4">
      {#each eventTypes as eventType}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center"><span class="text-sm font-medium text-gray-700">{eventType}</span></div>
          <div><select bind:value={$formData[`adat${eventType}`]} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm"><option value="">Pilih Adat</option>{#each traditions as tradition}<option value={tradition}>{tradition}</option>{/each}</select></div>
          <div><input type="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm" placeholder="Pukul" /></div>
        </div>
      {/each}
    </div>
  </div>

  <div class="border border-gray-300 rounded-lg p-6 mt-8">
    <h3 class="text-xl font-semibold text-gray-800 text-center bg-gray-100 py-3 -mx-6 -mt-6 mb-6 rounded-t-lg">BUSANA PENGANTIN</h3>

    <div class="mb-8">
      <h4 class="font-semibold text-gray-800 mb-4 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN WANITA</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300"></th>
              {#each eventTypes as eventType}
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">{eventType.toUpperCase()}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">WARNA & KODE</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <select bind:value={$formData.pengantinWanita[eventType.toLowerCase()].warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                      <option value="">Pilih Warna</option>
                      {#each dressColors as color}<option value={color}>{color}</option>{/each}
                    </select>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">UKURAN SELOP</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <input bind:value={$formData.pengantinWanita[eventType.toLowerCase()].ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">ADAT</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <select bind:value={$formData.pengantinWanita[eventType.toLowerCase()].adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                      <option value="">Pilih Adat</option>
                      {#each traditions as tradition}<option value={tradition}>{tradition}</option>{/each}
                    </select>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">KAIN</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-sm {$formData.pengantinWanita[eventType.toLowerCase()].kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">
                        {$formData.pengantinWanita[eventType.toLowerCase()].kain?.nama || 'Belum dipilih'}
                      </span>
                      <div class="flex gap-1 flex-shrink-0">
                        <button type="button" on:click={() => openKainModal('wanita', eventType.toLowerCase())} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Pilih</button>
                        {#if $formData.pengantinWanita[eventType.toLowerCase()].kain}
                          <button type="button" on:click={() => removeKain('wanita', eventType.toLowerCase())} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">Hapus</button>
                        {/if}
                      </div>
                    </div>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">REQUEST</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    {#if $formData.pengantinWanita[eventType.toLowerCase()].requests.length > 0}
                      <div class="space-y-2 mb-2">
                        {#each $formData.pengantinWanita[eventType.toLowerCase()].requests as request, idx}
                          <div class="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-xs">
                            <span class="text-gray-700">{request.items}</span>
                            <button type="button" on:click={() => removeRequest('wanita', eventType.toLowerCase(), idx)} class="text-red-600 hover:text-red-800 font-medium">Batal</button>
                          </div>
                        {/each}
                      </div>
                    {/if}
                    <button type="button" on:click={() => openRequestModal('wanita', eventType.toLowerCase())} class="w-full px-3 py-2 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Tambah Request</button>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">FITTING</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinWanita[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    {#if $formData.pengantinWanita[eventType.toLowerCase()].fittings.length > 0}
                      <div class="space-y-2 mb-2">
                        {#each $formData.pengantinWanita[eventType.toLowerCase()].fittings as fitting, idx}
                          {#if fitting.ukuran !== ''}
                            <div class="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-xs">
                              <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                              <button type="button" on:click={() => removeFitting('wanita', eventType.toLowerCase(), idx)} class="text-red-600 hover:text-red-800 font-medium">Hapus</button>
                            </div>
                          {/if}
                        {/each}
                      </div>
                    {/if}
                    <button type="button" on:click={() => openFittingModal('wanita', eventType.toLowerCase())} class="w-full px-3 py-2 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Tambah Fitting</button>
                  </td>
                {/if}
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h4 class="font-semibold text-gray-800 mb-4 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN PRIA</h4>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300"></th>
              {#each eventTypes as eventType}
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300">{eventType.toUpperCase()}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">WARNA & KODE</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <select bind:value={$formData.pengantinPria[eventType.toLowerCase()].warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                      <option value="">Pilih Warna</option>
                      {#each dressColors as color}<option value={color}>{color}</option>{/each}
                    </select>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">UKURAN SELOP</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <input bind:value={$formData.pengantinPria[eventType.toLowerCase()].ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">UKURAN KEPALA</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <input bind:value={$formData.pengantinPria[eventType.toLowerCase()].ukuranKepala} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" />
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">ADAT</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <select bind:value={$formData.pengantinPria[eventType.toLowerCase()].adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
                      <option value="">Pilih Adat</option>
                      {#each traditions as tradition}<option value={tradition}>{tradition}</option>{/each}
                    </select>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">KAIN</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-sm {$formData.pengantinPria[eventType.toLowerCase()].kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">
                        {$formData.pengantinPria[eventType.toLowerCase()].kain?.nama || 'Belum dipilih'}
                      </span>
                      <div class="flex gap-1 flex-shrink-0">
                        <button type="button" on:click={() => openKainModal('pria', eventType.toLowerCase())} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Pilih</button>
                        {#if $formData.pengantinPria[eventType.toLowerCase()].kain}
                          <button type="button" on:click={() => removeKain('pria', eventType.toLowerCase())} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">Hapus</button>
                        {/if}
                      </div>
                    </div>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">REQUEST</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    {#if $formData.pengantinPria[eventType.toLowerCase()].requests.length > 0}
                      <div class="space-y-2 mb-2">
                        {#each $formData.pengantinPria[eventType.toLowerCase()].requests as request, idx}
                          <div class="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-xs">
                            <span class="text-gray-700">{request.items}</span>
                            <button type="button" on:click={() => removeRequest('pria', eventType.toLowerCase(), idx)} class="text-red-600 hover:text-red-800 font-medium">Batal</button>
                          </div>
                        {/each}
                      </div>
                    {/if}
                    <button type="button" on:click={() => openRequestModal('pria', eventType.toLowerCase())} class="w-full px-3 py-2 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Tambah Request</button>
                  </td>
                {/if}
              {/each}
            </tr>

            <tr>
              <td class="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-50">FITTING</td>
              {#each eventTypes as eventType}
                {#if $formData.pengantinPria[eventType.toLowerCase()]}
                  <td class="px-4 py-3 border border-gray-300">
                    {#if $formData.pengantinPria[eventType.toLowerCase()].fittings.length > 0}
                      <div class="space-y-2 mb-2">
                        {#each $formData.pengantinPria[eventType.toLowerCase()].fittings as fitting, idx}
                          {#if fitting.ukuran !== ''}
                            <div class="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-xs">
                              <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                              <button type="button" on:click={() => removeFitting('pria', eventType.toLowerCase(), idx)} class="text-red-600 hover:text-red-800 font-medium">Hapus</button>
                            </div>
                          {/if}
                        {/each}
                      </div>
                    {/if}
                    <button type="button" on:click={() => openFittingModal('pria', eventType.toLowerCase())} class="w-full px-3 py-2 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">Tambah Fitting</button>
                  </td>
                {/if}
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4">
    <div class="text-sm font-medium text-gray-700">Keterangan</div>
    <div><textarea bind:value={$formData.pengantinWanita.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
    <div><textarea bind:value={$formData.pengantinPria.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20"></textarea></div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div>
      <div><label for="bgColor" class="block text-sm font-medium text-gray-700 mb-2">Warna Handbouquet</label><select name="bqColor" bind:value={$formData.warnaHandbouquet} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"><option value="">Pilih Warna</option>{#each handbouquetColors as color}<option value={color}>{color}</option>{/each}</select></div>
      <div class="mt-2"><label for="muaSelect" class="block text-sm font-medium text-gray-700 mb-2">Pilihan MUA</label><select name="muaSelect" bind:value={$formData.pilihanMua} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"><option value="">Pilih MUA</option>{#each muaList as mua}<option value={mua}>{mua}</option>{/each}</select></div>
    </div>
  </div>
</div>

<RequestModal showModal={showRequestModal} onSave={saveRequest} onClose={closeRequestModal} />
<KainModal showModal={showKainModal} onSelect={selectKain} onClose={closeKainModal} />
<FittingModal showModal={showFittingModal} fittings={getCurrentFittings()} onSave={saveFitting} onClose={closeFittingModal} />