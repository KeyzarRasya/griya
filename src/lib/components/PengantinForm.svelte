<script>
  import { formData } from '$lib/stores/formStore.js';
  import { marketingStaff, dressColors, traditions, handbouquetColors, muaList } from '$lib/data/mockData.js';
  import RequestModal from './RequestModal.svelte';
  import KainModal from './KainModal.svelte';
  import FittingModal from './FittingModal.svelte';

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
      const target = section === 'wanita' 
        ? $formData.pengantinWanita[category] 
        : $formData.pengantinPria[category];

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
    const target = section === 'wanita' 
      ? $formData.pengantinWanita[category] 
      : $formData.pengantinPria[category];
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
      const target = section === 'wanita' 
        ? $formData.pengantinWanita[category] 
        : $formData.pengantinPria[category];

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
    const target = section === 'wanita' 
      ? $formData.pengantinWanita[category] 
      : $formData.pengantinPria[category];
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
      const target = section === 'wanita' 
        ? $formData.pengantinWanita[category] 
        : $formData.pengantinPria[category];

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
    const target = section === 'wanita' 
      ? $formData.pengantinWanita[category] 
      : $formData.pengantinPria[category];
    target.fittings.splice(index, 1);
    $formData = $formData;
  }

  function getCurrentFittings() {
    if (!currentModalContext) return [];
    const { section, category } = currentModalContext;
    const target = section === 'wanita' 
      ? $formData.pengantinWanita[category] 
      : $formData.pengantinPria[category];
    return target.fittings || [];
  }
</script>

<div class="space-y-6">
  <!-- Marketing and Paket Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Marketing Griya Aristy</label>
      <select bind:value={$formData.namaMarketing} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none">
        <option value="">Pilih Marketing</option>
        {#each marketingStaff as staff}
          <option value={staff}>{staff}</option>
        {/each}
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Paket Rias</label>
      <input bind:value={$formData.pilihanMua} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
    </div>
  </div>

  <!-- Nama Pengantin -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Pengantin</label>
    <input bind:value={$formData.namaPengantin} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
  </div>

  <!-- Hari/Tanggal/Tahun -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Hari / Tanggal / Tahun</label>
    <input bind:value={$formData.hari} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
  </div>

  <!-- Gedung -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Gedung</label>
    <input bind:value={$formData.gedung} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
  </div>

  <!-- No Telp -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">No. Telp</label>
    <input bind:value={$formData.noTelp} type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
  </div>

  <!-- Alamat -->
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
    <input bind:value={$formData.alamat} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none" />
  </div>

  <!-- Adat Section -->
  <div class="border border-gray-300 rounded-lg p-6">
    <h4 class="font-semibold text-gray-800 mb-4">Adat</h4>
    <div class="space-y-4">
      <!-- Akad Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center">
          <span class="text-sm font-medium text-gray-700">Akad</span>
        </div>
        <div>
          <select bind:value={$formData.adatAkad} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm">
            <option value="">Pilih Adat</option>
            {#each traditions as tradition}
              <option value={tradition}>{tradition}</option>
            {/each}
          </select>
        </div>
        <div>
          <input type="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm" placeholder="Pukul" />
        </div>
      </div>

      <!-- Resepsi Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center">
          <span class="text-sm font-medium text-gray-700">Resepsi</span>
        </div>
        <div>
          <select bind:value={$formData.resepsi} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm">
            <option value="">Pilih Adat</option>
            {#each traditions as tradition}
              <option value={tradition}>{tradition}</option>
            {/each}
          </select>
        </div>
        <div>
          <input type="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none text-sm" placeholder="Pukul" />
        </div>
      </div>
    </div>
  </div>

  <!-- Busana Pengantin Section -->
  <div class="border border-gray-300 rounded-lg p-6 mt-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center bg-gray-100 py-2 -mx-6 -mt-6 mb-6 rounded-t-lg">BUSANA PENGANTIN</h3>

    <!-- Pengantin Wanita -->
    <div class="mb-8">
      <h4 class="font-semibold text-gray-800 mb-6 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN WANITA</h4>

      <div class="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-200">
        <div></div>
        <div class="text-center font-semibold text-gray-800">AKAD</div>
        <div class="text-center font-semibold text-gray-800">RESEPSI</div>
      </div>

      <div class="space-y-4">
        <!-- Warna & Kode Busana -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">WARNA & KODE</div>
          <div>
            <select bind:value={$formData.pengantinWanita.akad.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Warna</option>
              {#each dressColors as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
          <div>
            <select bind:value={$formData.pengantinWanita.resepsi.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Warna</option>
              {#each dressColors as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Ukuran Selop -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">UKURAN SELOP</div>
          <div><input bind:value={$formData.pengantinWanita.akad.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
          <div><input bind:value={$formData.pengantinWanita.resepsi.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
        </div>

        <!-- Adat -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">ADAT</div>
          <div>
            <select bind:value={$formData.pengantinWanita.akad.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Adat</option>
              {#each traditions as tradition}
                <option value={tradition}>{tradition}</option>
              {/each}
            </select>
          </div>
          <div>
            <select bind:value={$formData.pengantinWanita.resepsi.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Adat</option>
              {#each traditions as tradition}
                <option value={tradition}>{tradition}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Kain -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">KAIN</div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm {$formData.pengantinWanita.akad.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{$formData.pengantinWanita.akad.kain?.nama || 'Belum dipilih'}</span>
              <div class="flex gap-2">
                <button type="button" on:click={() => openKainModal('wanita', 'akad')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Pilih
                </button>
                {#if $formData.pengantinWanita.akad.kain}
                  <button type="button" on:click={() => removeKain('wanita', 'akad')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                    Hapus
                  </button>
                {/if}
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm {$formData.pengantinWanita.resepsi.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{$formData.pengantinWanita.resepsi.kain?.nama || 'Belum dipilih'}</span>
              <div class="flex gap-2">
                <button type="button" on:click={() => openKainModal('wanita', 'resepsi')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Pilih
                </button>
                {#if $formData.pengantinWanita.resepsi.kain}
                  <button type="button" on:click={() => removeKain('wanita', 'resepsi')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                    Hapus
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Request -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">REQUEST</div>
          <div>
            <button type="button" on:click={() => openRequestModal('wanita', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
              Tambah Request
            </button>
            {#if $formData.pengantinWanita.akad.requests.length > 0}
              <div class="space-y-2">
                {#each $formData.pengantinWanita.akad.requests as request, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{request.items}</span>
                    <button type="button" on:click={() => removeRequest('wanita', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Batal
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
          <div>
            <button type="button" on:click={() => openRequestModal('wanita', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
              Tambah Request
            </button>
            {#if $formData.pengantinWanita.resepsi.requests.length > 0}
              <div class="space-y-2">
                {#each $formData.pengantinWanita.resepsi.requests as request, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{request.items}</span>
                    <button type="button" on:click={() => removeRequest('wanita', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Batal
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <!-- Fitting -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">FITTING</div>
          <div>
            {#if $formData.pengantinWanita.akad.fittings.length > 0}
              <div class="space-y-2 mb-2">
                {#each $formData.pengantinWanita.akad.fittings as fitting, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                    <button type="button" on:click={() => removeFitting('wanita', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Hapus
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
            <button type="button" on:click={() => openFittingModal('wanita', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
              Tambah Fitting
            </button>
          </div>
          <div>
            {#if $formData.pengantinWanita.resepsi.fittings.length > 0}
              <div class="space-y-2 mb-2">
                {#each $formData.pengantinWanita.resepsi.fittings as fitting, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                    <button type="button" on:click={() => removeFitting('wanita', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Hapus
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
            <button type="button" on:click={() => openFittingModal('wanita', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
              Tambah Fitting
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pengantin Pria -->
    <div>
      <h4 class="font-semibold text-gray-800 mb-6 bg-gray-50 px-4 py-2 -mx-6">PENGANTIN PRIA</h4>

      <div class="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-200">
        <div></div>
        <div class="text-center font-semibold text-gray-800">AKAD</div>
        <div class="text-center font-semibold text-gray-800">RESEPSI</div>
      </div>

      <div class="space-y-4">
        <!-- Warna & Kode Busana -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">WARNA & KODE</div>
          <div>
            <select bind:value={$formData.pengantinPria.akad.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Warna</option>
              {#each dressColors as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
          <div>
            <select bind:value={$formData.pengantinPria.resepsi.warnaKodeBusana} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Warna</option>
              {#each dressColors as color}
                <option value={color}>{color}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Ukuran Selop -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">UKURAN SELOP</div>
          <div><input bind:value={$formData.pengantinPria.akad.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
          <div><input bind:value={$formData.pengantinPria.resepsi.ukuranSelop} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
        </div>

        <!-- Ukuran Kepala -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">UKURAN KEPALA</div>
          <div><input bind:value={$formData.pengantinPria.akad.ukuranKepala} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
          <div><input bind:value={$formData.pengantinPria.resepsi.ukuranKepala} type="text" class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm" /></div>
        </div>

        <!-- Adat -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">ADAT</div>
          <div>
            <select bind:value={$formData.pengantinPria.akad.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Adat</option>
              {#each traditions as tradition}
                <option value={tradition}>{tradition}</option>
              {/each}
            </select>
          </div>
          <div>
            <select bind:value={$formData.pengantinPria.resepsi.adat} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
              <option value="">Pilih Adat</option>
              {#each traditions as tradition}
                <option value={tradition}>{tradition}</option>
              {/each}
            </select>
          </div>
        </div>

        <!-- Kain -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">KAIN</div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm {$formData.pengantinPria.akad.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{$formData.pengantinPria.akad.kain?.nama || 'Belum dipilih'}</span>
              <div class="flex gap-2">
                <button type="button" on:click={() => openKainModal('pria', 'akad')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Pilih
                </button>
                {#if $formData.pengantinPria.akad.kain}
                  <button type="button" on:click={() => removeKain('pria', 'akad')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                    Hapus
                  </button>
                {/if}
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm {$formData.pengantinPria.resepsi.kain ? 'text-gray-800 font-medium' : 'text-gray-500'}">{$formData.pengantinPria.resepsi.kain?.nama || 'Belum dipilih'}</span>
              <div class="flex gap-2">
                <button type="button" on:click={() => openKainModal('pria', 'resepsi')} class="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded transition duration-200">
                  Pilih
                </button>
                {#if $formData.pengantinPria.resepsi.kain}
                  <button type="button" on:click={() => removeKain('pria', 'resepsi')} class="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded transition duration-200">
                    Hapus
                  </button>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Request -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">REQUEST</div>
          <div>
            <button type="button" on:click={() => openRequestModal('pria', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
              Tambah Request
            </button>
            {#if $formData.pengantinPria.akad.requests.length > 0}
              <div class="space-y-2">
                {#each $formData.pengantinPria.akad.requests as request, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{request.items}</span>
                    <button type="button" on:click={() => removeRequest('pria', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Batal
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
          <div>
            <button type="button" on:click={() => openRequestModal('pria', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200 mb-2">
              Tambah Request
            </button>
            {#if $formData.pengantinPria.resepsi.requests.length > 0}
              <div class="space-y-2">
                {#each $formData.pengantinPria.resepsi.requests as request, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{request.items}</span>
                    <button type="button" on:click={() => removeRequest('pria', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Batal
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <!-- Fitting -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-sm font-medium text-gray-700">FITTING</div>
          <div>
            {#if $formData.pengantinPria.akad.fittings.length > 0}
              <div class="space-y-2 mb-2">
                {#each $formData.pengantinPria.akad.fittings as fitting, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                    <button type="button" on:click={() => removeFitting('pria', 'akad', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Hapus
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
            <button type="button" on:click={() => openFittingModal('pria', 'akad')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
              Tambah Fitting
            </button>
          </div>
          <div>
            {#if $formData.pengantinPria.resepsi.fittings.length > 0}
              <div class="space-y-2 mb-2">
                {#each $formData.pengantinPria.resepsi.fittings as fitting, idx}
                  <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
                    <span class="text-gray-700">{fitting.name}: {fitting.ukuran}</span>
                    <button type="button" on:click={() => removeFitting('pria', 'resepsi', idx)} class="text-red-600 hover:text-red-800 font-medium text-xs">
                      Hapus
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
            <button type="button" on:click={() => openFittingModal('pria', 'resepsi')} class="w-full px-4 py-2 bg-rose-400 hover:bg-rose-500 text-white text-sm rounded transition duration-200">
              Tambah Fitting
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="border border-gray-300 rounded-lg p-6 mt-8">
    <div class="text-sm font-medium text-gray-700">Keterangan</div>
    <div><textarea bind:value={$formData.pengantinPria.akad.fittingNotes} placeholder="Masukkan catatan fitting..." class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm min-h-20 mt-4"></textarea></div>
  </div>

  <!-- Bottom Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div>
      <div>
        <label for="bgColor" class="block text-sm font-medium text-gray-700 mb-2">Warna Handbouquet</label>
        <select name="bqColor" bind:value={$formData.warnaHandbouquet} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
          <option value="">Pilih Warna</option>
          {#each handbouquetColors as color}
            <option value={color}>{color}</option>
          {/each}
        </select>
      </div>
      <div class="mt-2">
        <label for="muaSelect" class="block text-sm font-medium text-gray-700 mb-2">Pilihan MUA</label>
        <select name="muaSelect" bind:value={$formData.pilihanMua} class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm">
          <option value="">Pilih MUA</option>
          {#each muaList as mua}
            <option value={mua}>{mua}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>

<!-- Modals -->
<RequestModal 
  showModal={showRequestModal} 
  onSave={saveRequest} 
  onClose={closeRequestModal}
/>

<KainModal 
  showModal={showKainModal} 
  onSelect={selectKain} 
  onClose={closeKainModal}
/>

<FittingModal 
  showModal={showFittingModal} 
  fittings={getCurrentFittings()}
  onSave={saveFitting} 
  onClose={closeFittingModal}
/>