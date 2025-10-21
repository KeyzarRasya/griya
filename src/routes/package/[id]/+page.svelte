<script>
  import { goto } from '$app/navigation';
  import { muaList } from '$lib/data/mockData.js';
  import { paketDaftarHarga } from '$lib/data/pricelistData.js';
  
  // Form state
  let vendorName = '';
  let paket = '';
  let termsConditions = '';
  
  // Pengantin - Akad
  let pengantinAkadRias = false;
  let pengantinAkadRiasPagi = '';
  let pengantinAkadRiasSore = '';
  let pengantinAkadBusana = false;
  let pengantinAkadBusanaType = '';
  
  // Pengantin - Resepsi
  let pengantinResepsiRias = false;
  let pengantinResepsiRiasPagi = '';
  let pengantinResepsiRiasSore = '';
  let pengantinResepsiBusana = false;
  let pengantinResepsiBusanaType = '';

  
  // Pilihan MUA & Aksesoris
  let pilihanMUA = '';
  let aksesoris = false;
  
  // Orang Tua
  let orangTuaRiasIbuPengantin = 0;
  let orangTuaKainIbuPengantin = 0;
  let orangTuaBeskapBapakPengantin = 0;
  
  // Buku Tamu
  let bukuTamuRias = 0;
  let bukuTamuBusana = 0;
  
  // Among Tamu
  let amongTamuRias = 0;
  let amongTamuKainPagarAyu = 0;
  let amongTamuBusanaPagarBagus = 0;
  
  // Product Addition
  let isAddingProduct = false;
  let searchQuery = '';
  let filteredProducts = [];
  let selectedProducts = [];
  let showSuggestions = false;
  let editingProductIndex = null;
  let editingPrice = 0;

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getSectionLabel(section) {
    const labels = {
      'pengantin': 'Pengantin',
      'adat': 'Adat',
      'lainLain': 'Lain-Lain'
    };
    return labels[section] || section;
  }

  function startAddingProduct() {
    isAddingProduct = true;
    searchQuery = '';
    filteredProducts = [];
    showSuggestions = false;
  }

  function handleSearchInput() {
    if (searchQuery.trim() === '') {
      filteredProducts = [];
      showSuggestions = false;
      return;
    }

    const query = searchQuery.toLowerCase();
    filteredProducts = paketDaftarHarga.filter(product => {
      const isAlreadyAdded = selectedProducts.some(p => p.id === product.id);
      if (isAlreadyAdded) return false;
      return product.item.toLowerCase().includes(query);
    });

    showSuggestions = filteredProducts.length > 0;
  }

  function selectProduct(product) {
    const newProduct = {
      id: product.id,
      kategori: getSectionLabel(product.section),
      nama: product.item,
      harga: product.price
    };

    selectedProducts = [...selectedProducts, newProduct];

    searchQuery = '';
    filteredProducts = [];
    showSuggestions = false;
    isAddingProduct = false;
  }

  function removeProduct(index) {
    selectedProducts.splice(index, 1);
    selectedProducts = [...selectedProducts];
  }

  function startEditPrice(index) {
    editingProductIndex = index;
    editingPrice = selectedProducts[index].harga;
  }

  function saveEditPrice() {
    if (editingProductIndex !== null) {
      selectedProducts[editingProductIndex].harga = editingPrice;
      selectedProducts = [...selectedProducts];
      editingProductIndex = null;
      editingPrice = 0;
    }
  }

  function cancelEditPrice() {
    editingProductIndex = null;
    editingPrice = 0;
  }

  function cancelAddingProduct() {
    isAddingProduct = false;
    searchQuery = '';
    filteredProducts = [];
    showSuggestions = false;
  }
  
  function goBack() {
    goto('/package');
  }
  
  function handleDownload() {
    const formData = {
      vendorName,
      paket,
      pengantin: {
        akad: {
          rias: pengantinAkadRias,
          riasPagi: pengantinAkadRiasPagi,
          riasSore: pengantinAkadRiasSore,
          busana: pengantinAkadBusana,
          busanaType: pengantinAkadBusanaType
        },
        resepsi: {
          rias: pengantinResepsiRias,
          riasPagi: pengantinResepsiRiasPagi,
          riasSore: pengantinResepsiRiasSore,
          busana: pengantinResepsiBusana,
          busanaType: pengantinResepsiBusanaType
        }
      },
      pilihanMUA,
      aksesoris,
      orangTua: {
        riasIbuPengantin: orangTuaRiasIbuPengantin,
        kainIbuPengantin: orangTuaKainIbuPengantin,
        beskapBapakPengantin: orangTuaBeskapBapakPengantin
      },
      bukuTamu: {
        rias: bukuTamuRias,
        busana: bukuTamuBusana
      },
      amongTamu: {
        rias: amongTamuRias,
        kainPagarAyu: amongTamuKainPagarAyu,
        busanaPagarBagus: amongTamuBusanaPagarBagus
      },
      productAdditions: selectedProducts,
      termsConditions
    };
    
    console.log('Form Data:', formData);
    alert('Data vendor berhasil diunduh!\n\nCek console untuk melihat data lengkap.');
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    handleDownload();
  }
</script>

<div class="bg-white rounded-lg shadow-md p-8 border-t-4 border-rose-300">
  <!-- Header with Back Button -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-4">
      <button
        on:click={goBack}
        class="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
        title="Kembali ke daftar"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <div>
        <h2 class="text-3xl font-serif text-gray-800">Vendor Creation Form</h2>
        <p class="text-gray-600 mt-1">Buat paket vendor untuk acara pernikahan</p>
      </div>
    </div>
  </div>

  <form on:submit={handleSubmit} class="space-y-6">
    <!-- Paket -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Paket</label>
      <input
        type="text"
        bind:value={paket}
        required
        placeholder="Contoh: Paket Premium, Paket Silver, dll"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none"
      />
    </div>

    <!-- Pengantin Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-green-100 py-2 -mx-6 -mt-6 rounded-t-lg">Pengantin</h3>
      
      <!-- Akad -->
      <div class="mb-6">
        <h4 class="font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Akad</h4>
        
        <div class="space-y-4 ml-4">
          <!-- Rias Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinAkadRias}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Rias</span>
            </label>
            
            {#if pengantinAkadRias}
              <div class="ml-6 mt-2 space-y-2 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-700 font-medium">Start Make Up</p>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Pagi:</label>
                  <input
                    type="time"
                    bind:value={pengantinAkadRiasPagi}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Sore:</label>
                  <input
                    type="time"
                    bind:value={pengantinAkadRiasSore}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Busana Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinAkadBusana}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Busana</span>
            </label>
            
            {#if pengantinAkadBusana}
              <div class="ml-6 mt-2 p-3 bg-gray-50 rounded">
                <select
                  bind:value={pengantinAkadBusanaType}
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih Tipe Busana</option>
                  <option value="Nation">National Only</option>
                  <option value="All Adat">All Adat</option>
                </select>
              </div>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Resepsi -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Resepsi</h4>
        
        <div class="space-y-4 ml-4">
          <!-- Rias Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinResepsiRias}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Retouch Make up</span>
            </label>
            
            {#if pengantinResepsiRias}
              <div class="ml-6 mt-2 space-y-2 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-700 font-medium">Start Make Up</p>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Pagi:</label>
                  <input
                    type="time"
                    bind:value={pengantinResepsiRiasPagi}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600 w-12">Sore:</label>
                  <input
                    type="time"
                    bind:value={pengantinResepsiRiasSore}
                    class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                  />
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Busana Checkbox -->
          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={pengantinResepsiBusana}
                class="w-4 h-4 text-rose-400 border-gray-300 rounded focus:ring-rose-300"
              />
              <span class="text-sm font-medium text-gray-700">Busana</span>
            </label>
            
            {#if pengantinResepsiBusana}
              <div class="ml-6 mt-2 p-3 bg-gray-50 rounded">
                <select
                  bind:value={pengantinResepsiBusanaType}
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                >
                  <option value="">Pilih Tipe Busana</option>
                  <option value="Nation">National Only</option>
                  <option value="All Adat">All Adat</option>
                </select>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Pilihan MUA & Aksesoris Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-pink-100 py-2 -mx-6 -mt-6 rounded-t-lg">Pilihan MUA & Aksesoris</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700 w-48">Aksesoris (Siger, Paes, & Sumatra):</label>
            <input
              type="checkbox"
              bind:checked={aksesoris}
              min="0"
              class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
            />
          </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Pilihan MUA</label>
          <select
            bind:value={pilihanMUA}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          >
            <option value="">Pilih MUA</option>
            {#each muaList as mua}
              <option value={mua}>{mua}</option>
            {/each}
          </select>
        </div>
        
      </div>
    </div>

    <!-- Orang Tua Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-yellow-100 py-2 -mx-6 -mt-6 rounded-t-lg">Orang Tua</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias Ibu Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaRiasIbuPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Kain Ibu Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaKainIbuPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Beskap Bapak Pengantin:</label>
          <input
            type="number"
            bind:value={orangTuaBeskapBapakPengantin}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Buku Tamu Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-blue-100 py-2 -mx-6 -mt-6 rounded-t-lg">Buku Tamu</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias:</label>
          <input
            type="number"
            bind:value={bukuTamuRias}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Busana:</label>
          <input
            type="number"
            bind:value={bukuTamuBusana}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Among Tamu Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-purple-100 py-2 -mx-6 -mt-6 rounded-t-lg">Among Tamu</h3>
      
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Rias:</label>
          <input
            type="number"
            bind:value={amongTamuRias}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Kain Pagar Ayu:</label>
          <input
            type="number"
            bind:value={amongTamuKainPagarAyu}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-700 w-64">Busana Pagar Bagus:</label>
          <input
            type="number"
            bind:value={amongTamuBusanaPagarBagus}
            min="0"
            class="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Product Addition Section -->
    <div class="border border-gray-300 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center bg-orange-100 py-2 -mx-6 -mt-6 rounded-t-lg">Penambahan Produk</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Kategori</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-800 border border-gray-300">Nama</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-800 border border-gray-300">Harga</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-800 border border-gray-300 w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#if selectedProducts.length === 0 && !isAddingProduct}
              <!-- Empty State -->
              <tr>
                <td colspan="4" class="px-4 py-8 text-center border border-gray-300">
                  <button
                    type="button"
                    on:click={startAddingProduct}
                    class="text-rose-600 hover:text-rose-700 font-medium text-sm transition duration-200"
                  >
                    Add Product
                  </button>
                </td>
              </tr>
            {:else}
              <!-- Show Added Products -->
              {#each selectedProducts as product, index}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">{product.kategori}</td>
                  <td class="px-4 py-3 text-sm text-gray-700 border border-gray-300">{product.nama}</td>
                  <td class="px-4 py-3 text-sm text-gray-900 text-right font-medium border border-gray-300">
                    {#if editingProductIndex === index}
                      <input
                        type="number"
                        bind:value={editingPrice}
                        class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm text-right"
                      />
                    {:else}
                      {formatCurrency(product.harga)}
                    {/if}
                  </td>
                  <td class="px-4 py-3 text-center border border-gray-300">
                    {#if editingProductIndex === index}
                      <div class="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          on:click={saveEditPrice}
                          class="p-1.5 text-green-600 hover:bg-green-50 rounded transition duration-200"
                          title="Simpan"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          on:click={cancelEditPrice}
                          class="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition duration-200"
                          title="Batal"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    {:else}
                      <div class="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          on:click={() => startEditPrice(index)}
                          class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                          title="Edit Harga"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          on:click={() => removeProduct(index)}
                          class="p-1.5 text-red-600 hover:bg-red-50 rounded transition duration-200"
                          title="Hapus"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    {/if}
                  </td>
                </tr>
              {/each}

              <!-- Add Product Row -->
              <tr>
                <td colspan="4" class="px-4 py-3 text-center border border-gray-300">
                  {#if isAddingProduct}
                    <div class="relative">
                      <input
                        type="text"
                        bind:value={searchQuery}
                        on:input={handleSearchInput}
                        placeholder="Cari produk..."
                        class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-300 outline-none text-sm"
                        autofocus
                      />
                      
                      <!-- Suggestions Dropdown -->
                      {#if showSuggestions}
                        <div class="absolute z-10 w-full bottom-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                          {#each filteredProducts as product}
                            <button
                              type="button"
                              on:click={() => selectProduct(product)}
                              class="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition duration-200"
                            >
                              <div class="flex items-center justify-between">
                                <div>
                                  <p class="text-sm font-medium text-gray-900">{product.item}</p>
                                  <p class="text-xs text-gray-500">{getSectionLabel(product.section)}</p>
                                </div>
                                <span class="text-sm font-medium text-gray-700">{formatCurrency(product.price)}</span>
                              </div>
                            </button>
                          {/each}
                        </div>
                      {/if}
                      
                      <button
                        type="button"
                        on:click={cancelAddingProduct}
                        class="mt-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition duration-200"
                      >
                        Batal
                      </button>
                    </div>
                  {:else}
                    <button
                      type="button"
                      on:click={startAddingProduct}
                      class="text-rose-600 hover:text-rose-700 font-medium text-sm transition duration-200"
                    >
                      Add Product
                    </button>
                  {/if}
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Terms & Conditions -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Terms & Condition</label>
      <textarea
        bind:value={termsConditions}
        rows="6"
        placeholder="Masukkan syarat dan ketentuan..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent outline-none resize-none"
      ></textarea>
    </div>

    <!-- Download Button -->
    <div class="flex gap-4 pt-4">
      <button
        type="submit"
        class="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download
      </button>
      
      <button
        type="button"
        on:click={goBack}
        class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
      >
        Batal
      </button>
    </div>
  </form>
</div>