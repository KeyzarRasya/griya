<script>
  let activeTab = 'mua';
  let selectedMuaCategory = '';

  function selectMuaCategory(category) {
    selectedMuaCategory = category;
  }

  function resetMuaView() {
    selectedMuaCategory = '';
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <div class="mb-8">
    <h2 class="text-3xl font-serif text-gray-800 mb-2">Pricelist</h2>
    <p class="text-gray-600">Daftar harga layanan dan paket</p>
  </div>

  <!-- Main Tabs -->
  <div class="border-b border-gray-200 mb-6">
    <nav class="flex space-x-8">
      <button
        on:click={() => { activeTab = 'mua'; resetMuaView(); }}
        class="py-4 px-1 border-b-2 font-medium text-sm transition duration-200 {activeTab === 'mua' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}"
      >
        MUA
      </button>
      <button
        on:click={() => activeTab = 'paket'}
        class="py-4 px-1 border-b-2 font-medium text-sm transition duration-200 {activeTab === 'paket' ? 'border-rose-400 text-rose-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}"
      >
        Paket
      </button>
    </nav>
  </div>

  <!-- MUA Tab Content -->
  {#if activeTab === 'mua'}
    {#if selectedMuaCategory === ''}
      <!-- MUA Category Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          on:click={() => selectMuaCategory('vendor')}
          class="p-8 border-2 border-gray-200 rounded-lg hover:border-rose-300 hover:shadow-lg transition duration-200 text-left group"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-rose-600 transition duration-200">MUA Vendor</h3>
            <span class="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded">Vendor</span>
          </div>
          <p class="text-gray-600">Lihat daftar harga MUA Vendor</p>
        </button>

        <button
          on:click={() => selectMuaCategory('personal')}
          class="p-8 border-2 border-gray-200 rounded-lg hover:border-rose-300 hover:shadow-lg transition duration-200 text-left group"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-2xl font-semibold text-gray-800 group-hover:text-rose-600 transition duration-200">MUA Personal</h3>
            <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">Personal</span>
          </div>
          <p class="text-gray-600">Lihat daftar harga MUA Personal</p>
        </button>
      </div>
    {:else}
      <!-- MUA Tables View -->
      <div class="space-y-8">
        <!-- Back Button -->
        <button
          on:click={resetMuaView}
          class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Kembali ke Pilihan
        </button>

        <!-- Header -->
        <div class="flex items-center gap-3">
          <h3 class="text-2xl font-semibold text-gray-800">
            {selectedMuaCategory === 'vendor' ? 'MUA Vendor' : 'MUA Personal'}
          </h3>
          <span class="px-3 py-1 text-sm {selectedMuaCategory === 'vendor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'} rounded">
            {selectedMuaCategory === 'vendor' ? 'Vendor' : 'Personal'}
          </span>
        </div>

        {#if selectedMuaCategory === 'vendor'}
          {#await import('$lib/components/MuaVendorTables.svelte')}
            <p class="text-gray-500">Loading...</p>
          {:then { default: MuaVendorTables }}
            <MuaVendorTables />
          {/await}
        {:else}
          {#await import('$lib/components/MuaPersonalTables.svelte')}
            <p class="text-gray-500">Loading...</p>
          {:then { default: MuaPersonalTables }}
            <MuaPersonalTables />
          {/await}
        {/if}
      </div>
    {/if}
  {/if}

  <!-- Paket Tab Content -->
  {#if activeTab === 'paket'}
    {#await import('$lib/components/PaketDaftarHarga.svelte')}
      <p class="text-gray-500">Loading...</p>
    {:then { default: PaketDaftarHarga }}
      <PaketDaftarHarga />
    {/await}
  {/if}
</div>